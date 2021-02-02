<script>
  let sections = [
    {
      id: "gathering",
      title: "1. Data gathering",
      text: `Chen et al. propose to mitigate bias through data collection, e.g. by
      increasing the training data or gathering additional features <d-cite key="Chen2018"></d-cite>.`,
    },
    {
      id: "preparation",
      title: "2. Data preparation",
      text: `Discrimination or bias can be mitigated as part of the data preparation (also called pre-processing
      <d-cite key="bellamy2018ai"></d-cite>), e.g. by reweighting data points
      <d-cite key="kamiran2012data, SaraHajian2013, cesaro2019measuring"></d-cite>, learning a
      representation of the data to omit information of protected attributes
      <d-cite key="zemel2013learning, Feldman2015, Louizos2015, Calmon2017, Moyer2018"></d-cite>
      or leveraging information from a causal model to remove unfair effects <d-cite key="kusner2017counterfactual, Chiappa2019"></d-cite>.`,
    },
    {
      id: "training",
      title: "3. Model training",
      text: `Bias can also be mitigated during training of the model through so called in-processing
      algorithms <d-cite key="bellamy2018ai"></d-cite>. This can be achieved
      by specifically designed training algorithms or models, e.g. using adversarial learning
      <d-cite key="Zhang2018, Lahoti2020"></d-cite>, fairness specific regularization techniques
      <d-cite key="Kamishima2012, Berk2017, hickey2020fairness, Stefano2020"></d-cite>, a modified hyperparameter tuning
      <d-cite key="Perrone2020"></d-cite>, reformulating the optimization problem
      <d-cite key="dwork2012fairness, Woodworth2017, GalYona2018, Nabi2018, Agarwal2018a, Goel2018, kearns2018preventing, Jung2019, Zafar2019, Kim2019, Ruoss2020"></d-cite> or
      re-weighting of data points during training <d-cite key="Amini2019"></d-cite>.`,
    },
    {
      id: "test",
      title: "4. Model evaluation",
      text: `Different approaches have been proposed to assess a model's bias or discrimination. For example through comparing
      two models with respect to their (individual) fairness <d-cite key="Speicher2018"></d-cite>, automatically generating
      test inputs <d-cite key="Agarwal2018"></d-cite>, creating a transparency report based on a FlipTest
      <d-cite key="Black2020"></d-cite> or using a causal framework <d-cite key="JunzheZhang2018"></d-cite>.
      Note, that a bias can be introduced during the evaluation process (see <d-cite key="Suresh2019"></d-cite> for
      mitigation approaches).`,
    },
    {
      id: "deploy",
      title: "5. Model implementation",
      text: `Before implementing a trained model a potential bias can be mitigated through post-processing steps,
      e.g. by adjusting the output labels by optimizing after a defined metric
      <d-cite key="hardt2016equality, Woodworth2017, Pleiss2017, kim2018fairness"></d-cite>. In addition, one should be aware of a
      so called deployment bias when the model is used different from its intentional use
      case <d-cite key="Suresh2019"></d-cite>.`,
    },
    {
      id: "monitoring",
      title: "6. Model monitoring",
      text: `A model can, for example, be monitored for bias by logging and observing statistical
      fairness measures or other fairness definitions (see <a href="#criteria-box">the box</a> describing
      different fairness definitions). There exist different libraries for meausring discrimination of
      a model, e.g. <a href=https://aif360.mybluemix.net/>AI Fairness 360 </a>,
      <a href=https://fairlearn.github.io/>Fairlearn</a> or <a href=https://github.com/linkedin/LiFT>LiFT</a>.`,
    },
  ];

  // For hidden references to make sure they are added to the global bibliography
	let refs = new Set();
	// Finding references in the section texts
	for (var i in sections) {
		let text = sections[i].text;
		let citations = text.match(/\<d-cite[^>]*\>/g);
		for (var j in citations) {
			let cur_refs = citations[j].match(/(?<=\s+key\=)[\"\'].*[\"\']/g);
			cur_refs = cur_refs[0].slice(1,-1).split(",");
			for (var k in cur_refs) {
				refs = refs.add(cur_refs[k].trim());
			}
		}
	}
  refs = Array.from(refs);

  let selectedSection;
  let infotext = "";
  let title = ""

  var selectBox = function(event) {
    selectedSection = event.target.id;
    for(var i in sections) {
      let section = sections[i];
      if (section.id === event.target.id) {
        title = section.title + ":";
        infotext = section.text;
        break;
      }
    }
  };

</script>

<div class="ml-cycle">
  <div class="cycle">
    {#each sections as section (section.id)}
      <button class:selected={selectedSection === section.id} id={section.id} on:click={selectBox}>
        {section.title}
      </button>
    {/each}
    <div class="circle"></div>
  </div>
  <div class="text">
    <p> <b>{title.slice(3)}</b> {@html infotext} </p>
  </div>
</div>

<!-- To get numbers for references not mentioned elsewhere -->
<div id="hidden-cites">
	{#each refs as ref}
		<d-cite key={ref}></d-cite>
	{/each}
</div>

<style>

  .ml-cycle {
    grid-column: text;
    margin-bottom: 1rem;
    padding: 1rem;
    padding-bottom: 0;
    border: 1px solid var(--box-border);
    border-radius: 5px;
    background-color: var(--box-color);
  }
  @media(max-width: 768px) {
    .ml-cycle {
      grid-column: text;
    }
  }

  .cycle {
    display: grid;
    margin-bottom: 1em;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 2em;
    grid-row-gap: 1em;
    grid-template-areas:
    ". top-left top-left top-right top-right ."
    ". top-left top-left top-right top-right ."
    "left left middle middle right right"
    "left left middle middle right right"
    ". bottom-left bottom-left bottom-right bottom-right ."
    ". bottom-left bottom-left bottom-right bottom-right .";
  }

  button {
    padding: 0.5em;
		border: 1px solid var(--first-color);
		border-radius: 5px;
		background-color: var(--first-color);
    color: white;
    cursor: pointer;
    margin: auto;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    justify-self: center;
  }
  button:hover  {
    color: var(--first-color);
    background-color: white;
  }
  button:focus {
    outline:0;
  }

  .selected {
    color: var(--first-color);
    background-color: white;
  }

  .circle {
    grid-area: middle;
    justify-self: center;
    width: 100px;
    background-size: 100% 100%;
    border: none;
    background: url(../../images/circle.svg);
  }

  #monitoring {
    grid-area: top-left;
  }

  #gathering {
    grid-area: top-right;
  }

  #preparation {
    grid-area: right;
  }

  #deploy {
    grid-area: left;
  }

  #training {
    grid-area: bottom-right;
  }

  #test {
    grid-area: bottom-left;
  }

  .text {
    grid-column: text;
  }

  #hidden-cites {
		display: none;
	}

</style>
