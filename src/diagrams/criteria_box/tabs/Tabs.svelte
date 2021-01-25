<script context="module">
	export const TABS = {};
</script>

<script>
	import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const tabs = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

	setContext(TABS, {
		registerTab: tab => {
			tabs.push(tab);
			selectedTab.update(current => current || tab);

			onDestroy(() => {
				const i = tabs.indexOf(tab);
				tabs.splice(i, 1);
				selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current);
			});
		},

		registerPanel: panel => {
			panels.push(panel);
			selectedPanel.update(current => current || panel);

			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
			});
		},

		selectTab: tab => {
			const i = tabs.indexOf(tab);
			selectedTab.set(tab);
			selectedPanel.set(panels[i]);
		},

		selectedTab,
		selectedPanel
	});
</script>

<style>

	.tabs {
		grid-column: page;
		margin-bottom: 1em;
		padding: 1em 1em;
		padding-top: 0em;
		border: 1px solid hsla(0, 0%, 0%, 0.1);
		border-radius: 5px;
		background-color: hsl(0, 0%, 97%);
	}

	@media(max-width: 768px) {
    .tabs {
    	grid-column: screen;
		}
	}

</style>

<figure class="subgrid">
	<div class="tabs interactive-container">
		<slot></slot>
	</div>
	<figcaption style="grid-column: page; text-align: center;">
		[TODO]
	</figcaption>
</figure>
