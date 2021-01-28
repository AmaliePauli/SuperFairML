<script>

  let short_text = {
    "tp": "True Positive (TP)",
    "fp": "False Positive (FP)",
    "tn": "True Negative (TN)",
    "fn": "False Negative (FN)"
  };

  let full_text = {
    "tp": "Number of cases where both the predicted and actual outcome is positive.",
    "fp": "Number of cases where the predicted outcome is positive, but the actual outcome is negative.",
    "tn": "Number of cases where both the predicted and the actual outcome is negative.",
    "fn": "Number of cases where the predicted outcome is negative, but the actual outcome is positive."
  };

  let text = {
    "tp": short_text["tp"],
    "fp": short_text["fp"],
    "tn": short_text["tn"],
    "fn": short_text["fn"],
  };

  let clicked = {"tp": false, "fp": false, "tn": false, "fn": false};

  var onClick = function(event) {
    let cur_id = event.target.id;
    for (var id in clicked) {
      if (id === cur_id) {
        clicked[id] = true;
        text[id] = full_text[id];
      }
      else {
        clicked[id] = false;
        text[id] = short_text[id];
      }
    }
  };

  var onHover = function(event) {
    let cur_id = event.target.id;
    text[cur_id] = full_text[cur_id];
  };

  var reset = function(event) {
    let cur_id = event.target.id;
    if (!clicked[cur_id]) {
      text[cur_id] = short_text[cur_id];
    }
  };

</script>

<table align="center">
  <thead>
    <tr>
      <th> &nbsp; </th>
      <th class="heading"> Actual positive </th>
      <th class="heading"> Actual negative </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="heading"> Predicted positive </td>
      <td id="tp" on:click={onClick} on:mouseover={onHover} on:mouseout={reset}> {text["tp"]} </td>
      <td id="fp" on:click={onClick} on:mouseover={onHover} on:mouseout={reset}> {text["fp"]} </td>
    </tr>
    <tr>
      <td class="heading"> Predicted negative </td>
      <td id="fn" on:click={onClick} on:mouseover={onHover} on:mouseout={reset}> {text["fn"]} </td>
      <td id="tn" on:click={onClick} on:mouseover={onHover} on:mouseout={reset}> {text["tn"]} </td>
    </tr>
  </tbody>
</table>

<style>

  table {
    background-color: var(--box-color);
    border: 1px solid var(--box-border);
    font-size: 1.06rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  table td {
    text-align: justify;
    vertical-align: text-top;
    width: 40%;
    border: 1px solid var(--box-border);
  }

  table th {
    border: 1px solid var(--box-border);
  }

  td.heading {
    width: 20%;
  }

  .heading {
    font-weight: bold;
    text-align: left;
  }

</style>
