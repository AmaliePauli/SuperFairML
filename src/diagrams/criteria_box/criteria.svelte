<script>
	export let criteriumData;
</script>

<div class="criterium">

	<div class="content">
		<p class="title"><b>{criteriumData.title}</b></p>
		<div>{@html criteriumData.description}</div>
	</div>

</div>

<style>

	.criterium {
		padding-top: 1em;
	}

	.title {
		margin-bottom: 0.5em;
		border: none;
		padding: 0;
	}

</style>
