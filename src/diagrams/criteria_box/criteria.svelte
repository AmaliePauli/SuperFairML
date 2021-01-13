<script>
	export let criteriumData;
</script>

<div class="criterium">

	<div class="content">
		<b>{criteriumData.title}</b>
		<div>{@html criteriumData.description}</div>
	</div>

</div>

<style>

	.criterium {
		padding-top: 1em;
	}

</style>
