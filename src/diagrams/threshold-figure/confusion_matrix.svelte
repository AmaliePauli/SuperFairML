<script>
  export let confusionMatrix;
  const total = confusionMatrix.tp + confusionMatrix.tn + confusionMatrix.fp + confusionMatrix.fn;
</script>

<table>
  <thead>
    <tr>
      <th> &nbsp; </th>
      <th class="heading"> Actual superhero </th>
      <th class="heading"> Actual villain </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="heading"> Predicted superhero </td>
      <td> {confusionMatrix.tp} </td>
      <td> {confusionMatrix.fp} </td>
    </tr>
    <tr>
      <td class="heading"> Predicted villain </td>
      <td> {confusionMatrix.fn} </td>
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
