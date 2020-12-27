<div class="box">
  <p><strong>{settings.question}</strong></p>
  <div class="answer-box">
    {#each settings.answers as {answer, result}, i}
      <div class="answer">
        <div class="row">
          <label for={"answer-" + i}>{answer}</label><input id={"answer-" + i} type="radio" bind:group={selected} value={i} disabled={submitted}>
        </div>
        {#if submitted}
          <div class="result-box">
            <div class="result-bar" style="width: {result}%">{result}%</div>
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
  padding: 12px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  border-radius: 5px;
  background-color: rgb(203, 222, 243);
}

.box > p {
  white-space: pre-wrap;
}

.answer-box {
  padding: 12px;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  border-radius: 5px;
  background-color: rgb(230, 227, 227);
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
  width: 100%;
  background-color: #ddd;
}

.result-bar {
  /* width: 10%; */
  height: 30px;
  background-color: #4c82af;
  text-align: center;
  line-height: 30px;
  color: white;
}

.btn {
  display: inline-block;
  /* display:block;
  margin:0 auto; */
  padding:0.35em 1.2em;
  border:0.1em solid #007bff;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration:none;
  font-weight: 600;
  color: #fff;
  text-align:center;
  transition: all 0.2s;
  background-color: #007bff;
}

.btn:hover {
  background-color: #7abaff;
  border-color: #fff;
}
</style>

<script>
  export let settings;

  let selected = null;
  let submitted = false;

  function onSubmit() {
    submitted = true;
  }
</script>
