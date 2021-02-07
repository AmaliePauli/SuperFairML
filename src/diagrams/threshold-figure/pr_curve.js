import { Chart } from 'chart.js';
import { round2decimals } from "../../utils.js";
import { separate_data } from "../../data/data.js";
import { true_positive_rate, positive_predictive_value } from "../../metrics.js";
import { male_color, male_color_weak, female_color, female_color_weak } from "./colors.js";

let style = getComputedStyle(document.getElementsByTagName("d-article")[0]);
const font_size = Math.floor(parseFloat(style.fontSize) * 0.8);
Chart.defaults.global.defaultFontSize = font_size;
Chart.defaults.global.defaultFontFamily = style.fontFamily;
Chart.defaults.global.defaultFontColor = style.color;

export function createPRChart(data) {

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
              var tooltipEl = document.getElementById('pr-curve-tooltip');

              // Create element on first render
              if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.id = 'pr-curve-tooltip';
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
              tooltipEl.style.left = position.left + (position.width * 0.09) + tooltipModel.xPadding + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + (position.height * 0.25) + tooltipModel.yPadding + 'px';
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
         label: "Male",
         data: precision_recall["male"],
         fill: false,
         backgroundColor: male_color,
         borderColor: male_color,
         borderWidth: 1,
         radius: 0,
         pointHoverRadius: 4,
         lineTension: 0,
       },
       {
         label: "Female",
         data: precision_recall["female"],
         fill: false,
         backgroundColor: female_color,
         borderColor: female_color,
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
            ticks: {
              fontSize: font_size,
              fontColor: style.fontColor,
              fontStyle: style.fontStyle,
            },
            scaleLabel: {
              fontSize: font_size,
              fontColor: style.fontColor,
              fontStyle: style.fontStyle,
            },
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
              fontSize: font_size,
              fontColor: style.fontColor,
              fontFamily: style.fontFamily,
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


export function addChosenThresholdPoint(chart, male_coordinates, female_coordinates, male_threshold, female_threshold) {
  let canvas = document.getElementById('pr-curve');
  if (!canvas || !chart) {
    return;
  }
  // Remove data for last chosen threshold
  while (chart.data.datasets.length > 4) {
    chart.data.datasets.pop();
  }
  chart.data.datasets.push({
      label: "Chosen threshold (male)",
      data: male_coordinates,
      fill: false,
      backgroundColor: male_color_weak,
      borderColor: male_color_weak,
      borderWidth: 0,
      showLine: false,
      radius: 4,
      pointHoverRadius: 4,
  });
  chart.data.datasets.push({
       label: "Chosen threshold (female)",
       data: female_coordinates,
       fill: false,
       backgroundColor: female_color_weak,
       borderColor: female_color_weak,
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
