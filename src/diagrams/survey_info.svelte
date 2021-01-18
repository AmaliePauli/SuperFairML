<script>
  import Question from "./survey_questions.svelte";

  const opinion_example = {
    type: "opinion",
    question: "Do you like surveys?",
    answers: [
      {
        answer: "Yes",
        percentage: 70
      },
      {
        answer: "No",
        percentage: 30
      },
    ]
  };

  const check_example = {
    type: "check",
    question: "Will there be an explanation once you submitted your answer?",
    answers: [
      {
        answer: "Yes",
        percentage: 90,
        right: true
      },
      {
        answer: "No",
        percentage: 10,
        right: false
      },
    ],
    explanation: "Comprehension questions always show an explanation for the correct answer."
  };

</script>

<div class="infobox">
  <div class="survey stats">
    <div class="heading"> Survey information </div>
    <p>
      The survey was conducted through 12/20-01/21 and had 92 participants with the following demographics:
    </p>
    <table>
      <tr>
        <td>
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
            <path class="icon male" d="M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48
            144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24
            24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745
            24-24V192c0-26.51-21.49-48-48-48z"/>
          </svg>
          60% males
        </td>
        <td>
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path class="icon female" d="M128 0c35.346 0 64 28.654 64 64s-28.654 64-64 64c-35.346 0-64-28.654-64-64S92.654
            0 128 0m119.283 354.179l-48-192A24 24 0 0 0 176 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H80a24 24
            0 0 0-23.283 18.179l-48 192C4.935 369.305 16.383 384 32 384h56v104c0 13.255 10.745 24 24 24h32c13.255 0
            24-10.745 24-24V384h56c15.591 0 27.071-14.671 23.283-29.821z"/>
          </svg>
          40% females
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
            <path class="icon" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248
            8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77
            16.87l-17.39 46.85c-13.76 3-28 4.69-42.65
            4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792
            0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01
            12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25
            16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0
            11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0
            0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017
            16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08
            5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69
            13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72
            32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1
            0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74
            17.16-1.82 25.54L417 274.25z"/>
          </svg>
          10 nationalities (88% Danish).
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path class="icon" d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54
            38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68
            19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14
            313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6
            284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84
            3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"/>
          </svg>
          43% reported to be "Experienced/ Very Experienced" in statistic or machine learning.
        </td>
      </tr>
    <table>
    <div class="heading"> Interactive questionnaires in this article </div>
    <p>
      A selection of questions from the survey is shown in this paper to encourage
      the reader to test her own understanding and to build an own opinion of different issues regarding fair ML.
      There are two types of questions: 1) Opinion questions and 2) Comprehension questions.
      The opinion questions ask the reader about his opinion, while the comprehension questions check the reader's
      understanding of different fairness definitions. Both types are shown below with dummy examples.
      Once an answer is chosen, the percentage of survey participants is revealed for each option. For the comprehension questions
      wrong answers are marked in grey and an explanation for the correct answer is shown.
    </p>
  </div>
  <div class="examples">
    <div class="left">
      <Question question={opinion_example}/>
    </div>
    <div class="right">
      <Question question={check_example}/>
    </div>
  </div>
</div>

<style>

  .infobox {
		grid-column: page;
		margin-bottom: 1em;
		padding: 1em 1em;
		padding-top: 1em;
		border: 1px solid hsla(0, 0%, 0%, 0.1);
		border-radius: 5px;
		background-color: hsl(0, 0%, 97%);
	}
	@media(max-width: 768px) {
    .infobox {
    	grid-column: screen;
		}
	}

  .heading {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  table {
    width: 70%;
    table-layout: fixed;
    border-collapse: separate;
    border: none;
  }

  table td {
    position: relative;
    text-align: left;
    border: none;
    font-size: 1em;
  }

  path.icon {
    fill: hsla(0, 0%, 0%, 0.3);
  }
  path.icon.male {
    fill: var(--first-color-weak);
  }
  path.icon.female {
    fill: var(--second-color-weak);
  }
  svg.icon {
    height: 30px;
  }

  .examples {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 1em;
    margin-top: -0.5em;
	}

  .left {
		grid-column-start: 1;
		grid-column-end: 1;
	}

  .right {
		grid-column-start: 2;
		grid-column-end: 2;
	}

</style>
