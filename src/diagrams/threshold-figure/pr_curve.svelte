<script>
  import { onMount } from 'svelte/internal';
  import { createPRChart, addChosenThresholdPoint } from "./pr_curve.js"
  import { round2decimals } from "../../utils.js";
  import data from '../../data/superhero_classification.json';
  export let thresholds;
  export let tprs;
  export let ppvs;

  let prChart;
  $: addChosenThresholdPoint(prChart,
    [{'x': round2decimals(tprs.male), 'y': round2decimals(ppvs.male)}],
    [{'x': round2decimals(tprs.female), 'y': round2decimals(ppvs.female)}],
    thresholds.male,
    thresholds.female,
  );
  onMount(() => {
      const chart = createPRChart(data);
      prChart = chart;
  });

</script>

<div class="pr-curve">
  Precision-Recall curve
  <canvas id="pr-curve" width="100%" height="60px" aria-label="Precision-Recall curve" role="img">
    <p>Precision-Recall curve for both male and female superfigures.</p>
  </canvas>
</div>

<style>
  div.pr-curve {
    padding-top: 25px;
    padding-bottom: 10px;
    font-size: 1rem;
    font-weight: bold;
  }
  canvas {
    padding-top: 15px;
  }
</style>
