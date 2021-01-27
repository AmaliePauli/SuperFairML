<script>

  let tp = "True Positive (TP)";
  let fp = "False Positive (FP)";
  let tn = "True Negative (TN)";
  let fn = "False Negative (FN)";

  let tp_full = "Number of cases where both the predicted and actual outcome is positive.";
  let fp_full = "Number of cases where the predicted outcome is positive, but the actual outcome is negative.";
  let tn_full = "Number of cases where both the predicted and the actual outcome is negative.";
  let fn_full = "Number of cases where the predicted outcome is negative, but the actual outcome is positive.";

  let tp_text = tp;
  let fp_text = fp;
  let tn_text = tn;
  let fn_text = fn;

  var onClick = function(event) {
    let id = event.target.id;
    switch(id) {
      case "tp":
        tp_text = tp_full;
        fp_text = fp;
        tn_text = tn;
        fn_text = fn;
        break;
      case "fp":
        fp_text = fp_full;
        tp_text = tp;
        tn_text = tn;
        fn_text = fn;
        break;
      case "tn":
        tn_text = tn_full;
        tp_text = tp;
        fp_text = fp;
        fn_text = fn;
        break;
      case "fn":
        fn_text = fn_full;
        tp_text = tp;
        fp_text = fp;
        tn_text = tn;
        break;
    }
  };

  var reset = function(event) {
    tp_text = tp;
    fp_text = fp;
    tn_text = tn;
    fn_text = fn;
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
      <td id="tp" on:click={onClick}> {tp_text} </td>
      <td id="fp" on:click={onClick}> {fp_text} </td>
    </tr>
    <tr>
      <td class="heading"> Predicted negative </td>
      <td id="fn" on:click={onClick}> {fn_text} </td>
      <td id="tn" on:click={onClick}> {tn_text} </td>
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
  table td:hover {
    cursor: pointer;
    background-color: var(--first-color-bg);
  }

  table th {
    border: 1px solid var(--box-border);
  }

  td.heading {
    width: 20%;
  }
  td.heading:hover {
    cursor: auto;
    background-color: var(--box-color);
  }

  .heading {
    font-weight: bold;
    text-align: left;
  }

</style>
