<script>
  let sections = [
    {
      id: "gathering",
      title: "Data gathering",
      text: '',
    },
    {
      id: "preparation",
      title: "Data preparation",
      text: 'Mitigating bias in the data before training, e.g. by reweighting datapoints <d-cite key="kamiran2012data"></d-cite>, <d-cite key="cesaro2019measuring"></d-cite> or learning a representation of the data omitting information of protected attributes <d-cite key="zemel2013learning"></d-cite>.',
    },
    {
      id: "training",
      title: "Model training",
      text: 'Mitigating bias during training of the model, e.g by regularizations techniques <d-cite key=" hickey2020fairness "></d-cite>.',
    },
    {
      id: "test",
      title: "Model test",
      text: 'Mitigating bias after the model has been trained, e.g. by adjusting the output labels by optimizing after a defined metric <d-cite key=" hardt2016equality"></d-cite>.',
    },
    {
      id: "dummy",
      title: "Dummy",
      text: "I am a dummy",
    },
    {
      id: "deployment",
      title: "Model Deployment",
      text: "",
    },
  ];

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

  var reset = function() {
    title = "";
    infotext = "";
  };

</script>

<div class="ml-cycle">
  <div class="cycle">
    {#each sections as section (section.id)}
      <button class:selected={selectedSection === section.id} id={section.id} on:click={selectBox}>
        {section.title}
      </button>
    {/each}
  </div>
  <div class="text">
    <p> <b>{title}</b> {@html infotext} </p>
  </div>
</div>

<style>

  .ml-cycle {
    grid-column: page;
    margin-bottom: 1rem;
    padding: 1rem;
    padding-bottom: 0;
    border: 1px solid hsla(0, 0%, 0%, 0.1);
    border-radius: 5px;
    background-color: hsl(0, 0%, 97%);
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
    grid-row-gap: 2em;
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
		border: 1px solid #e88f1c;
		border-radius: 5px;
		background-color: #e88f1c;
    color: white;
    cursor: pointer;
    margin: auto;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
    height: 100%;
  }
  button:hover  {
    color: #e88f1c;
    background-color: white;
  }
  button:focus {
    outline:0;
  }

  .selected {
    color: #e88f1c;
    background-color: white;
  }


  #dummy {
    grid-area: top-left;
  }

  #gathering {
    grid-area: top-right;
  }

  #preparation {
    grid-area: right;
  }

  #deployment {
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

</style>
