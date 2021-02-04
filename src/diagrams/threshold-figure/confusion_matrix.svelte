<script>
  export let confusionMatrix;
  const total = confusionMatrix.tp + confusionMatrix.tn + confusionMatrix.fp + confusionMatrix.fn;
</script>

<table>
  <thead>
    <tr>
      <th> &nbsp; </th>
      <th class="heading"> Predicted superhero </th>
      <th class="heading"> Predicted villain </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="heading"> Actual superhero </td>
      <td> {confusionMatrix.tp} </td>
      <td> {confusionMatrix.fn} </td>
    </tr>
    <tr>
      <td class="heading"> Actual villain </td>
      <td> {confusionMatrix.fp} </td>
      <td> {confusionMatrix.tn} </td>
    </tr>
  </tbody>
</table>

<style>

  table td, table th {
    font-size: 0.8rem;
  }

  .heading {
    font-weight: bold;
    text-align: left;
  }


</style>
