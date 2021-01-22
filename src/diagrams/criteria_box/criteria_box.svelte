<script>
	import { Tabs, TabList, TabPanel, Tab } from './tabs/tabs.js';
	import Criteria from "./criteria.svelte"
	import { criteriaData } from "./criteria.js"
</script>

<Tabs>
	<TabList>
		{#each criteriaData as criterium}
    	<Tab>
			   {criterium.title}
		  </Tab>
	{/each}
	</TabList>

	{#each criteriaData as criterium}
    <TabPanel>
      <Criteria criteriumData={criterium} />
    </TabPanel>
	{/each}
</Tabs>

<style>
</style>
