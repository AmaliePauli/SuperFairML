<script>
  export let confusionMatrix;
  const total_positives = confusionMatrix.tp + confusionMatrix.fn;
  const total_negatives = confusionMatrix.tn + confusionMatrix.fp;
</script>

<div class="perf">
  <p style="line-height: 1.5em;">
    {confusionMatrix.tp}/{total_positives} ({Math.round((confusionMatrix.tp / total_positives)*100)}%) superheroes let in. <br>
    {confusionMatrix.fp}/{total_negatives} ({Math.round((confusionMatrix.fp / total_negatives)*100)}%) villains let in.
  </p>
</div>

<style>
  div.perf {
    text-align: left;
    font-size: 0.8rem;
    padding-bottom: 5px;
  }
</style>
