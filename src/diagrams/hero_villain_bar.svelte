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

  var barTooltip = function(tooltipModel) {
    // Tooltip Element
    var tooltipEl = document.getElementById('bar-tooltip');

    // Create element on first render
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'bar-tooltip';
        tooltipEl.innerHTML = '';
        document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
        tooltipEl.classList.add('above');
    }

    // Set Text
    if (tooltipModel.body) {

        let innerHtml = "";
        tooltipModel.dataPoints.forEach(function(item, i) {
            innerHtml += item.value + "<br>";
        });
        // Remove last <br>
        innerHtml = innerHtml.slice(0, -4);
        tooltipEl.innerHTML = innerHtml;
    }

    // `this` will be the overall tooltip
    var position = this._chart.canvas.getBoundingClientRect();;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1.0;
    tooltipEl.style.color = 'black';
    tooltipEl.style.border = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - (0.5 * font_size) + 'px';
    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - (1.5 * font_size) - 3 + 'px';
    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipEl.style.fontWeight = "bold";
    tooltipEl.style.padding = 0;
    tooltipEl.style.pointerEvents = 'none';
	};

  const createBarChart = function() {
    let canvas = document.getElementById('hero-villain-barchart');
    let ctx = canvas.getContext('2d');

    let barChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        tooltips: {
          mode: 'point',
          intersect: true,
          enabled: false,
          custom: barTooltip,
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
    <b>Figure 1:</b> Barchart showing number of superheroes and villains for each gender.
    There is both an imbalance between superheroes ({males[0]+females[0]}) and villains ({males[1]+females[1]}),
    and males ({males[0]+males[1]}) and females ({females[0]+females[1]}) in the example dataset.
  </figcaption>
</figure>

<style>
  canvas {
    margin-bottom: 0.5rem;
  }
</style>
