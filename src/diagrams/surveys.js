export const questions = [
  {
    type: "opinion",
    id: "0",
    question: "Imagine a system, which uses data and statistics, could tell whether you or others are most likely villains or heroes based on data the system has on you. Is it fair to look at statistics and data to assess you?",
    answers: [
      {
        answer: "Yes",
        percentage: 13
      },
      {
        answer: "No",
        percentage: 24
      },
      {
        answer: "Maybe. It depends mostly on the risk to other people if not using this information from system.",
        percentage: 13
      },
      {
        answer: "Maybe. It depends mostly on the rights of the individual being assessed when using the information from the system.",
        percentage: 50
      },
    ]
  },
  {
    type: "opinion",
    id: "1",
    question: "Imagine that you can choose to either be assessed by a person at the door or by an algorithm.  You know nothing about how well they do it but in general, you expect both are acting reasonably. Which scenario do you prefer?",
    answers: [
      {
        answer: "I trust that the person will make the best and most fair decision",
        percentage: 10
      },
      {
        answer: "I trust that the algorithm will make the best and most fair decision",
        percentage: 13
      },
      {
        answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
        percentage: 77
      },
    ]
  },
  {
    type: "opinion",
    id: "2",
    question: "Imagine you can choose to either be assessed by a person at the door or by an algorithm. You know nothing about how well they do it, but in general you expect both are acting reasonably. However, imagine that you now know that some days the person is just really angry and therefore judges one specific sex harder than the other. Which would you then prefer?",
    answers: [
      {
        answer: "I trust that the person will make the best and most fair decision",
        percentage: 4
      },
      {
        answer: "I trust that the algorithm will make the best and most fair decision",
        percentage: 56
      },
      {
        answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
        percentage: 40
      },
    ]
  },
  {
    type: "opinion",
    id: "3",
    question: "Now, imagine that you know that on average the algorithm’s assessments are much more accurate than the person’s. However, the algorithm is at the same time accused of being a bit harder on assessing one specific sex than the other. Which would you then prefer?",
    answers: [
      {
        answer: "I trust that the person will make the best and most fair decision",
        percentage: 9
      },
      {
        answer: "I trust that the algorithm will make the best and most fair decision",
        percentage: 20
      },
      {
        answer: "I trust that the best and most fair decision is if the algorithm makes a suggestion to the person, but the person makes the final call",
        percentage: 71
      },
    ]
  },
  {
    type: "opinion",
    id: "4",
    question: "Please state you own opinion on the following statement 'I think Predictive parity is fair to use in this setting'",
    answers: [
      {
        answer: "Strongly disagree",
        percentage: 6
      },
      {
        answer: "Disagree",
        percentage: 12
      },
      {
        answer: "Neither agree or disagree",
        percentage: 45
      },
      {
        answer: "Agree",
        percentage: 27
      },
      {
        answer: "Strongly agree",
        percentage: 10
      },
    ]
  },
  {
    type: "opinion",
    id: "4.1",
    question: "Please state you own opinion on the following statement 'I find it difficult to understand preditive parity and the questions about it",
    answers: [
      {
        answer: "Strongly disagree",
        percentage: 5
      },
      {
        answer: "Disagree",
        percentage: 24
      },
      {
        answer: "Neither agree or disagree",
        percentage: 24
      },
      {
        answer: "Agree",
        percentage: 37
      },
      {
        answer: "Strongly agree",
        percentage: 10
      },
    ]
  },
  {
    type: "opinion",
    id: "5",
    question: "Which of the following statements do you find most important to comply with to achieve fairness in the  play setting about superfigures wanting to go to a party?",
    answers: [
      {
        answer: "The chance of getting accepted to the party should be the same for both males and of females",
        percentage: 15
      },
      {
        answer: "The chance of a correct prediction when you are allowed into the party should be the same for both males and females",
        percentage: 21
      },
      {
        answer: "The chance of getting accepted to the party when you, in fact, are a hero should be the same for both males and females",
        percentage: 54
      }
    ]
  },
  {
    type: "opinion",
    id: "6",
    question: "Which of the following statements of what you think is the worst case that could occur and which results in unfairness in the  play setting about superfigures wanting to go to a party?",
    answers: [
      {
        answer: "Female figures that are true heroes are rejected more often than male figures that are true heroes",
        percentage: 68
      },
      {
        answer: "There are more males at the party who are wrongly accepted than females who are wrongly accepted",
        percentage: 17
      },
      {
        answer: "Male figures have a higher chance of getting accepted to the party than females",
        percentage: 15
      }
    ]
  },
  {
    type: "check",
    id: "10",
    question: "Under Demographic Parity: If we look at 200 male super figures and 100 female super figures, and we accepted 50 male figures, how many female figures should we accept to achieve the above criterion?",
    answers: [
      {
        answer: "25",
        percentage: 96,
        right: true,
      },
      {
        answer: "50",
        percentage: 3,
        right: false,
      },
      {
        answer: "75",
        percentage: 0,
        right: false,
      },
      {
        answer: "100",
        percentage: 1,
        right: false,
      },
    ],
    explanation: "The criterion requires equal acceptance rates, and since the acceptance rate for the male group is <d-math>50/200=0.25</d-math>, we also need to accept 25% of the females figures trying to get into the party which would yield that <d-math>100*0.25=25</d-math> females should get accepted.",
  },
  {
    type: "check",
    id: "11",
    question: "Under Demographic Parity: If all the heroes are female and all the villains are male, we could simply just accept females?",
    answers: [
      {
        answer: "True",
        percentage: 21,
        right: false
      },
      {
        answer: "False",
        percentage: 79,
        right: true
      },
    ],
    explanation: "The correct answer is false. Under this criterion we are forced to have an equal acceptance rate between the two groups no matter the underlying distribution of heroes and villains in the two groups. This is an important implication of this criterion that even though there is a smaller percentage of heroes in one group than in the other we are forced to accept the same percentage in each group.",
  },
  {
    type: "check",
    id: "12",
    question: "Under Demographic Parity: The fraction of true female heroes rejected could be higher than the fraction of true male heroes rejected?",
    answers: [
      {
        answer: "True",
        percentage: 57,
        right: true
      },
      {
        answer: "False",
        percentage: 44,
        right: false
      },
    ],
    explanation: "The correct answer is true. The criterion is requiring equal acceptance rates between the groups no matter the underlying distribution of heroes and villains and therefore even though we do not deliberately seek it, we could be forced to reject a higher fraction of true heroes in one group than in the other to achieve the parity.",
  },
  {
    type: "check",
    id: "13",
    question: "Under Equalized Opportunity: If we are looking at 250 male figures from which 150 are true heroes, and 100 of these get accepted, how many females should we accept when there are 100 females in total and 75 of them are true heroes?",
    answers: [
      {
        answer: "25",
        percentage: 2,
        right: false
      },
      {
        answer: "50",
        percentage: 90,
        right: true
      },
      {
        answer: "75",
        percentage: 7,
        right: false
      },
      {
        answer: "100",
        percentage: 1,
        right: false
      },
    ],
    explanation: "The criterion requires us to accept the same fraction of the true heroes in both groups. In the male group we have 150 who are truly heroes and we accept 100 of these which give a true positive rate of  <d-math> 100/150=\\frac{2}{3} </d-math>. Hence we need to accept <d-math> \\frac{2}{3} </d-math> of the true heros in the female group: <d-math>75*\\frac{2}{3}=50</d-math>.",
  },
  {
    type: "check",
    id: "14",
    question: "Under Equalized Opportunity: The case could occur that males have a higher chance of getting accepted than females?",
    answers: [
      {
        answer: "True",
        percentage: 55,
        right: true
      },
      {
        answer: "False",
        percentage: 45,
        right: false
      },
    ],
    explanation: "The correct answer is true. We are not restricted to have equal acceptance rates, and in fact the number example in the question above is revealing different acceptance rates between the groups, hence we do not necessarily fulfill demographic parity.",
  },
  {
    type: "check",
    id: "15",
    question: "Under Equalized Opportunity: The case could occur that the fraction of misclassified figures accepted to the party could be higher in one group than in the other?",
    answers: [
      {
        answer: "True",
        percentage: 61,
        right: true
      },
      {
        answer: "False",
        percentage: 39,
        right: false
      },
    ],
    explanation: "The correct answer is true. Under this criterion, we do not take into account the fraction of correct predictions we make of the figures we accept. We are only looking at the set of true heroes. Therefore an extreme case could be that we in addition to the equal fraction of accepting true heroes  that we in one of the group accepted all the villains as heroes as well.",
  },
  {
    type: "check",
    id: "16",
    question: "Under Predictive Parity: The case could occur that the fraction of misclassified figures accepted to the party could be higher in one group than in the other?",
    answers: [
      {
        answer: "True",
        percentage: 45,
        right: false
      },
      {
        answer: "False",
        percentage: 55,
        right: true
      },
    ],
    explanation: "The correct answer is false. The criterion requires us to have an equal rate of correct predictions of the figures we accept and the rate of misqualified figures we accept is given with 1 minus this rate.",
  },
  {
    type: "check",
    id: "17",
    question: "Under Predictive Parity: The fraction of true female heroes rejected could be higher than the fraction of true male heroes rejected?",
    answers: [
      {
        answer: "True",
        percentage: 48,
        right: true
      },
      {
        answer: "False",
        percentage: 52,
        right: false
      },
    ],
    explanation: "The correct answer is true. In this criterion we are looking at the fraction of true heroes out of the set of figures we predict to be heroes, but it is not restricting us on the numbers of true heroes we reject which is the case in equalized opportunities which looks at the fraction of predicted heroes out of the set of true heros.",
  },
];
