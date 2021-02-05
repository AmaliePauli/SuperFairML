<script>

  import { onMount } from 'svelte/internal';

  // Use global style for the chart
  let style = getComputedStyle(document.getElementsByTagName("d-article")[0]);
  const font_size = Math.floor(parseFloat(style.fontSize) * 0.8);
  Chart.defaults.global.defaultFontSize = font_size;
  Chart.defaults.global.defaultFontFamily = style.fontFamily;
  Chart.defaults.global.defaultFontColor = style.color;
  // Use globally defined colors
  const male_color = getComputedStyle(document.documentElement).getPropertyValue("--first-color");
  const female_color = getComputedStyle(document.documentElement).getPropertyValue("--second-color");

  // Male and female numbers
  const males = [204, 107];
  const females = [91, 27];

  var barChartData = {
    labels: ['Hero', 'Villain'],
    datasets: [
      {
        label: 'Male',
        backgroundColor: male_color,
        hoverBackgroundColor: male_color,
        data: males,
      },
      {
        label: 'Female',
        backgroundColor: female_color,
        hoverBackgroundColor: female_color,
        data: females,
      },
    ]
  };

  const createBarChart = function() {
    let canvas = document.getElementById('hero-villain-barchart');
    let ctx = canvas.getContext('2d');

    let barChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        tooltips: {
          enabled: false,
        },
        responsive: true,
        scales: {
             ticks: {
               fontSize: font_size,
               fontColor: style.fontColor,
               fontStyle: style.fontStyle,
             },
             scaleLabel: {
               fontSize: font_size,
               fontColor: style.fontColor,
               fontStyle: style.fontStyle,
             },
             xAxes: [{
                 scaleLabel: {
                   display: true,
                   labelString: 'Alignment'
                 }
             }],
             yAxes: [{
                 type: 'linear',
                 position: 'bottom',
                 ticks: {
                   beginAtZero: true
                 },
                 scaleLabel: {
                   display: true,
                   labelString: 'Number of superfigures'
                 }
             }]
         },
         legend: {
             onClick: () => {},
             labels: {
               fontSize: font_size,
               fontColor: style.fontColor,
               fontFamily: style.fontFamily,
             },
             position: "top",
             align: "end",
         },
         hover: {
           animationDuration: 0
         },
         animation: {
          duration: 0,
          onComplete: function () {
            // render the value of the chart above the bar
            var ctx = this.chart.ctx;
            ctx.fillStyle = this.chart.config.options.defaultFontColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length; i++) {
                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                ctx.fillText(dataset.data[i], model.x, model.y - 3);
              }
            });
          }
        }
      }
    });
  }

  onMount(() => {
      createBarChart();
  });

</script>

<figure style="text-align: center;">
  <canvas id="hero-villain-barchart" width="100%" height="50px" aria-label="Barchart showing number of superheroes and villains for each gender." role="img">
     <p>Barchart showing number of superheroes and villains for each gender.</p>
  </canvas>
  <figcaption style="text-align: left;">
    <b>Figure [Number]:</b> Barchart showing number of superheroes and villains for each gender.
    There is both an imbalance between superheroes ({males[0]+females[0]}) and villains ({males[1]+females[1]}),
    and males ({males[0]+males[1]}) and females ({females[0]+females[1]}) in the example dataset.
  </figcaption>
</figure>

<style>
  canvas {
    margin-bottom: 0.5rem;
  }
</style>
