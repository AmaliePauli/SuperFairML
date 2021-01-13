
// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import CriteriaBox from "./diagrams/criteria_box/criteria_box.svelte"
import Graph from './diagrams/graph.svelte';
import Graph2 from './diagrams/graph2.svelte';
import Questionnaire from './diagrams/questionnaire.svelte';
import Testerques from './diagrams/testerques.svelte';

// 'rgb(255, 99, 132)', // red
// 'rgb(54, 162, 235)', // blue
// 'rgb(255, 205, 86)', // yellow
// 'rgb(75, 192, 192)', // green
// 'rgb(153, 102, 255)', // purple
// 'rgb(255, 159, 64)', // orange
// 'rgb(231,233,237)' // grey

new CriteriaBox({
	target: document.getElementById('criteria-box')
});

new Graph({
	target: document.getElementById("graph-target"),
	props: {
		settings: {
		  labels: [0.  , 0.05, 0.1 , 0.15, 0.2 , 0.25, 0.3 , 0.35, 0.4 , 0.45, 0.5 ,
			0.55, 0.6 , 0.65, 0.7 , 0.75, 0.8 , 0.85, 0.9 , 0.95, 1.],
		  datasets: [
		    {
		      label: 'Male',
					data: [
						{
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.66 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.66 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.67 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.67 ,
						 },
						 {
							value: 0.95 ,
							pr: 0.95 ,
							tpr: 0.97 ,
							et: 0.67 ,
						 },
						 {
							value: 0.93 ,
							pr: 0.93 ,
							tpr: 0.95 ,
							et: 0.68 ,
						 },
						 {
							value: 0.92 ,
							pr: 0.92 ,
							tpr: 0.94 ,
							et: 0.68 ,
						 },
						 {
							value: 0.88 ,
							pr: 0.88 ,
							tpr: 0.92 ,
							et: 0.69 ,
						 },
						 {
							value: 0.87 ,
							pr: 0.87 ,
							tpr: 0.91 ,
							et: 0.7 ,
						 },
						 {
							value: 0.85 ,
							pr: 0.85 ,
							tpr: 0.89 ,
							et: 0.7 ,
						 },
						 {
							value: 0.82 ,
							pr: 0.82 ,
							tpr: 0.87 ,
							et: 0.71 ,
						 },
						 {
							value: 0.76 ,
							pr: 0.76 ,
							tpr: 0.82 ,
							et: 0.72 ,
						 },
						 {
							value: 0.69 ,
							pr: 0.69 ,
							tpr: 0.73 ,
							et: 0.7 ,
						 },
						 {
							value: 0.64 ,
							pr: 0.64 ,
							tpr: 0.69 ,
							et: 0.72 ,
						 },
						 {
							value: 0.55 ,
							pr: 0.55 ,
							tpr: 0.62 ,
							et: 0.74 ,
						 },
						 {
							value: 0.44 ,
							pr: 0.44 ,
							tpr: 0.51 ,
							et: 0.77 ,
						 },
						 {
							value: 0.34 ,
							pr: 0.34 ,
							tpr: 0.4 ,
							et: 0.78 ,
						 },
						 {
							value: 0.23 ,
							pr: 0.23 ,
							tpr: 0.27 ,
							et: 0.8 ,
						 },
						 {
							value: 0.11 ,
							pr: 0.11 ,
							tpr: 0.13 ,
							et: 0.83 ,
						 },
						 {
							value: 0.04 ,
							pr: 0.04 ,
							tpr: 0.06 ,
							et: 'Not defined'  ,
						 },
						 {
							value: 0.0 ,
							pr: 0.0 ,
							tpr: 0.0 ,
							et: 'Not defined'  ,
						 },

					],
					color: '#e88f1c' // red
		    },
		    {
		      label: 'Female',
					data: [
						{
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 0.99 ,
							pr: 0.99 ,
							tpr: 1.0 ,
							et: 0.85 ,
						 },
						 {
							value: 0.99 ,
							pr: 0.99 ,
							tpr: 1.0 ,
							et: 0.85 ,
						 },
						 {
							value: 0.98 ,
							pr: 0.98 ,
							tpr: 0.99 ,
							et: 0.85 ,
						 },
						 {
							value: 0.97 ,
							pr: 0.97 ,
							tpr: 0.97 ,
							et: 0.85 ,
						 },
						 {
							value: 0.96 ,
							pr: 0.96 ,
							tpr: 0.96 ,
							et: 0.85 ,
						 },
						 {
							value: 0.9 ,
							pr: 0.9 ,
							tpr: 0.91 ,
							et: 0.85 ,
						 },
						 {
							value: 0.86 ,
							pr: 0.86 ,
							tpr: 0.86 ,
							et: 0.84 ,
						 },
						 {
							value: 0.79 ,
							pr: 0.79 ,
							tpr: 0.8 ,
							et: 0.86 ,
						 },
						 {
							value: 0.63 ,
							pr: 0.63 ,
							tpr: 0.66 ,
							et: 0.88 ,
						 },
						 {
							value: 0.53 ,
							pr: 0.53 ,
							tpr: 0.55 ,
							et: 0.88 ,
						 },
						 {
							value: 0.44 ,
							pr: 0.44 ,
							tpr: 0.47 ,
							et: 0.9 ,
						 },
						 {
							value: 0.34 ,
							pr: 0.34 ,
							tpr: 0.36 ,
							et: 0.87 ,
						 },
						 {
							value: 0.18 ,
							pr: 0.18 ,
							tpr: 0.18 ,
							et: 0.88 ,
						 },
						 {
							value: 0.08 ,
							pr: 0.08 ,
							tpr: 0.08 ,
							et: 0.86 ,
						 },
						 {
							value: 0.0 ,
							pr: 0.0 ,
							tpr: 0.0 ,
							et:'Not defined'  ,
						 },

					],
					color: '#007bff', // blue
			},



		  ]
		}
	}
});



new Testerques({
	target: document.getElementById("tester-target-10"),
	props: {
		settings: {
		  question: "Under Demographic Parity: If we look at 200 male super figures and 100 female super figures, and we accepted 50 male figures, how many female figures should we accept to achieve the above criterion?",
		  answers: [
		    {
		      answer: "25",
			  result: 88,
			  color: "green"
		    },
		    {
		      answer: "50",
			  result: 12,
			  color: "darkred"
		    },
		    {
		      answer: "75",
			  result: 0,
			  color: "darkred"
			},
			{
				answer: "100",
				result: 0,
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
			  result: 32,
			  color: "darkred"
		    },
		    {
		      answer: "False",
			  result: 68,
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
			  result: 60,
			  color: "green"
		    },
		    {
		      answer: "False",
			  result: 40,
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
			  result: 0,
			  color: "darkred"
		    },
		    {
		      answer: "50",
			  result: 85,
			  color: "green"
		    },
		    {
		      answer: "75",
			  result: 10,
			  color: "darkred"
			},
			{
				answer: "100",
				result: 5,
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
			  result: 70,
			  color: "green"
		    },
		    {
		      answer: "False",
			  result: 30,
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
			  result: 70,
			  color: "green"
		    },
		    {
		      answer: "False",
			  result: 30,
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
		      result: 15
		    },
		    {
		      answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
		      result: 75
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
		      result: 5
		    },
		    {
		      answer: "I trust that the algorithm will make the best and most fair decision",
		      result: 75
		    },
		    {
		      answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
		      result: 20
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
		      result: 5
		    },
		    {
		      answer: "I trust that the algorithm will make the best and most fair decision",
		      result: 35
		    },
		    {
		      answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
		      result: 60
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
		      result: 23
		    },
		    {
		      answer: "No",
		      result: 61
		    },
		    {
		      answer: "Maybe. It depends mostly on the risk to other people if not using this information from system.",
		      result: 6
			},
			{
				answer: "Maybe. It depends mostly on the rights of the individual being assessed when using the information from the system.",
				result: 10
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
		      result: 5
		    },
		    {
		      answer: "Disagree",
		      result: 20
		    },
		    {
		      answer: "Neither agree or disagree",
		      result: 50
			},
			{
				answer: "Agree",
				result: 20
			},
			{
				answer: "Strongly agree",
				result: 5
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
		      result: 6
		    },
		    {
		      answer: "The chance of a correct prediction when you are allowed into the party should be the same for both males and females",
		      result: 23
			},
		    {
		      answer: "The chance of getting accepted to the party when you, in fact, are a hero should be the same for both males and females",
		      result: 71
		    }
		  ]
		}
	}
});



new Graph2({
	target: document.getElementById("graph-target-2"),
	props: {
		settings: {
		  labels: [0.  , 0.05, 0.1 , 0.15, 0.2 , 0.25, 0.3 , 0.35, 0.4 , 0.45, 0.5 ,
			0.55, 0.6 , 0.65, 0.7 , 0.75, 0.8 , 0.85, 0.9 , 0.95, 1.],
		  datasets: [
		    {
		      label: 'Male',
					data: [
						{
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.66 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.66 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.67 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.67 ,
						 },
						 {
							value: 0.97 ,
							pr: 0.95 ,
							tpr: 0.97 ,
							et: 0.67 ,
						 },
						 {
							value: 0.95 ,
							pr: 0.93 ,
							tpr: 0.95 ,
							et: 0.68 ,
						 },
						 {
							value: 0.94 ,
							pr: 0.92 ,
							tpr: 0.94 ,
							et: 0.68 ,
						 },
						 {
							value: 0.92 ,
							pr: 0.88 ,
							tpr: 0.92 ,
							et: 0.69 ,
						 },
						 {
							value: 0.91 ,
							pr: 0.87 ,
							tpr: 0.91 ,
							et: 0.7 ,
						 },
						 {
							value: 0.89 ,
							pr: 0.85 ,
							tpr: 0.89 ,
							et: 0.7 ,
						 },
						 {
							value: 0.87 ,
							pr: 0.82 ,
							tpr: 0.87 ,
							et: 0.71 ,
						 },
						 {
							value: 0.82 ,
							pr: 0.76 ,
							tpr: 0.82 ,
							et: 0.72 ,
						 },
						 {
							value: 0.73 ,
							pr: 0.69 ,
							tpr: 0.73 ,
							et: 0.7 ,
						 },
						 {
							value: 0.69 ,
							pr: 0.64 ,
							tpr: 0.69 ,
							et: 0.72 ,
						 },
						 {
							value: 0.62 ,
							pr: 0.55 ,
							tpr: 0.62 ,
							et: 0.74 ,
						 },
						 {
							value: 0.51 ,
							pr: 0.44 ,
							tpr: 0.51 ,
							et: 0.77 ,
						 },
						 {
							value: 0.4 ,
							pr: 0.34 ,
							tpr: 0.4 ,
							et: 0.78 ,
						 },
						 {
							value: 0.27 ,
							pr: 0.23 ,
							tpr: 0.27 ,
							et: 0.8 ,
						 },
						 {
							value: 0.13 ,
							pr: 0.11 ,
							tpr: 0.13 ,
							et: 0.83 ,
						 },
						 {
							value: 0.06 ,
							pr: 0.04 ,
							tpr: 0.06 ,
							et: 'Not defined' ,
						 },
						 {
							value: 0.0 ,
							pr: 0.0 ,
							tpr: 0.0 ,
							et: 'Not defined' ,
						 },
					],
					color: '#e88f1c' // red
		    },
		    {
		      label: 'Female',
					data: [
						{
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 1.0 ,
							tpr: 1.0 ,
							et: 0.84 ,
						 },
						 {
							value: 1.0 ,
							pr: 0.99 ,
							tpr: 1.0 ,
							et: 0.85 ,
						 },
						 {
							value: 1.0 ,
							pr: 0.99 ,
							tpr: 1.0 ,
							et: 0.85 ,
						 },
						 {
							value: 0.99 ,
							pr: 0.98 ,
							tpr: 0.99 ,
							et: 0.85 ,
						 },
						 {
							value: 0.97 ,
							pr: 0.97 ,
							tpr: 0.97 ,
							et: 0.85 ,
						 },
						 {
							value: 0.96 ,
							pr: 0.96 ,
							tpr: 0.96 ,
							et: 0.85 ,
						 },
						 {
							value: 0.91 ,
							pr: 0.9 ,
							tpr: 0.91 ,
							et: 0.85 ,
						 },
						 {
							value: 0.86 ,
							pr: 0.86 ,
							tpr: 0.86 ,
							et: 0.84 ,
						 },
						 {
							value: 0.8 ,
							pr: 0.79 ,
							tpr: 0.8 ,
							et: 0.86 ,
						 },
						 {
							value: 0.66 ,
							pr: 0.63 ,
							tpr: 0.66 ,
							et: 0.88 ,
						 },
						 {
							value: 0.55 ,
							pr: 0.53 ,
							tpr: 0.55 ,
							et: 0.88 ,
						 },
						 {
							value: 0.47 ,
							pr: 0.44 ,
							tpr: 0.47 ,
							et: 0.9 ,
						 },
						 {
							value: 0.36 ,
							pr: 0.34 ,
							tpr: 0.36 ,
							et: 0.87 ,
						 },
						 {
							value: 0.18 ,
							pr: 0.18 ,
							tpr: 0.18 ,
							et: 0.88 ,
						 },
						 {
							value: 0.08 ,
							pr: 0.08 ,
							tpr: 0.08 ,
							et: 0.86 ,
						 },
						 {
							value: 0.0 ,
							pr: 0.0 ,
							tpr: 0.0 ,
							et: 'Not defined',
						 },

					],
					color: '#007bff', // blue
			},



		  ]
		}
	}
});
