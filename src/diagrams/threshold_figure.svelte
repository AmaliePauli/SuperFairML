<script>
import { onMount } from 'svelte/internal';
import ConfusionMatrix from "./threshold-figure/confusion_matrix.svelte";
import PerformanceText from "./threshold-figure/performance.svelte";
import SuperheroBar from "./threshold-figure/superhero_bar.svelte";
import PRCurve from "./threshold-figure/pr_curve.svelte";
import { round2decimals } from "../utils.js";
import { separate_data } from "../data/data.js";
import { positive_rate, true_positive_rate, positive_predictive_value, confusion_matrix } from "../metrics.js";
import { male_color, male_color_weak, male_bar_background, female_color, female_color_weak, female_bar_background } from "./threshold-figure/colors.js";
// Dataset containing the predictions
import data from '../data/superhero_classification.json';
// Props passed from the host script
export let fairness_criteria;

// Variables for the super figure bar charts
let bar_height = 150;
let bar_width = 109;
let barSettings = {
      "mode": "primary",
      "height": bar_height,
      "width": bar_width,
      "fontSize": "1rem",
      "color": {
        "male": {
          "foreground": male_color,
          "background": male_bar_background,
        },
        "female": {
          "foreground": female_color,
          "background": female_bar_background,
        }
      }
};
let secondaryBarSettings = {
      "mode": "secondary",
      "height": bar_height / 2,
      "width": bar_width / 2,
      "fontSize": "0.8rem",
      "color": {
        "male": {
          "foreground": male_color_weak,
          "background": male_bar_background,
        },
        "female": {
          "foreground": female_color_weak,
          "background": female_bar_background,
        }
      }
};

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
// Construct a list with icons (hands up or down) for each bar
var choose_icons = function(percs, icons, thr=0.03) {
  let icon_list = [];
  for (let i = 0; i < percs.male.length; i++) {
    if (Math.abs(percs.male[i] - percs.female[i]) <= thr) {
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
let confs;
$: confs = {"male": confusion_matrix(predictions.male, thresholds.male),
            "female": confusion_matrix(predictions.female, thresholds.female)};
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

$: percs = {
  "male": choose_percs(fairness_criteria, prs.male, tprs.male, ppvs.male),
  "female": choose_percs(fairness_criteria, prs.female, tprs.female, ppvs.female)
};
// Decimal number in next line decides what difference is considered as reaching the fairness criteria
// Remember to put preserveAspectRatio="none" into the svg file (to level svg tag)
$: icons = choose_icons(percs,
  {"up": "../../images/superhero_hands_up.svg", "down": "../../images/superhero_hands_down.svg"},
  0.03
);

</script>

<table>
  <thead>
    <tr>
      <th style="font-size: 1rem;"> Male figures </th>
      <th style="font-size: 1rem;"> Female figures </th>
    </tr>
  </thead>
  <tbody>
    {#each ["slider", "perf", "matrix", "bar", "secondary_bar"] as row_type}
      <tr>
        {#each ["male", "female"] as gender}
          <td class="{row_type}">
            {#if row_type === "slider"}
              <p class="slider">Choose a threshold:</p>
              <input class="{gender}" type=range bind:value={thresholds[gender]} on:input={bubble_position(bubbles[gender], thresholds[gender])} min=0.0 max=1.0 step=0.01>
              <output class="bubble {gender}" bind:this={bubbles[gender]}>{thresholds[gender]}</output>
            {:else if row_type === "perf"}
              <PerformanceText confusionMatrix={confs[gender]} />
            {:else if row_type === "matrix"}
              <ConfusionMatrix confusionMatrix={confs[gender]} />
            {:else if row_type === "bar"}
              <SuperheroBar title={fairness_criteria_text[0]} barSettings={barSettings} gender={gender} perc={percs[gender][0]} icon={icons[0]} />
            {:else if row_type === "secondary_bar"}
              <table border="0">
                <tr>
                  {#each fairness_criteria_text as title, i}
                    {#if i > 0}
                      <td class="bar">
                        <SuperheroBar title={fairness_criteria_text[i]} barSettings={secondaryBarSettings} gender={gender} perc={percs[gender][i]} icon={icons[i]} />
                      </td>
                    {/if}
                  {/each}
                </tr>
              </table>
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
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

/* Slider */

td.slider {
  height: 100px;
  vertical-align: top;
}
p.slider {
  text-align: left;
  margin-bottom: 0;
}
.bubble {
  font-weight: bold;
  background: var(--first-color);
  color: white;
  margin-top: 1px;
  padding: 2px 10px;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
}
.bubble.female {
  background: var(--second-color);;
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
  background: var(--first-color);
  margin-top: -6px; /* You need to specify a margin in Chrome */
}
input[type=range].female::-webkit-slider-thumb {
  background: var(--second-color);
}
/* Firefox */
input[type=range]::-moz-range-thumb {
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: var(--first-color);
}
input[type=range].female::-moz-range-thumb {
  background: var(--second-color);
}

/* Track */
/* Chrome */
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  background: white;
  border-radius: 8px;
  border: 0.2px solid var(--first-color);
}
input[type=range].female::-webkit-slider-runnable-track {
  border-color: var(--second-color);
}
/* Firefox */
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8px;
  background: white;
  border-radius: 8px;
  border: 0.2px solid var(--first-color);
}
input[type=range].female::-moz-range-track {
  border-color: var(--second-color);
}

input[type=range]:focus {
  outline: none; /* Removes the blue border.*/
}

</style>
