<script>
  export let question;

  let selected = null;
  let submitted = false;

  // Color scheme
  let boxColor;
  let answerBoxColor;
  let buttonColor;
  let buttonHoverColor;
  let colorWrong = "lightgrey";
  let colorRight = getComputedStyle(document.documentElement).getPropertyValue("--first-color");
  if (question.type === "opinion") {
    boxColor = getComputedStyle(document.documentElement).getPropertyValue("--second-color-weak");
    answerBoxColor = getComputedStyle(document.documentElement).getPropertyValue("--second-color-bg");
    buttonColor = getComputedStyle(document.documentElement).getPropertyValue("--second-color");
    buttonHoverColor = getComputedStyle(document.documentElement).getPropertyValue("--second-color-button-hover");
  }
  else if (question.type === "check") {
    boxColor = getComputedStyle(document.documentElement).getPropertyValue("--first-color-weak");
    answerBoxColor = getComputedStyle(document.documentElement).getPropertyValue("--first-color-bg");
    buttonColor = getComputedStyle(document.documentElement).getPropertyValue("--first-color");
    buttonHoverColor = getComputedStyle(document.documentElement).getPropertyValue("--first-color-button-hover");
  }
  let cssColors = `--box-color:${boxColor};--answer-box-color:${answerBoxColor};--button-color:${buttonColor};--button-hover-color:${buttonHoverColor}`;

  function onSubmit() {
    submitted = true;
  }
</script>

<div class="box" style="{cssColors}">
  <p class="question">{question.question}</p>
  <div class="answer-box">
    {#each question.answers as {answer, percentage}, i}
      <div class="answer">
        <div class="row">
          <label for={"answer-" + i}>{answer}</label>
          <input id={"answer-" + i} type="radio" bind:group={selected} value={i} disabled={submitted}>
        </div>
        {#if submitted}
          <div class="result-box">
            {#if question.type === "check"}
              {#if question.answers[i].right === false}
                <div class="result-bar" style="width: {percentage}%;background-color: {colorWrong};"></div>
              {:else}
                <div class="result-bar" style="width: {percentage}%;background-color: {colorRight};"></div>
              {/if}
            {:else}
              <div class="result-bar" style="width: {percentage}%"></div>
            {/if}
            <div class="text">{percentage}%</div>
          </div>
        {/if}
      </div>
    {/each}
    {#if !submitted}
      <input class="btn" type="button" value= "Submit" on:click={onSubmit} disabled={selected === null}/>
    {/if}
  </div>
</div>

<style>

  .box {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 12px;
    border: none;
    border-radius: 15px;
    background-color: var(--box-color);
  }

  .box > p {
    white-space: pre-wrap;
  }

  p.question {
    font-weight: bold;
    font-size: 1rem;
  }

  .answer-box {
    padding: 12px;
    border: none;
    border-radius: 10px;
    background-color: var(--answer-box-color);
  }

  .answer {
    padding-bottom: 15px;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .row > label {
    width: 95%;
    display: inline-block;
  }

  .row > input {
    display: inline-block;
  }

  .result-box {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 1.5rem;
    background-color: white;
  }

  .result-bar {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--button-color);
  }

  .text {
    position: relative;
    z-index: 2;
    top: -0.2rem;
    left: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    color: black;
    /*font-weight: bold;*/
  }

  .btn {
    display: inline-block;
    padding: 0.35em 1.2em;
    border: 0.1em solid var(--button-color);
    border-radius: 0.15em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight: bold;
    color: white;
    text-align:center;
    transition: all 0.2s;
    background-color: var(--button-color);
  }

  .btn:hover {
    background-color: var(--button-hover-color);
    border-color: white;
  }

</style>
