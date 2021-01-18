// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import ThresholdFigure from './diagrams/threshold_figure.svelte'
import Questionnaire from './diagrams/questionnaire.svelte';
import Testerques from './diagrams/testerques.svelte';
import Question from './diagrams/survey_questions.svelte';

import { questions } from './diagrams/surveys.js';

new ThresholdFigure ({
	target: document.getElementById("interactive-dp"),
	props: { "fairness_criteria": "demographic parity"}
});

new ThresholdFigure ({
	target: document.getElementById("interactive-eq"),
	props: { "fairness_criteria": "equal opportunity"}
});

new ThresholdFigure ({
	target: document.getElementById("interactive-pp"),
	props: { "fairness_criteria": "predictive parity"}
});

// Question- / survey-boxes
for (let i = 0; i < questions.length; i++) {
	let target;
	if (questions[i].type === "check") {
		target = document.getElementById("tester-target-"+ questions[i].id);
	}
	else {
		target = document.getElementById("questionnaire-target-"+ questions[i].id);
	}
	new Question ({
		target: target,
		props: {
			question: questions[i],
		}
	});
};
