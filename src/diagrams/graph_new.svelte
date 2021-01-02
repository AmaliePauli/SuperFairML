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
let male_threshold = 0.6;
let female_threshold = 0.6;

</script>

<div>
 <div>
  <p> Threshold for male super figures: {male_threshold} </p>
 </div>
 <div>
  <input class="male" type=range bind:value={male_threshold} min=0.0 max=1.0 step=0.01>
 </div>
 <div>
  <p> Threshold for female super figures: {female_threshold} </p>
 </div>
 <div>
  <input class="female" type=range bind:value={female_threshold} min=0.0 max=1.0 step=0.01>
 </div>
</div>

<style>

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
/* IE */
input[type=range]::-ms-thumb {
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: #e88f1c;
}
input[type=range].female::-ms-thumb {
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
/* IE */
input[type=range]::-ms-track {
  width: 100%;
  height: 8px;
  background: transparent;
  border-color: transparent;
  /*border-width: 16px 0;*/
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #e88f1c;
  border: 0.2px solid #e88f1c;
  border-radius: 8px;
}
input[type=range].female::-ms-fill-lower {
  border-color: #007bff;
}
input[type=range]::-ms-fill-upper {
  background: #e88f1c;
  border: 0.2px solid #e88f1c;
  border-radius: 8px;
}
input[type=range].female::-ms-fill-upper {
  border-color: #007bff;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border.*/
}

</style>
