<script>
import {onMount} from 'svelte/internal';
import {Chart} from 'chart.js';
// Dataset containing the predictions
import data from '../data/classification.json';

var round2decimals = function(number) {
  return Math.round(100*number) / 100;
}

var createPRChart = function() {

  const predictions = separate_data(data);
  // Compute recall and precision (TODO: double check)
  const n = 100;
  const precision_recall = {"male": [], "female": []}
  const thresholds = {0: [], 1: []};
  const genders = ["male", "female"];
  let last_male_recall = 2.0;
  let last_female_recall = 2.0;
  for (let i = 0; i <= n; i++) {
    let threshold = i*0.01;
    let precision_male = round2decimals(positive_predictive_value(predictions["male"], threshold));
    let precision_female = round2decimals(positive_predictive_value(predictions["female"], threshold));
    let recall_male = round2decimals(true_positive_rate(predictions["male"], threshold));
    let recall_female = round2decimals(true_positive_rate(predictions["female"], threshold));
    if (recall_male > 0) {
      if (recall_male != last_male_recall) {
        precision_recall["male"].push({'x': recall_male, 'y': precision_male});
        thresholds[0].push(threshold);
        last_male_recall = recall_male;
      }
      else if (precision_recall["male"][precision_recall["male"].length-1]['y'] != precision_male) {
      //  precision_recall["male"].pop();
        //thresholds[0].pop();
        precision_recall["male"].push({'x': recall_male, 'y': precision_male});
        thresholds[0].push(threshold);
      }
    }
    if (recall_female > 0) {
      if (recall_female != last_female_recall) {
        precision_recall["female"].push({'x': recall_female, 'y': precision_female});
        thresholds[1].push(threshold);
        last_female_recall = recall_female;
      }
      else if (precision_recall["female"][precision_recall["female"].length-1]['y'] != precision_female) {
      //  precision_recall["female"].pop();
      //  thresholds[1].pop();
        precision_recall["female"].push({'x': recall_female, 'y': precision_female});
        thresholds[1].push(threshold);
      }
    }
  }
  precision_recall["male"].push({'x': 0.0, 'y': 1.0});
  thresholds[0].push(1.0);
  precision_recall["female"].push({'x': 0.0, 'y': 1.0});
  thresholds[1].push(1.0);

  var prCurveTooltip = function(tooltipModel) {
              // Tooltip Element
              var tooltipEl = document.getElementById('chartjs-tooltip');

              // Create element on first render
              if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.id = 'chartjs-tooltip';
                  const table_style = 'table-layout: fixed; margin-right: auto; margin-left: auto; border-collapse: separate;';
                  tooltipEl.innerHTML = '<table style="' + table_style + '"></table>';
                  document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                  tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                  tooltipEl.classList.add('no-transform');
              }

              // Set Text
              if (tooltipModel.body) {

                  var innerHtml = '<thead>';
                  innerHtml += '<tr style="text-align: center;">';
                  for (let header of ["&nbsp;","Threshold", "Recall", "Precision"]) {
                    innerHtml += '<th style="padding-right: 5px;">' + header + '</th>';
                  }
                  innerHtml += '</tr></thead><tbody>';
                  var datasets = this._chart.data.datasets;
                  tooltipModel.dataPoints.forEach(function(item, i) {
                      innerHtml += '<tr style="text-align: center;">';
                      var colors = tooltipModel.labelColors[i];
                      var style = 'background:' + colors.backgroundColor;
                      style += '; border: none';
                      style += '; width: 8px; height: 8px; border-radius: 4px;';
                      //var span = '<span style="' + style + '"></span>';
                      innerHtml += '<td><div style="' + style + '"></div></td>';
                      var gender = genders[item.datasetIndex];
                      // Threshold is read from the chart data.
                      let thr = "NA";
                      if ((item.datasetIndex + 2) < datasets.length) {
                        thr = datasets[item.datasetIndex+2].data[item.index].toFixed(2);
                      }
                      let recall = item.label;
                      let precision = item.value;
                      for (let value of [thr, recall, precision]) {
                          innerHtml += '<td>' + value + '</td>';
                      }
                      innerHtml += '</tr>';
                  });
                  innerHtml += '</tbody>';

                  var tableRoot = tooltipEl.querySelector('table');
                  tableRoot.innerHTML = innerHtml;
              }

              // `this` will be the overall tooltip
              var position = this._chart.canvas.getBoundingClientRect();

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1.0;
              tooltipEl.style.backgroundColor = 'rgb(0,0,0,0.4)';
              tooltipEl.style.color = 'white';
              tooltipEl.style.border = 'none';
              tooltipEl.style.borderRadius = '10px';
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left = position.left + window.pageXOffset + (position.width * 0.7) + tooltipModel.xPadding + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.yPadding - 20 + 'px';
              tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
              tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
              tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
              tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
              tooltipEl.style.pointerEvents = 'none';
	};
  let canvas = document.getElementById('pr-curve');
  let ctx = canvas.getContext('2d');
  let prChart = new Chart(ctx, {
     type: 'line',
     data: {
       datasets: [{
         label: "male",
         data: precision_recall["male"],
         fill: false,
         backgroundColor: "#e88f1c",
         borderColor: "#e88f1c",
         borderWidth: 1,
         radius: 0,
         pointHoverRadius: 4,
         lineTension: 0,
       },
       {
         label: "female",
         data: precision_recall["female"],
         fill: false,
         backgroundColor: "#007bff",
         borderColor: "#007bff",
         borderWidth: 1,
         radius: 0,
         pointHoverRadius: 4,
         lineTension: 0,
       },
       {
         // "Store" thresholds to show in tooltip
         label: "thresholds male",
         data: thresholds[0],
         fill: false,
         backgroundColor: "grey",
         borderColor: "grey",
         borderWidth: 0,
         radius: 0,
         pointHoverRadius: 0,
         pointHitRadius: 0,
         hidden: true,
       },
       {
         // "Store" thresholds to show in tooltip
         label: "thresholds female",
         data: thresholds[1],
         fill: false,
         backgroundColor: "grey",
         borderColor: "grey",
         borderWidth: 0,
         radius: 0,
         pointHoverRadius: 0,
         pointHitRadius: 0,
         hidden: true,
       },
      ]
     },
     options: {
       scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Recall (True Positive Rate)'
                }
            }],
            yAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Precision (Positive Predictive Value)'
                }
            }]
        },
        hover: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
          positioning: "nearest",
          animationDuration: 30,
        },
        tooltips: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
            positioning: "nearest",
            enabled: false,
            custom: prCurveTooltip,
        },
        legend: {
            onClick: () => {},
            labels: {
              // Remove threshold data from legend
              filter: function(legendItem, data) {
                return !legendItem.hidden;
              },
              usePointStyle: true,
            },
            position: "bottom",
        }
      }
  });

  return prChart;
}

var addChosenThresholdPoint = function(chart, male_coordinates, female_coordinates, male_threshold, female_threshold) {
  let canvas = document.getElementById('pr-curve');
  if (!canvas || !chart) {
    return;
  }
  // Remove data for last chosen threshold
  while (chart.data.datasets.length > 4) {
    chart.data.datasets.pop();
  }
  chart.data.datasets.push({
      label: "chosen threshold",
      data: male_coordinates,
      fill: false,
      backgroundColor: '#deb076',
      borderColor: '#deb076',
      borderWidth: 0,
      showLine: false,
      radius: 4,
      pointHoverRadius: 4,
  });
  chart.data.datasets.push({
       label: "chosen threshold",
       data: female_coordinates,
       fill: false,
       backgroundColor: "#7abaff",
       borderColor: "#7abaff",
       borderWidth: 0,
       showLine: false,
       radius: 4,
       pointHoverRadius: 4,
  });
  // "Store" threshold to show in tooltip
  chart.data.datasets.push({
      label: "male threshold",
      data: [male_threshold],
      fill: false,
      backgroundColor: "grey",
      borderColor: "grey",
      borderWidth: 0,
      radius: 0,
      pointHoverRadius: 0,
      pointHitRadius: 0,
      hidden: true,
  });
  // "Store" threshold to show in tooltip
  chart.data.datasets.push({
      label: "female threshold",
      data: [female_threshold],
      fill: false,
      backgroundColor: "grey",
      borderColor: "grey",
      borderWidth: 0,
      radius: 0,
      pointHoverRadius: 0,
      pointHitRadius: 0,
      hidden: true,
  });
  chart.update(0);
}


// Calculate positive rate
var positive_rate = function(predictions, threshold) {
  var total_positive = 0.0;
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    if(hero.prediction_probability > threshold) {
        total_positive += 1.0;
    }
  }
  return total_positive / predictions.length;
}

// Calculate true positive rate
var true_positive_rate = function(predictions, threshold) {
  var total_positives = 0;
  var true_positives = 0;
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    total_positives += hero.class;
    if(hero.prediction_probability > threshold) {
        if (hero.class) {
          true_positives += 1.0;
        }
    }
  }
  if (total_positives == 0) {
    return 1.0;
  }
  return true_positives / total_positives;
}

// Calculate positive predictive value
var positive_predictive_value = function(predictions, threshold) {
  var total_predicted_positives = 0;
  var true_positives = 0;
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    if(hero.prediction_probability > threshold) {
        total_predicted_positives += 1;
        if (hero.class) {
          true_positives += 1.0;
        }
    }
  }
  if (total_predicted_positives == 0) {
    return 1.0;
  }
  return true_positives / total_predicted_positives;
}

// Separate data into males and females
var separate_data = function(dataset) {
  const male_predictions = []
  const female_predictions = []
  for (let i = 0; i < dataset.length; i++) {
    if (dataset[i].gender == "male") {
      male_predictions.push(dataset[i]);
    }
    else {
      female_predictions.push(dataset[i]);
    }
  }
  return {"male": male_predictions, "female": female_predictions};
}

const predictions = separate_data(data);

// Threshold for classifier
let male_threshold = 0.5;
let female_threshold = 0.5;

// DOM for the bubble showing the threshold
let male_bubble;
let female_bubble;

var bubble_position = function(bubble, threshold) {
  var newVal = Number(threshold * 100);
  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${42*(0.5 - newVal/100)}px))`;
}

// Positive rates
$: male_pr = positive_rate(predictions.male, male_threshold)
$: female_pr = positive_rate(predictions.female, female_threshold)
// TPR
$: male_tpr = true_positive_rate(predictions.male, male_threshold)
$: female_tpr = true_positive_rate(predictions.female, female_threshold)
// PPV
$: male_ppv = positive_predictive_value(predictions.male, male_threshold)
$: female_ppv = positive_predictive_value(predictions.female, female_threshold)

let bar_height_int = 150;
let bar_height = bar_height_int.toString() + "px";
$: male_perc_bar_height_int = bar_height_int - bar_height_int * male_pr;
$: male_bar_height = male_perc_bar_height_int.toString() + "px";
$: female_perc_bar_height_int = bar_height_int - bar_height_int * female_pr;
$: female_bar_height = female_perc_bar_height_int.toString() + "px";

let prChart;
$: addChosenThresholdPoint(prChart,
  [{'x': round2decimals(male_tpr), 'y': round2decimals(male_ppv)}],
  [{'x': round2decimals(female_tpr), 'y': round2decimals(female_ppv)}],
  male_threshold,
  female_threshold
);

onMount(() => {
  const chart = createPRChart();
  prChart = chart;
});

</script>

<table>
  <thead>
    <tr>
      <th style="font-size: 1.2em;"> <b>Male figures</b> </th>
      <th style="font-size: 1.2em;"> <b>Female figures</b> </th>
    </tr>
  </thead>
  <tbody style="--bar-height: {bar_height};--male-bar-height: {male_bar_height};--female-bar-height: {female_bar_height}">
      <tr class="slider">
      <td>
        <input class="male" type=range bind:value={male_threshold} on:input={bubble_position(male_bubble, male_threshold)} min=0.0 max=1.0 step=0.01>
        <output class="bubble" bind:this={male_bubble}>{male_threshold}</output>
      </td>
      <td>
        <input class="female" type=range bind:value={female_threshold} on:input={bubble_position(female_bubble, female_threshold)} min=0.0 max=1.0 step=0.01>
        <output class="bubble female" bind:this={female_bubble}>{female_threshold}</output>
      </td>
      </tr>
      <tr>
      <td class="bar">
        Positive Rate
        <div class="bar">
          <div class="percentage_background"></div>
          <div class="percentage"></div>
          <div class="icon"></div>
          <div class="text">
            <b>{Math.round(male_pr*100)}%</b>
          </div>
        </div>
      </td>
      <td class="bar">
        Positive Rate
        <div class="bar">
          <div class="percentage_background female"></div>
          <div class="percentage female"></div>
          <div class="icon"></div>
          <div class="text">
            <b>{Math.round(female_pr*100)}%</b>
          </div>
        </div>
      </td>
      </tr>
      <tr>
        <td class="perc-rate">True positive rate: {Math.round(male_tpr*100)}%</td>
        <td class="perc-rate">True positive rate: {Math.round(female_tpr*100)}%</td>
      </tr>
      <tr>
        <td class="perc-rate">Positive predictive value: {Math.round(male_ppv*100)}%</td>
        <td class="perc-rate">Positive predictive value: {Math.round(female_ppv*100)}%</td>
      </tr>
      <tr>
        <td colspan="2" class="pr-curve">
          <b>Precision-Recall curve</b>
          <canvas id="pr-curve" width="100%" height="50px" aria-label="Precision-Recall curve" role="img">
            <p>Precision-Recall curve for both male and female superfigures.</p>
          </canvas>
        </td>
      </tr>
  </tbody>
</table>

<style>

:root {
  --male-color: #e88f1c;
  --female-color: #007bff;
  --female-bar-background: #edf5ff;
  --male-bar-background: #f5e9df;
}

table {
  width: 100%;
  table-layout: fixed;
  margin-right: auto;
  margin-left: auto;
  border-collapse: separate;
  border: none;
}

table td, table th {
  text-align: center;
  border: none;
}

table td {
  position: relative;
}

tr.slider {
  height: 75px;
  vertical-align: top;
}

td.bar {
  padding-bottom: 15px;
}
div.bar {
  position: relative;
  z-index: 0;
  width: 96px;
  height: var(--bar-height);
  margin: auto;
}
div.percentage_background {
  position: absolute;
  z-index: 2;
  background-color: var(--male-bar-background);
  width: 100%;
  height: var(--male-bar-height);
  top: 0;
  left: 0;
  border: none;
}
div.percentage_background.female {
  height: var(--female-bar-height);
  background-color: var(--female-bar-background);
}
div.percentage {
  position: absolute;
  z-index: 1;
  background-color: var(--male-color);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
}
div.percentage.female {
  background-color: var(--female-color);
}
div.icon {
  position: absolute;
  z-index: 3;
  top: -1px;
  left: 0;
  width: calc(100% + (1px));
  height: calc(100% + (3px));
  /* Remember to put preserveAspectRatio="none" into the svg file (to level svg tag)*/
  background: url(../../images/superhero.svg);
  background-size: 100% 100%;
  border: none;
}
div.text {
  position: relative;
  z-index: 4;
  top: 20%;
  left: 2%;
  font-size: 12px;
  text-align: center;
  border: none;
}

td.perc-rate {
  text-align: left;
  font-size: 0.75em;
}

td.pr-curve {
  padding-top: 25px;
  padding-bottom: 10px;
  font-size: 1.2em;
}
canvas {
  padding-top: 15px;
}

input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

/* Thumb */
/* Chrome */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: #e88f1c;
  margin-top: -6px; /* You need to specify a margin in Chrome */
}
input[type=range].female::-webkit-slider-thumb {
  background: #007bff;
}
/* Firefox */
input[type=range]::-moz-range-thumb {
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: #e88f1c;
}
input[type=range].female::-moz-range-thumb {
  background: #007bff;
}

/* Track */
/* Chrome */
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  background: #fff;
  border-radius: 8px;
  border: 0.2px solid #e88f1c;
}
input[type=range].female::-webkit-slider-runnable-track {
  border-color: #007bff;
}
/* Firefox */
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8px;
  background: #fff;
  border-radius: 8px;
  border: 0.2px solid #e88f1c;
}
input[type=range].female::-moz-range-track {
  border-color: #007bff;
}


input[type=range]:focus {
  outline: none; /* Removes the blue border.*/
}

.bubble {
  background: #e88f1c;
  color: white;
  margin-top: 1px;
  padding: 2px 10px;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
}
.bubble.female {
  background: #007bff;
}

</style>
