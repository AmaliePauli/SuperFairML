<script>
  export let barSettings;
  export let title;
  export let gender;
  export let perc;
  export let icon;
  $: perc_bar_heights = Math.round(barSettings.height * (1.0 - perc));
</script>

<p style="font-size: {barSettings.fontSize};" class="title"> {title} </p>
<div style="height: {barSettings.height.toString() + 'px'}; width: {barSettings.width.toString() + 'px'};" class="bar">
  <div style="background-color: {barSettings.color[gender].background}; height: {perc_bar_heights.toString() + 'px'};" class="percentage_background"></div>
  <div style="background-color: {barSettings.color[gender].foreground};" class="percentage"></div>
  <div style="background: {icon};" class="icon"></div>
  <div class="text {barSettings.mode}">
    {Math.round(perc*100)}%
  </div>
</div>

<style>

  p.title {
    margin-bottom: 0.5em;
  }

  div.bar {
    position: relative;
    z-index: 0;
    margin: auto;
  }
  div.percentage_background {
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 0;
    left: 0;
    border: none;
  }
  div.percentage {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: none;
  }
  div.icon {
    position: absolute;
    z-index: 3;
    top: -1px;
    left: 0;
    width: calc(100% + (1px));
    height: calc(100% + (3px));
    background-size: 100% 100%;
    border: none;
  }
  div.text {
    position: relative;
    z-index: 4;
    top: 20%;
    left: 2%;
    font-size: 0.8rem;
    font-weight: bold;
    text-align: center;
    border: none;
  }
  div.text.secondary {
    top: 100%;
    left: 5%;
  }

</style>
