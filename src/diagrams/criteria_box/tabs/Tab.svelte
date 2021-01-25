<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<style>
	button {
		background: none;
		border: none;
		border-radius: 0;
		margin: 0;
		color: hsla(0, 0%, 0%, 0.3);
		font-size: 1em;
		padding: 1em;
		cursor: pointer;
		flex: 1;
	}

	button:focus {
		outline:0;
	}

	button:hover {
	  color: black;
	}

	.selected {
		color: black;
		border-bottom: 3px solid #e88f1c;
	}

</style>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>
