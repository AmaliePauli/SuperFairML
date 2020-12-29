<div class="box">
  <p><strong>{settings.question}</strong></p>
  <div class="answer-box">
    {#each settings.answers as {answer, result, color}, i}
      <div class="answer">
        <div class="row">
          <label for={"answer-" + i}>{answer}</label><input id={"answer-" + i} type="radio" bind:group={selected} value={i} disabled={submitted}>
        </div>
        {#if submitted}
          <div class="result-box">
          <div class="result-bar" style="width: {result}%; background-color: {color}">{result}%</div>
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
  background-color: rgb(235, 184, 137);
}

.box > p {
  white-space: pre-wrap;
}

.answer-box {
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: #f5e9df;
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
  background-color: #fff;
}

.result-bar {
  /* width: 10%; */
  height: 30px;
   /* background-color: #4c82af; */
  text-align: center;
  line-height: 30px;
  color: white;
}

.btn {
  display: inline-block;
  /* display:block;
  margin:0 auto; */
  padding:0.35em 1.2em;
  border: 0.1em solid #e88f1c;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration:none;
  font-weight: 300;
  color: #fff; 
  text-align:center;
  transition: all 0.2s;
  background-color: #e88f1c;
}


.btn:hover {
  background-color:#deb076;
  border-color:  #fff;
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
