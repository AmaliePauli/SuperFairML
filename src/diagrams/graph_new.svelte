<script>
import {onMount} from 'svelte/internal';

import data from '../data/classification.json';

const male_predictions = []
const female_predictions = []
for (let i = 0; i < data.length; i++) {
  if (data[i].gender == "male") {
    male_predictions.push(data[i]);
  }
  else {
    female_predictions.push(data[i]);
  }
}

// Calculate positive rate
function positive_rate(predictions, threshold) {
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
function true_positive_rate(predictions, threshold) {
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
function positive_predictive_value(predictions, threshold) {
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

// Threshold for classifier
let male_threshold = 0.5;
let female_threshold = 0.5;

// DOM for the bubble showing the threshold
let male_bubble;
let female_bubble;

function bubble_position(bubble, threshold) {
  var newVal = Number(threshold * 100);
  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${42*(0.5 - newVal/100)}px))`;
}

// Positive rates
$: male_pr = positive_rate(male_predictions, male_threshold)
$: female_pr = positive_rate(female_predictions, female_threshold)
// TPR
$: male_tpr = true_positive_rate(male_predictions, male_threshold)
$: female_tpr = true_positive_rate(female_predictions, female_threshold)
// PPV
$: male_ppv = positive_predictive_value(male_predictions, male_threshold)
$: female_ppv = positive_predictive_value(female_predictions, female_threshold)

let bar_height_int = 250;
let bar_height = bar_height_int.toString() + "px";
$: male_perc_bar_height_int = bar_height_int - bar_height_int * male_pr;
$: male_bar_height = male_perc_bar_height_int.toString() + "px"
$: female_perc_bar_height_int = bar_height_int - bar_height_int * female_pr;
$: female_bar_height = female_perc_bar_height_int.toString() + "px"


</script>

<table>
  <thead>
    <tr>
      <th> <strong>Male figures</strong> </th>
      <th> <strong>Female figures</strong> </th>
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
  </tbody>
</table>

<style>

:root {
  --male-color: #e88f1c;
  --female-color: #007bff;
  --bar-background: #EEEEEE;
  --female-bar-background: #edf5ff;
  --male-bar-background: #f5e9df;
}

table {
  width: 100%;
  table-layout: fixed;
  margin-right: auto;
  margin-left: auto;
}

table td, table th {
  text-align: center;
  border: none;
}

table td {
  position: relative;
}

tr.slider {
  height: 90px;
  vertical-align: top;
}

td.bar {
  padding-bottom: 15px;
}
div.bar {
  position: relative;
  z-index: 0;
  width: 160px;
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
  font-size: 17px;
  text-align: center;
  border: none;
}

td.perc-rate {
  text-align: left;
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
