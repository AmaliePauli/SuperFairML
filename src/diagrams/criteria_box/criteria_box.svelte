<script>
	import { Tabs, TabList, TabPanel, Tab } from './tabs/tabs.js';
	import Criteria from "./criteria.svelte"
	import { criteriaData } from "./criteria.js"

	// For hidden references to make sure they are added to the global bibliography
	let refs = new Set();
	// Finding references in the criteria text
	for (var i in criteriaData) {
		let text = criteriaData[i].description;
		let citations = text.match(/\<d-cite[^>]*\>/g);
		for (var j in citations) {
			let cur_refs = citations[j].match(/(?<=\s+key\=)[\"\'].*[\"\']/g);
			cur_refs = cur_refs[0].slice(1,-1).split(",");
			for (var k in cur_refs) {
				refs = refs.add(cur_refs[k].trim());
			}
		}
	}
	// Finding references in resource descriptions
	for (var i in criteriaData) {
		let resources = criteriaData[i].resources;
		for (var j in resources) {
			let text = resources[j].caption;
			let citations = text.match(/\<d-cite[^>]*\>/g);
			for (var k in citations) {
				let cur_refs = citations[k].match(/(?<=\s+key\=)[\"\'].*[\"\']/g);
				cur_refs = cur_refs[0].slice(1,-1).split(",");
				for (var l in cur_refs) {
					refs = refs.add(cur_refs[l].trim());
				}
			}
		}
	}
	// Collecting references in the examples
	for (var i in criteriaData) {
		let criterion = criteriaData[i];
		for (var j in criterion.examples) {
			let cur_refs = criterion.examples[j].references;
			for (var k in cur_refs) {
				refs = refs.add(cur_refs[k]);
			}
		}
	}
	refs = Array.from(refs);

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

<!-- To get numbers for references not mentioned elsewhere -->
<div id="hidden-cites">
	{#each refs as ref}
		<d-cite key={ref}></d-cite>
	{/each}
</div>

<style>
	#hidden-cites {
		display: none;
	}
</style>
