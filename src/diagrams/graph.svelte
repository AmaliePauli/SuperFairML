<canvas id="myChart" width="2" height="1"></canvas>

<table>
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Threshold</th>
      <th>Positive rate</th>
      <th>True positive rate</th>
      <th>Positive predicted value </th>
    </tr>
  </thead>
  <tbody>
    {#each settings.datasets as ds, key}
      <tr>
        <td style={"color: " + ds.color + ";"}><strong>{ds.label}</strong></td>
        <td>{clickedData[key] ? clickedData[key].label : ""}</td>
        <td>{clickedData[key] ? clickedData[key].pr : ""}</td>
        <td>{clickedData[key] ? clickedData[key].tpr : ""}</td>
        <td>{clickedData[key] ? clickedData[key].et : ""}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
table {
  margin: auto;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #AAAAAA;
  table-layout: fixed;
}

table td, table th {
  text-align: center;
  font-size: 11px;
  /* border: 1px solid #AAAAAA; */
}

table td {

}

table tbody tr:nth-child(odd) {
  background: #eceff0;
}

table td:first-child {
  /* background: #EEEEEE; */
  text-align: right;
}

</style>

<script>
import {onMount} from 'svelte/internal';
import {Chart} from 'chart.js';
export let settings;

let clickedData = {};

function createChart() {
  let canvas = document.getElementById('myChart');
  let ctx = canvas.getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: settings.labels,
      datasets: settings.datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data.map(d => (d.value)),
        backgroundColor: ds.color,
        borderColor: ds.color,
        borderWidth: 1,
        fill: false
      }))
    },
    options: {
      tooltips: {
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Positive rate'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Threshold'
          }
        }]
      }
    }
  });

  canvas.onclick = (e) => {
    let points = myChart.getElementsAtEventForMode(e, 'nearest', {intersect: false});
    if (points && points.length > 0) {
      let datasetIndex = points[0]._datasetIndex;
      let dataIndex = points[0]._index;

      let dataset = settings.datasets[datasetIndex];
      clickedData[datasetIndex] = {...dataset.data[dataIndex], label: settings.labels[dataIndex]};
    }
  }
}

onMount(createChart);
</script>
