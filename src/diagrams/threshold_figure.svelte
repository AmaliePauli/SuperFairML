<script>
import { onMount } from 'svelte/internal';
import ConfusionMatrix from "./threshold-figure/confusion_matrix.svelte"
import PRCurve from "./threshold-figure/pr-curve.svelte"
import { round2decimals } from "../utils.js";
import { separate_data } from "../data/data.js";
import { positive_rate, true_positive_rate, positive_predictive_value, confusion_matrix } from "../metrics.js";
import { createPRChart, addChosenThresholdPoint } from "./threshold-figure/pr_curve.js"
// Dataset containing the predictions
import data from '../data/superhero_classification.json';
// Props passed from the host script
export let fairness_criteria;

let male_color = "#e88f1c";
let female_color = "#007bff";
let male_color_weak = "#ebb889";
let female_color_weak = "#cbdef3";
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
// Construct a list with bar heights based on percentages
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

// Thresholds for classifier
let thresholds = {"male": 0.5, "female": 0.5}
// DOM for the bubbles showing the threshold
let bubbles = {"male": null, "female": null};
// Updating the bubble position of the slider
var bubble_position = function(bubble, threshold) {
  var newVal = Number(threshold * 100);
  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${42*(0.5 - newVal/100)}px))`;
}

const predictions = separate_data(data);
// Metrics (updating based on the chosen threshold)
// Confusion matrix
$: male_conf = confusion_matrix(predictions.male, thresholds.male);
$: female_conf = confusion_matrix(predictions.female, thresholds.female);
// Positive rates
let prs;
$: prs = {"male": positive_rate(predictions.male, thresholds.male),
           "female": positive_rate(predictions.female, thresholds.female)};
// TPR
let tprs;
$: tprs = {"male": true_positive_rate(predictions.male, thresholds.male),
           "female": true_positive_rate(predictions.female, thresholds.female)};
// PPV
let ppvs;
$: ppvs = {"male": positive_predictive_value(predictions.male, thresholds.male),
           "female": positive_predictive_value(predictions.female, thresholds.female)};

// Variables for the super figure bar charts
let bar_height = 150;
let bar_width = 109;
let secondary_bar_height = bar_height / 2;
let secondary_bar_width = bar_width / 2;
$: male_percs = choose_percs(fairness_criteria, prs.male, tprs.male, ppvs.male);
$: female_percs = choose_percs(fairness_criteria, prs.female, tprs.female, ppvs.female);
// Decimal number in next line decides what difference is considered as reaching the fairness criteria
// Remember to put preserveAspectRatio="none" into the svg file (to level svg tag)
$: icons = choose_icons(male_percs, female_percs, {"up": "../../images/superhero_hands_up.svg", "down": "../../images/superhero_hands_down.svg"});
$: male_perc_bar_heights = compute_bars(bar_height, secondary_bar_height, male_percs);
$: female_perc_bar_heights = compute_bars(bar_height, secondary_bar_height, female_percs);

</script>

<table>
  <thead>
    <tr>
      <th style="font-size: 1em;"> Male figures </th>
      <th style="font-size: 1em;"> Female figures </th>
    </tr>
  </thead>
  <tbody>
      <tr class="slider">
        {#each ["male", "female"] as gender}
          <td>
            <p class="slider">Choose a threshold:</p>
            <input class="{gender}" type=range bind:value={thresholds[gender]} on:input={bubble_position(bubbles[gender], thresholds[gender])} min=0.0 max=1.0 step=0.01>
            <output class="bubble {gender}" bind:this={bubbles[gender]}>{thresholds[gender]}</output>
          </td>
        {/each}
      </tr>
      <tr>
        <td class="perf">
          <p style="line-height: 1.5em;">
            {male_conf.tp}/{male_conf.tp + male_conf.fn} ({Math.round((male_conf.tp / (male_conf.tp + male_conf.fn))*100)}%) superheroes let in. <br>
            {male_conf.fp}/{male_conf.tn + male_conf.fp} ({Math.round((male_conf.fp / (male_conf.tn + male_conf.fp))*100)}%) villains let in.
          </p>
        </td>
        <td class="perf">
          <p style="line-height: 1.5em;">
            {female_conf.tp}/{female_conf.tp + female_conf.fn} ({Math.round((female_conf.tp / (female_conf.tp + female_conf.fn))*100)}%) superheroes let in. <br>
            {female_conf.fp}/{female_conf.tn + female_conf.fp} ({Math.round((female_conf.fp / (female_conf.tn + female_conf.fp))*100)}%) villains let in.
          </p>
        </td>
      </tr>
      <tr>
        {#each ["male", "female"] as gender}
          <td>
            {#if gender == "male"}
              <ConfusionMatrix confusionMatrix={male_conf} />
            {:else}
              <ConfusionMatrix confusionMatrix={female_conf} />
            {/if}
          </td>
        {/each}
      </tr>
      <tr>
        {#each ["male", "female"] as gender}
          <td class="bar">
            <p style="font-size: 1rem;"> {fairness_criteria_text[0]} </p>
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
                  {Math.round(male_percs[0]*100)}%
                {:else}
                  {Math.round(female_percs[0]*100)}%
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
                      <p style="font-size: 0.8rem;"> {fairness_criteria_text[i]} </p>
                      <div style="height: {secondary_bar_height.toString() + 'px'}; width: {secondary_bar_width.toString() + 'px'};" class="bar">
                        {#if gender == "male"}
                          <div style="background-color: {male_bar_background}; height: {male_perc_bar_heights[i].toString() + 'px'};" class="percentage_background"></div>
                          <div style="background-color: {male_color_weak};" class="percentage"></div>
                        {:else}
                          <div style="background-color: {female_bar_background}; height: {female_perc_bar_heights[i].toString() + 'px'};" class="percentage_background"></div>
                          <div style="background-color: {female_color_weak};" class="percentage"></div>
                        {/if}
                        <div style="background: {icons[i]};" class="icon"></div>
                        <div class="text secondary">
                          {#if gender == "male"}
                            {Math.round(male_percs[i]*100)}%
                          {:else}
                            {Math.round(female_percs[i]*100)}%
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
      {#if fairness_criteria === "predictive parity"}
      <tr>
        <td colspan="2">
          <PRCurve thresholds={thresholds} tprs={tprs} ppvs={ppvs} />
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

td.perf {
  text-align: left;
  font-size: 0.8rem;
  padding-bottom: 5px;
}

/* Superfigure barchart */
td.bar {
  padding-bottom: 5px;
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
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  border: none;
}
div.text.secondary {
  top: 100%;
  left: 5%;
}

/* Slider */

tr.slider {
  height: 100px;
  vertical-align: top;
}
p.slider {
  text-align: left;
  margin-bottom: 0;
}
.bubble {
  font-weight: bold;
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

</style>
