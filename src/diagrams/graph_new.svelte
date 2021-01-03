<script>
import {onMount} from 'svelte/internal';

import data from '../data/classification.json';

// Calculate positive rate
function positive_rate(predictions, threshold) {
  var total_positive = 0;
  predictions.forEach(function(hero) {
    if(hero.prediction_probability > threshold) {
        total_positive += item.predicted;
    }
  });
  return total_positive / predictions.length;
}

// Default threshold for classifier
let male_threshold = 0.5;
let female_threshold = 0.5;
let male_bubble;
let female_bubble;

function bubble_position(bubble, threshold) {
  var newVal = Number(threshold * 100);
  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${42*(0.5 - newVal/100)}px))`;
}

</script>

<table>
  <thead>
    <tr>
      <th> <strong>Male figures</strong> </th>
      <th> <strong>Female figures</strong> </th>
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
      <td class="bar">
        <div class="percentage_background">
        </div>
        <div class="percentage">
        </div>
      </td>
      <td class="bar">
        <div class="percentage_background">
        </div>
        <div class="percentage female">
        </div>
      </td>
      </tr>
  </tbody>
</table>

<style>

:root {
  --male-color: #e88f1c;
  --female-color: #007bff;
  --bar-height: 200px;
  --bar-border: 5px;
}

table {
  width: 100%;
  table-layout: fixed;
}

table td, table th {
  text-align: center;
  border: none;
}

table td {
  position: relative;
}

tr.slider {
  height: 70px;
  vertical-align: top;
}

td.bar {
  position: relative;
  z-index: 0;
  width: 100%;
  height: calc(var(--bar-height) + var(--bar-border));
}
div.percentage_background {
  position: absolute;
  z-index: 2;
  background-color: grey;
  width: calc(100% - var(--bar-border));
  height: 20px;
  top: var(--bar-border);
  left: var(--bar-border);
  border: none;
}
div.percentage {
  position: absolute;
  z-index: 1;
  background-color: var(--male-color);
  width: calc(100% - var(--bar-border));
  height: var(--bar-height);
  top: var(--bar-border);
  left: var(--bar-border);
  border: none;
}
div.percentage.female {
  background-color: var(--female-color);
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
