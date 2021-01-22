<script>
	export let criteriumData;

	var createCitations = function (references) {
		return references.join(",");
	}

</script>

<div class="criterium">
	<div class="title"> <h3>{criteriumData.title}</h3> </div>
	<div class="content">
		{@html criteriumData.description}
	</div>
	{#if criteriumData.examples.length > 0}
		<div class="examples">
			<p class="heading">Examples</p>
			<ul>
				{#each criteriumData.examples as example}
					<li>
						{example.name}
						<d-cite key={createCitations(example.references)}></d-cite>
					</li>
				{/each}
  		</ul>
		</div>
	{/if}
	{#if criteriumData.resources.length > 0}
		<div class="resources">
			{#each criteriumData.resources as resource}
				<div class="resource">
					<a href={resource.url}><img src="images/criteria/{resource.image}" alt="Screen capture of an online resource."/></a>
					<div class="resource-text">
						<div class="resource-title"><a href={resource.url}>{resource.title}</a></div>
						<div class="resource-description">{@html resource.caption}</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>

	.criterium {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: auto auto auto;
		grid-column-gap: 1rem;
		grid-row-gap: 1rem;
	}

	.title {
		grid-column: 1 / 13;
		grid-row: 1 / 1;
	}
	.title > h3 {
		padding: 0;
		margin-bottom: 0;
		margin-top: 0.5rem;
	}

	.content {
		grid-column: 1 / 9;
		grid-row: 2 / 2;
		text-align: justify;
	}

	.examples {
		grid-column: 9 / 13;
		grid-row: 2 / 2;
	}
	p.heading {
		font-weight: bold;
		margin-bottom: 0;
	}
	li {
		margin-bottom: 0;
	}

	.resources {
			grid-column: 1 / 13;
			grid-row: 3 / 3;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			grid-column-gap: 1rem;
			grid-row-gap: 1rem;
	}
	.resource-title {
		margin-bottom: 0.5rem;
		font-size: 1.06rem;
	}
	.resource-description {
		font-size: 13px;
		line-height: 1.5em;
	}
	img {
		width: 100%;
		height: auto;
		border: 1px solid hsla(0, 0%, 0%, 0.1);
	}
	.resource > a {
		border-bottom: none;
	}

</style>
