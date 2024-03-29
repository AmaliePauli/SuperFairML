// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import CriteriaBox from "./diagrams/criteria_box/criteria_box.svelte"
import MLCycle from './diagrams/ml_cycle.svelte';
import SurveyInfo from './diagrams/survey_info.svelte';
import ThresholdFigure from './diagrams/threshold_figure.svelte';
import Question from './diagrams/survey_questions.svelte';
import { questions } from './diagrams/surveys.js';
import ConfusionMatrix from './diagrams/confusion_matrix.svelte';
import SpearmanTable from './diagrams/spearman_correlation.svelte';
import HeroVillainBar from './diagrams/hero_villain_bar.svelte';

new SurveyInfo ({
	target: document.getElementById("survey-info"),
});

new CriteriaBox({
	target: document.getElementById('criteria-box')
});

new MLCycle ({
	target: document.getElementById("ml-cycle"),
	props: {}
});

new ThresholdFigure ({
	target: document.getElementById("interactive-dp"),
	props: {
		"fairness_criteria": "Demographic Parity",
		"parity_thresholds": {"male": 0.61, "female": 0.67},
	}
});

new ThresholdFigure ({
	target: document.getElementById("interactive-eq"),
	props: {
		"fairness_criteria": "Equalized Opportunity",
		"parity_thresholds": {"male": 0.61, "female": 0.62},
	}
});

new ThresholdFigure ({
	target: document.getElementById("interactive-pp"),
	props: {
		"fairness_criteria": "Predictive Parity",
		"parity_thresholds": {"male": 0.81, "female": 0.6},
	}
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

new ConfusionMatrix({
	target: document.getElementById('confusion-matrix')
});

new SpearmanTable({
	target: document.getElementById('spearman-correlation')
});

new HeroVillainBar({
	target: document.getElementById('hero-villain-bar-figure')
});
