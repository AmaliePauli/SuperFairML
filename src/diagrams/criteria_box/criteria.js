export const criteriaData = [
    {
      title: "Statistical Measures",
      description: `<p> A lot of focus in the literature has been on statistical measures where metrics for a
      predictor can be calculated by comparing the predicted classes and the actual classes. In a binary
      classification problem, one (privileged) outcome is typically defined as <i>positive</i> and
      the other (unprivileged) outcome as <i>negative</i>. The number of correctly and wrongly predicted positive
      and negative examples form the so called confusion matrix [TABLE]. Using terms derived from the confusion matrix,
      different metrics can be calculated with the aim of achieving fairness between groups, e.g race or gender
      (see <d-cite key="verma2018fairness, mitchell2018prediction, mehrabi2019survey"></d-cite> for summaries of different metrics).
      The requirements for fairness with such statistical measures is to (approximately) achieve a parity, i.e. equality,
      between groups for a defined measure. </p>`,
      examples: [
        {
          name: "Demograhic Parity",
          references: ["dwork2012fairness", "zliobaite2015"],
        },
        {
          name: "Equalized Opportunities",
          references: ["hardt2016equality"],
        },
        {
          name: "Predictive Parity",
          references: ["chouldechova2017fair"],
        },
        {
          name: "Equalized Odds",
          references: ["hardt2016equality"],
        },
        {
          name: "Predictive Equality",
          references: ["chouldechova2017fair","CorbettDavies2017"],
        },
        {
          name: "Treatment Equality",
          references: ["berk2018fairness"],
        },
      ],
      resources: [
        {
          "title": "Attacking Discrimination with Smarter Machine Learning",
          "caption": `Interactive example accompanying the Equalized Odds article
          <d-cite key='hardt2016equality'></d-cite> examplified with a money lendning scenario.`,
          "url": "http://research.google.com/bigpicture/attacking-discrimination-in-ml/",
          "image": "eq.png",
        },
        {
          "title": "Tutorial: 21 fairness definitions and their politics",
          "caption": `Recording of the FAT* 2018 turotial on fairness definitions.`,
          "url": "https://www.youtube.com/watch?v=jIXIuYdnyyk",
          "image": "fairness21.jpg",
        },
        {
          "title": "Fairness and machine learning, Chapter 2",
          "caption": `Chapter 2 of the fairness and machine learning book about classification.`,
          "url": "https://fairmlbook.org/classification.html",
          "image": "fairmlbook.png",
        },
      ],
    },
    {
      title: "Individual Fairness",
      description: `<p> The idea is to focus on individuals instead of group statistical measures.
      <d-cite key='dwork2012fairness'></d-cite> describe it as: “similar individuals should be treated similar”.
      This should yield that members of different groups which have similar attributes should receive the same
      outcome regardless of the protected group attribute. For our super figures, this means that if you have the
      same power of doing mass destruction, the outcome of the classifier should be the same regardless of whether
      you are male or female. However, the main shortcoming of this approach is the non-trivial question of
      defining a similarity measure between individuals <d-cite key='chouldechova2020snapshot, kim2018fairness'></d-cite>.
      Take the example of how to compare years of superhero experience with the diploma from a superhero academy? Work has
      been done to try to relaxing the criterion e.g by looking a subpopulations <d-cite key='kim2018fairness'></d-cite>.</p>`,
      examples: [
      ],
      resources: [
      ],
    },
    {
      title: "Preference-Based Fairness",
      description: `<p> Preference-based fairness is suggested by <d-cite key='zafar2017parity'></d-cite> and
      motivated by the term <i>envy-freeness</i> from the literature in economics. The intuition is not to look at achieving
      parity measures, but instead require farness by the fact that any group of users should <i>prefer</i> their own
      group-depended classifier instead of any others groups classifier. This idea leaves room for optimizing the classifiers
      within each group without having a parity constraint which might be incompatible with improving accuracy. In our super
      figure case, we could make two classifiers for respectively male and females and optimize performance for both so long
      as it would not makes sense for the group members to wanting to use the other groups classifier. However, the critic to
      this approach is that it is not easy to calculate a “preference” way of allocation in all domains
      <d-cite key='gajane2017formalizing'></d-cite>. </p>`,
      examples: [
      ],
      resources: [
      ],
    },
    {
      title: "Causal Reasoning",
      description: `<p> Using causal inference to achieve fairness is for example suggested by
      <d-cite key='kusner2017counterfactual'></d-cite>, where they define the idea of <i>counter-factual fairness</i>:
      individuals of a protected group should receive the same outcome as if the group membership was flipped in a
      counter-factual setting. When we are looking at a female super figure, a male-version of this figure should receive the
      same outcome. This requires building a model that learns the causal relations, such that we know how the other attributes
      would change with regard to the “gender swap”. For example, property attributes such as <i>weight</i> and <i>height</i>
      would change for a male-version. However, it is not necessarily easy to accurately build such causal  models, and it might
      later inflict the causality which we are hoping to learn with the classification model. Lastly, building a causal model can
      result in types of bias of wrongly evaluating on or convincing one of already known outcomes <d-cite key='gajane2017formalizing'></d-cite>. </p>`,
      examples: [
      ],
      resources: [
      ],
    },
    {
      title: "Fairness Through Explanations",
      description: `<p> Another approach to detect possible biases is to compare model explanations, like feature attributions,
      for different groups. The framework SHAP <d-cite key='lundberg2017unified'></d-cite> uses Shapely values to measure the marginal
      contribution of a feature’s impact on a prediction. This can be used to decompose the differences in a statistical measure down
      to input features to better understand what generates the differences <d-cite key='lundberg2020blog'></d-cite>. It can also be
      used to detect if a model fits on the protected attribute for a group by looking at a “global” contribution on a test dataset
      <d-cite key='cesaro2019measuring'></d-cite>. The paper <d-cite key='cesaro2019measuring'></d-cite> tries to validate the approach
      by comparing to static measures, and  <d-cite key='hickey2020fairness'></d-cite> further suggest an in-processing algorithm for
      mitigating potential bias. Note, this idea about accessing fairness through examining what features a black-box model is fitting on,
      is not restricted to harms of allocation problems. It could also be used on a text classifier for sentiment analysis to ensure that
      the model is not fitting on words which do not carry sentimental meaning but  instead meaning of racial or gender belongings. <p>`,
      examples: [
      ],
      resources: [
      ],
    },
];
