<script>
	export let criteriumData;
</script>

<div class="criterium">
	<div class="content">
		<h3><b>{criteriumData.title}</h3>
		<div>{@html criteriumData.description}</div>
	</div>
	<div class="examples">
		<p class="heading"><b>Examples</b></p>
		<div></div>
	</div>
</div>

<style>

	.heading {
		margin-bottom: 0.5em;
		border: none;
		padding: 0;
	}

</style>
