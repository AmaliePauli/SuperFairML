<script>
import {onMount} from 'svelte/internal';
import {Chart} from 'chart.js';
// Dataset containing the predictions
import data from '../data/superhero_classification.json';
// Props passed from the host script
export let fairness_criteria;

let male_color = "#e88f1c";
let female_color = "#007bff";
let female_bar_background = "#edf5ff";
let male_bar_background = "#f5e9df";

// Construct a list with titles based on the fairness criteria
let fairness_criteria_text = "";
if (fairness_criteria === "demographic parity") {
  fairness_criteria_text = ["Positive Rate"];
}
else if (fairness_criteria === "equal opportunity") {
  fairness_criteria_text = ["True Positive Rate", "Positive Rate"];
}
else if (fairness_criteria === "predictive parity") {
  fairness_criteria_text = ["Positive Predictive Value", "True Positive Rate", "Positive Rate"];
}
// Construct a list with percentages based on the fairness criteria
var choose_percs = function(fairness_criteria, pr, tpr, ppv) {
  let perc = [];
  if (fairness_criteria === "demographic parity") {
    perc = [pr];
  }
  else if (fairness_criteria === "equal opportunity") {
    perc = [tpr, pr];
  }
  else if (fairness_criteria === "predictive parity") {
    perc = [ppv, tpr, pr];
  }
  return perc;
}
// Construct a list with bar heights based
var compute_bars = function(bar_height, secondary_bar_height, percs) {
  let bar_heights = [];
  for (let i = 0; i < percs.length; i++) {
    let factor = 1.0 - percs[i];
    //Primary bar
    if (i === 0) {
      bar_heights.push(Math.round(bar_height * factor));
    }
    // Secondary bars
    else {
      bar_heights.push(Math.round(secondary_bar_height * factor));
    }
  }
  return bar_heights;
}
// Construct a list with icons (hands up or down) for each bar
var choose_icons = function(male_percs, female_percs, icons, thr=0.03) {
  let icon_list = [];
  for (let i = 0; i < male_percs.length; i++) {
    if (Math.abs(male_percs[i] - female_percs[i]) <= thr) {
      icon_list.push('url(' + icons.up + ')');
    }
    else  {
      icon_list.push('url(' + icons.down + ')');
    }
  }
  return icon_list;
}

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

// Performance metrics TODO: use conf matrix
// Calculate positive rate
var positive_rate = function(predictions, threshold) {
  var total_positive = 0.0;
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    if(hero.prediction_probability >= threshold) {
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
    if(hero.prediction_probability >= threshold) {
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
    if(hero.prediction_probability >= threshold) {
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

// Calculate confusion_matrix
var confusion_matrix = function(predictions, threshold) {
  var true_positives = 0.0;
  var true_negatives = 0.0;
  var false_positives = 0.0;
  var false_negatives = 0.0
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    if(hero.prediction_probability >= threshold) {
      if (hero.class) {
        true_positives += 1.0;
      }
      else {
        false_positives += 1.0;
      }
    }
    else {
      if (hero.class) {
        false_negatives += 1.0;
      }
      else {
        true_negatives += 1.0;
      }
    }
  }
  return {"tp": true_positives, "fp": false_positives,
          "fn": false_negatives, "tn": true_negatives};
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

// Accuracy
$: male_conf = confusion_matrix(predictions.male, male_threshold);
$: female_conf = confusion_matrix(predictions.female, female_threshold);
// Positive rates
let male_pr; let female_pr;
$: male_pr = positive_rate(predictions.male, male_threshold);
$: female_pr = positive_rate(predictions.female, female_threshold);
// TPR
let male_tpr; let female_tpr;
$: male_tpr = true_positive_rate(predictions.male, male_threshold);
$: female_tpr = true_positive_rate(predictions.female, female_threshold);
// PPV
let male_ppv; let female_ppv;
$: male_ppv = positive_predictive_value(predictions.male, male_threshold);
$: female_ppv = positive_predictive_value(predictions.female, female_threshold);

let bar_height = 150;
let bar_width = 109;
let secondary_bar_height = bar_height / 2;
let secondary_bar_width = bar_width / 2;
$: male_percs = choose_percs(fairness_criteria, male_pr, male_tpr, male_ppv);
$: female_percs = choose_percs(fairness_criteria, female_pr, female_tpr, female_ppv);
// Decimal number in next line decides what difference is considered as reaching the fairness criteria
// Remember to put preserveAspectRatio="none" into the svg file (to level svg tag)
$: icons = choose_icons(male_percs, female_percs, {"up": "../../images/superhero_hands_up.svg", "down": "../../images/superhero_hands_down.svg"});
$: male_perc_bar_heights = compute_bars(bar_height, secondary_bar_height, male_percs);
$: female_perc_bar_heights = compute_bars(bar_height, secondary_bar_height, female_percs);

$: {
  console.log(fairness_criteria);
  console.log(male_percs);
  console.log(female_percs);
}

let prChart;
$: addChosenThresholdPoint(prChart,
  [{'x': round2decimals(male_tpr), 'y': round2decimals(male_ppv)}],
  [{'x': round2decimals(female_tpr), 'y': round2decimals(female_ppv)}],
  male_threshold,
  female_threshold
);
if (fairness_criteria === "predictive parity") {
  onMount(() => {
    const chart = createPRChart();
    prChart = chart;
  });
}

</script>

<table>
  <thead>
    <tr>
      <th style="font-size: 1.2em;"> <b>Male figures</b> </th>
      <th style="font-size: 1.2em;"> <b>Female figures</b> </th>
    </tr>
  </thead>
  <tbody>
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
        <td class="perf">
          <p style="line-height: 1.5em;">
            {male_conf.tp}/{male_conf.tp + male_conf.fn} ({Math.round((male_conf.tp / (male_conf.tp + male_conf.fn))*100)}%) superheros let in. <br>
            {male_conf.fp}/{male_conf.tn + male_conf.fp} ({Math.round((male_conf.fp / (male_conf.tn + male_conf.fp))*100)}%) villains let in.
          </p>
        </td>
        <td class="perf">
          <p style="line-height: 1.5em;">
            {female_conf.tp}/{female_conf.tp + female_conf.fn} ({Math.round((female_conf.tp / (female_conf.tp + female_conf.fn))*100)}%) superheros let in. <br>
            {female_conf.fp}/{female_conf.tn + female_conf.fp} ({Math.round((female_conf.fp / (female_conf.tn + female_conf.fp))*100)}%) villains let in.
          </p>
        </td>
      </tr>
      <tr>
        {#each ["male", "female"] as gender}
          <td class="bar">
            <p style="font-weight: bold;"> {fairness_criteria_text[0]} </p>
            <div style="height: {bar_height.toString() + 'px'}; width: {bar_width.toString() + 'px'};" class="bar">
              {#if gender == "male"}
                <div style="background-color: {male_bar_background}; height: {male_perc_bar_heights[0].toString() + 'px'};" class="percentage_background"></div>
                <div style="background-color: {male_color};" class="percentage"></div>
              {:else}
                <div style="background-color: {female_bar_background}; height: {female_perc_bar_heights[0].toString() + 'px'};" class="percentage_background"></div>
                <div style="background-color: {female_color};" class="percentage"></div>
              {/if}
              <div style="background: {icons[0]};" class="icon"></div>
              <div class="text">
                {#if gender == "male"}
                  <b>{Math.round(male_percs[0]*100)}%</b>
                {:else}
                  <b>{Math.round(female_percs[0]*100)}%</b>
                {/if}
              </div>
            </div>
          </td>
        {/each}
      </tr>
      <tr>
        <td colspan="2">
          <table border="0">
            <tr>
              {#each ["male", "female"] as gender}
                {#each fairness_criteria_text as title, i}
                  {#if i > 0}
                    <td class="bar">
                      <p> {fairness_criteria_text[i]} </p>
                      <div style="height: {secondary_bar_height.toString() + 'px'}; width: {secondary_bar_width.toString() + 'px'};" class="bar">
                        {#if gender == "male"}
                          <div style="background-color: {male_bar_background}; height: {male_perc_bar_heights[i].toString() + 'px'};" class="percentage_background"></div>
                          <div style="background-color: {male_color};" class="percentage"></div>
                        {:else}
                          <div style="background-color: {female_bar_background}; height: {female_perc_bar_heights[i].toString() + 'px'};" class="percentage_background"></div>
                          <div style="background-color: {female_color};" class="percentage"></div>
                        {/if}
                        <div style="background: {icons[i]};" class="icon"></div>
                        <div class="text">
                          {#if gender == "male"}
                            <b>{Math.round(male_percs[i]*100)}%</b>
                          {:else}
                            <b>{Math.round(female_percs[i]*100)}%</b>
                          {/if}
                        </div>
                      </div>
                    </td>
                  {/if}
                {/each}
              {/each}
            </tr>
          </table>
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
      {#if fairness_criteria === "predictive parity"}
      <tr>
        <td colspan="2" class="pr-curve">
          <b>Precision-Recall curve</b>
          <canvas id="pr-curve" width="100%" height="50px" aria-label="Precision-Recall curve" role="img">
            <p>Precision-Recall curve for both male and female superfigures.</p>
          </canvas>
        </td>
      </tr>
      {/if}
  </tbody>
</table>

<style>

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

td.perf {
  text-align: left;
  font-size: 0.9em;
  padding-bottom: 5px;
}

td.bar {
  padding-bottom: 15px;
}
div.bar {
  position: relative;
  z-index: 0;
  margin: auto;
}
div.percentage_background {
  position: absolute;
  z-index: 2;
  width: 100%;
  top: 0;
  left: 0;
  border: none;
}
div.percentage {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
}
div.icon {
  position: absolute;
  z-index: 3;
  top: -1px;
  left: 0;
  width: calc(100% + (1px));
  height: calc(100% + (3px));
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
