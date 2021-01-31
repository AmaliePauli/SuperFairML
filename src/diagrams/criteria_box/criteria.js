export const criteriaData = [
    {
      title: "Statistical Measures",
      description: `<p> A lot of focus in the literature has been on statistical measures where metrics for a
      predictor can be calculated by comparing the predicted classes and the actual classes
      <d-cite key="verma2018fairness, mitchell2018prediction, mehrabi2019survey"></d-cite>. In addition, Heidari et al.
      have shown that most statistical fairness measures have underlying moral assumptions when formulated under economic models of
      Equality of Opportunity <d-cite key="Heidari2019"></d-cite>. <br>
      Statistical fairness measures are defined in a binary classification problem, where there is typically one (privileged)
      outcome defined as <i>positive</i> and another (unprivileged) outcome defined as <i>negative</i>. The number of correctly
      and wrongly predicted positive and negative examples form the so called confusion matrix [TABLE]. Using terms derived
      from the confusion matrix, different metrics can be calculated with the aim of achieving fairness between groups,
      e.g race or gender. The requirements for fairness with such statistical measures is to (approximately) achieve a
      parity, i.e. equality, between groups for a defined measure. </p>`,
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
          "caption": `Recording of the FAT* 2018 turotial on fairness definitions
          <d-cite key='narayanan2018translation'></d-cite>.`,
          "url": "https://www.youtube.com/watch?v=jIXIuYdnyyk",
          "image": "fairness21.jpg",
        },
        {
          "title": "Fairness and machine learning, Chapter 2",
          "caption": `Chapter 2 of the fairness and machine learning book about classification
          <d-cite key='barocas-hardt-narayanan'></d-cite>.`,
          "url": "https://fairmlbook.org/classification.html",
          "image": "fairmlbook.png",
        },
      ],
    },
    {
      title: "Individual Fairness",
      description: `<p> The idea is to focus on individuals instead of group statistical measures.
      Dwork et al. describe it as: “similar individuals should be treated similar” <d-cite key='dwork2012fairness'></d-cite>.
      This should yield that members of different groups which have similar attributes should receive the same
      outcome regardless of the protected group attribute. For our super figures, this means that if you have the
      same power of doing mass destruction, the outcome of the classifier should be the same regardless of whether
      you are male or female. However, the main shortcoming of this approach is the non-trivial question of
      defining a similarity measure between individuals <d-cite key='chouldechova2020snapshot, kim2018fairness'></d-cite>.
      Take the example of how to compare years of superhero experience with the diploma from a superhero academy? Work has
      been done to try to relaxing the criterion e.g by looking a subpopulations <d-cite key='kim2018fairness'></d-cite>.
      [Should mention <d-cite key="Binns2020"></d-cite>]</p>`,
      examples: [
        {
          name: "Lipschitz property",
          references: ["dwork2012fairness"],
        },
        {
          name: "Metric multifairness",
          references: ["kim2018fairness"],
        },
        {
          name: "Probably Approximately Correct and Fair learning",
          references: ["GalYona2018"],
        },
        {
          name: "Inequality Indices",
          references: ["Speicher2018"],
        },
        {
          name: "Empirical Risk Minimization",
          references: ["Jung2019"],
        },
        {
          name: "FlipTest",
          references: ["Black2020"],
        },
        {
          name: "Learning Certified Individually Fair Representations",
          references: ["Ruoss2020"],
        },
      ],
      resources: [
        {
          "title": "LCIFR",
          "caption": `Implementation of the 'Learning Certified Individually Fair Representations'
          framework <d-cite key='Ruoss2020'></d-cite>.`,
          "url": "https://github.com/eth-sri/lcifr",
          "image": "LCIFR.png",
        },
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
        {
          name: "Preferred treatment / impact",
          references: ["zafar2017parity"],
        },
        {
          name: "Preference-Informed Individual Fairness",
          references: ["Kim2019"],
        },
      ],
      resources: [
        {
          "title": "Preferential fairness",
          "caption": `Github repository accompanying the paper by Zafar et al. that introduced
          <i>Preference Based Fairness</i> <d-cite key='zafar2017parity'></d-cite>.`,
          "url": "https://github.com/mbilalzafar/fair-classification/tree/master/preferential_fairness",
          "image": "pref_fairness.png",
        },
        {
          "title": "From Parity to Preference-based Notions of Fairness in Classification",
          "caption": `Youtube video of a recording of the KDD 2017 talk by the main author from
          <d-cite key='zafar2017parity'></d-cite>.`,
          "url": "https://www.youtube.com/watch?v=Zz8iqVWdD_g",
          "image": "kdd_pref_fairness.jpg",
        },
      ],
    },
    {
      title: "Counterfactual and Causal Fairness",
      description: `<p> Using causal models <d-cite key='Pearl2000'></d-cite> to achieve fairness is for example suggested by
      Kusner et al., where they define the idea of <i>counter-factual fairness</i> <d-cite key='kusner2017counterfactual'></d-cite>:
      individuals of a protected group should receive the same outcome as if the group membership was flipped in a
      counter-factual setting. When we are looking at a female super figure, a male-version of this figure should receive the
      same outcome. This requires building a model that learns the causal relations, such that we know how the other attributes
      would change with regard to the “gender swap”. For example, property attributes such as <i>weight</i> and <i>height</i>
      would change for a male version. However, it is not necessarily easy to accurately build such causal models or to well define
      the counterfactual setting <d-cite key='mitchell2018prediction, KohlerHausmann2019'></d-cite>, and it might later impact the causality
      which we are hoping to learn with the classification model <d-cite key='gajane2017formalizing'></d-cite>. Lastly,
      counterfactual reasoning can lead to types of biases, e.g. wrong evaluation of the model's decision when outcomes are
      already known <d-cite key='gajane2017formalizing'></d-cite>. </p>`,
      examples: [
        {
          name: "Counterfactual Fairness",
          references: ["kusner2017counterfactual"],
        },
        {
          name: "Path-Specific Counterfactual Fairness",
          references: ["Chiappa2019"],
        },
        {
          name: "Counterfactual Token Fairness",
          references: ["Garg2019"],
        },
        {
          name: "Proxy Discrimination",
          references: ["Kilbertus2017"],
        },
        {
          name: "Fair Inference",
          references: ["Nabi2018"],
        },
        {
          name: "Causal Explanation Formula",
          references: ["JunzheZhang2018"],
        },
        {
          name: "Controlled Direct Effect",
          references: ["Stefano2020"],
        },
      ],
      resources: [
        {
          "title": "Counterfactual Fairness",
          "caption": `Youtube video of a recorded speed by M. Kusner about the idea of counterfactual fairness
          <d-cite key='kusner2017counterfactual'></d-cite>.`,
          "url": "https://www.youtube.com/watch?v=psA4U6nhZ70",
          "image": "cf_fairness.jpg",
        },
        {
          "title": "Fair Inference On Outcomes",
          "caption": `Github repository accompanying the paper by R. Nabi and I. Shpitser
          <d-cite key='Nabi2018'></d-cite>.`,
          "url": "https://github.com/raziehna/fair-inference-on-outcomes",
          "image": "inference.png",
        },
      ],
    },
    {
      title: "Fairness Through Explanations",
      description: `<p> Another approach to detect possible biases is to compare model explanations, like feature attributions,
      for different groups. The framework SHAP <d-cite key='lundberg2017unified'></d-cite> uses Shapely values to measure the marginal
      contribution of a feature’s impact on a prediction. This can be used to decompose the differences in a statistical fairness measure down
      to input features to better understand what generates the differences <d-cite key='lundberg2020blog'></d-cite>. It can also be
      used to detect if a model fits on the protected attribute for a group by looking at a “global” contribution on a test dataset
      <d-cite key='cesaro2019measuring'></d-cite>. Here, Cesaro et al. try to validate the approach
      by comparing to static fairness measures, and Hickey et al. <d-cite key='hickey2020fairness'></d-cite> further suggest an in-processing
      algorithm for mitigating potential bias. Note, this idea about accessing fairness through examining what features a black-box model is
      fitting on, is not restricted to harms of allocation problems. It could also be used on a text classifier for sentiment analysis to
      ensure that the model is not fitting on words which do not carry sentimental meaning but instead meaning of racial or gender belongings. <p>`,
      examples: [
        {
          name: "Fairness Through Feature Importance",
          references: ["cesaro2019measuring"],
        },
        {
          name: "Fairness by Explicability",
          references: ["hickey2020fairness"],
        },
      ],
      resources: [
        {
          "title": "Explaining Measures of Fairness",
          "caption": `Blogpost by S. Lundberg on Towards Datascience about how to use SHAP to explain features
          impact on fairness measures <d-cite key='lundberg2020blog'></d-cite>.`,
          "url": "https://towardsdatascience.com/explaining-measures-of-fairness-f0e419d4e0d7",
          "image": "xai_fairness.png",
        },
      ],
    },
];
