<script>
import {onMount} from 'svelte';

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
  bubble.style.left = `calc(${newVal}% + (${12 - newVal * 0.2}px))`;
}

</script>

<div>
  <p> Threshold for male super figures: {male_threshold} </p>
 </div>
<div class="slider">
  <input class="male" type=range bind:value={male_threshold} on:input={bubble_position(male_bubble, male_threshold)} min=0.0 max=1.0 step=0.01>
  <output class="bubble" bind:this={male_bubble}>{male_threshold}</output>
</div>
<div>
  <p> Threshold for female super figures: {female_threshold} </p>
</div>
<div class="slider">
  <input class="female" type=range bind:value={female_threshold} on:input={bubble_position(female_bubble, female_threshold)} min=0.0 max=1.0 step=0.01>
  <output class="bubble female" bind:this={female_bubble}>{female_threshold}</output>
</div>

<style>

.slider {
  margin-bottom: 34px;
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
