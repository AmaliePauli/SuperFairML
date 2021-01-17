
// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import ThresholdFigure from './diagrams/threshold_figure.svelte'
import Questionnaire from './diagrams/questionnaire.svelte';
import Testerques from './diagrams/testerques.svelte';

// 'rgb(255, 99, 132)', // red
// 'rgb(54, 162, 235)', // blue
// 'rgb(255, 205, 86)', // yellow
// 'rgb(75, 192, 192)', // green
// 'rgb(153, 102, 255)', // purple
// 'rgb(255, 159, 64)', // orange
// 'rgb(231,233,237)' // grey

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

new Testerques({
	target: document.getElementById("tester-target-10"),
	props: {
		settings: {
		  question: "Under Demographic Parity: If we look at 200 male super figures and 100 female super figures, and we accepted 50 male figures, how many female figures should we accept to achieve the above criterion?",
		  answers: [
		    {
		      answer: "25",
			  result: 96,
			  color: "green"
		    },
		    {
		      answer: "50",
			  result: 3,
			  color: "darkred"
		    },
		    {
		      answer: "75",
			  result: 0,
			  color: "darkred"
			},
			{
				answer: "100",
				result: 1,
				color: "darkred"
			  },
		  ]
		}
	}
});

new Testerques({
	target: document.getElementById("tester-target-11"),
	props: {
		settings: {
		  question: "Under Demographic Parity: If all the heroes are female and all the villains are male, we could simply just accept females?",
		  answers: [
		    {
		      answer: "True",
			  result: 21,
			  color: "darkred"
		    },
		    {
		      answer: "False",
			  result: 79,
			  color: "green"
		    },
		  ]
		}
	}
});

new Testerques({
	target: document.getElementById("tester-target-12"),
	props: {
		settings: {
		  question: "Under Demographic Parity: The fraction of true female heroes rejected could be higher than the fraction of true male heroes rejected?",
		  answers: [
		    {
		      answer: "True",
			  result: 57,
			  color: "green"
		    },
		    {
		      answer: "False",
			  result: 44,
			  color: "darkred"
		    },
		  ]
		}
	}
});

new Testerques({
	target: document.getElementById("tester-target-13"),
	props: {
		settings: {
		  question: "Under Equalized Opportunity: If we are looking at 250 male figures from which 150 are true heroes, and 100 of these get accepted, how many females should we accept when there are 100 females in total and 75 of them are true heroes?",
		  answers: [
		    {
		      answer: "25",
			  result: 2,
			  color: "darkred"
		    },
		    {
		      answer: "50",
			  result: 90,
			  color: "green"
		    },
		    {
		      answer: "75",
			  result: 7,
			  color: "darkred"
			},
			{
				answer: "100",
				result: 1,
				color: "darkred"
			  },
		  ]
		}
	}
});

new Testerques({
	target: document.getElementById("tester-target-14"),
	props: {
		settings: {
		  question: "Under Equalized Opportunity: The case could occur that males have a higher chance of getting accepted than females?",
		  answers: [
		    {
		      answer: "True",
			  result: 55,
			  color: "green"
		    },
		    {
		      answer: "False",
			  result: 45,
			  color: "darkred"
		    },
		  ]
		}
	}
});
new Testerques({
	target: document.getElementById("tester-target-15"),
	props: {
		settings: {
		  question: "Under Equalized Opportunity: The case could occur that the fraction of misclassified figures accepted to the party could be higher in one group than in the other?",
		  answers: [
		    {
		      answer: "True",
			  result: 61,
			  color: "green"
		    },
		    {
		      answer: "False",
			  result: 39,
			  color: "darkred"
		    },
		  ]
		}
	}
});

new Testerques({
	target: document.getElementById("tester-target-16"),
	props: {
		settings: {
		  question: "Under Predictive Parity: The case could occur that the fraction of misclassified figures accepted to the party could be higher in one group than in the other?",
		  answers: [
		    {
		      answer: "True",
			  result: 45,
			  color: "darkred"
		    },
		    {
		      answer: "False",
			  result: 55,
			  color: "green"
		    },
		  ]
		}
	}
});

new Testerques({
	target: document.getElementById("tester-target-17"),
	props: {
		settings: {
		  question: "Under Predictive Parity: The fraction of true female heroes rejected could be higher than the fraction of true male heroes rejected?",
		  answers: [
		    {
		      answer: "True",
			  result: 48,
			  color: "green"
		    },
		    {
		      answer: "False",
			  result: 52,
			  color: "darkred"
		    },
		  ]
		}
	}
});

new Questionnaire({
	target: document.getElementById("questionnaire-target-1"),
	props: {
		settings: {
		  question: "Imagine that you can choose to either be assessed by a person at the door or by an algorithm.  You know nothing about how well they do it but in general, you expect both are acting reasonably. Which scenario do you prefer?",
		  answers: [
		    {
		      answer: "I trust that the person will make the best and most fair decision",
		      result: 10
		    },
		    {
		      answer: "I trust that the algorithm will make the best and most fair decision",
		      result: 13
		    },
		    {
		      answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
		      result: 77
			},
		  ]
		}
	}
});

new Questionnaire({
	target: document.getElementById("questionnaire-target-2"),
	props: {
		settings: {
		  question: "Imagine you can choose to either be assessed by a person at the door or by an algorithm. You know nothing about how well they do it, but in general you expect both are acting reasonably. However, imagine that you now know that some days the person is just really angry and therefore judges one specific sex harder than the other. Which would you then prefer?",
		  answers: [
		    {
		      answer: "I trust that the person will make the best and most fair decision",
		      result: 4
		    },
		    {
		      answer: "I trust that the algorithm will make the best and most fair decision",
		      result: 56
		    },
		    {
		      answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
		      result: 40
			},
		  ]
		}
	}
});

new Questionnaire({
	target: document.getElementById("questionnaire-target-3"),
	props: {
		settings: {
		  question: "Now, imagine that you know that on average the algorithm’s assessments are much more accurate than the person’s. However, the algorithm is at the same time accused of being a bit harder on assessing one specific sex than the other. Which would you then prefer?",
		  answers: [
		    {
		      answer: "I trust that the person will make the best and most fair decision",
		      result: 9
		    },
		    {
		      answer: "I trust that the algorithm will make the best and most fair decision",
		      result: 20
		    },
		    {
		      answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
		      result: 71
			},
		  ]
		}
	}
});

new Questionnaire({
	target: document.getElementById("questionnaire-target-0"),
	props: {
		settings: {
		  question: "Imagine a system, which uses data and statistics, could tell whether you or others are most likely villains or heroes based on data the system has on you.  \nIs it fair to look at statistics and data to assess you?",
		  answers: [
		    {
		      answer: "Yes",
		      result: 13
		    },
		    {
		      answer: "No",
		      result: 24
		    },
		    {
		      answer: "Maybe. It depends mostly on the risk to other people if not using this information from system.",
		      result: 13
			},
			{
				answer: "Maybe. It depends mostly on the rights of the individual being assessed when using the information from the system.",
				result: 50
			  },
		  ]
		}
	}
});
new Questionnaire({
	target: document.getElementById("questionnaire-target-4"),
	props: {
		settings: {
		  question: "Please state you own opinion on the following statement 'I think Predictive parity is fair to use in this setting'",
		  answers: [
		    {
		      answer: "Strongly disagree",
		      result: 6
		    },
		    {
		      answer: "Disagree",
		      result: 12
		    },
		    {
		      answer: "Neither agree or disagree",
		      result: 45
			},
			{
				answer: "Agree",
				result: 27
			},
			{
				answer: "Strongly agree",
				result: 10
			},
		  ]
		}
	}
});

new Questionnaire({
	target: document.getElementById("questionnaire-target-4.1"),
	props: {
		settings: {
		  question: "Please state you own opinion on the following statement 'I find it difficult to understand preditive parity and the questions about it",
		  answers: [
		    {
		      answer: "Strongly disagree",
		      result: 5
		    },
		    {
		      answer: "Disagree",
		      result: 24
		    },
		    {
		      answer: "Neither agree or disagree",
		      result: 24
			},
			{
				answer: "Agree",
				result: 37
			},
			{
				answer: "Strongly agree",
				result: 10
			},
		  ]
		}
	}
});


new Questionnaire({
	target: document.getElementById("questionnaire-target1"),
	props: {
		settings: {
		  question: "Which of the following statements do you find most important to comply with to achieve fairness in the  play setting about superfigures wanting to go to a party?",
		  answers: [
		    {
		      answer: "The chance of getting accepted to the party should be the same for both males and of females",
		      result: 15
		    },
		    {
		      answer: "The chance of a correct prediction when you are allowed into the party should be the same for both males and females",
		      result: 21
			},
		    {
		      answer: "The chance of getting accepted to the party when you, in fact, are a hero should be the same for both males and females",
		      result: 54
		    }
		  ]
		}
	}


new Questionnaire({
	target: document.getElementById("questionnaire-target-5"),
	props: { 
		settings: {
		  question: "Which of the following statements of what you think is the worst case that could occur and which results in unfairness in the  play setting about superfigures wanting to go to a party?",
		  answers: [
		    {
		      answer: "Female figures that are true heroes are rejected more often than male figures that are true heroes",
		      result: 68
		    },
		    {
		      answer: "There are more males at the party who are wrongly accepted than females who are wrongly accepted",
		      result: 17
			},
		    {
		      answer: "Male figures have a higher chance of getting accepted to the party than females",
		      result: 15
		    }
		  ]
		}
	}
});


