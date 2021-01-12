// Performance metrics TODO: use conf matrix
// Calculate positive rate
export function positive_rate(predictions, threshold) {
  var total_positive = 0.0;
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    if(hero.prediction_probability >= threshold) {
        total_positive += 1.0;
    }
  }
  return total_positive / predictions.length;
}

// Calculate true positive rate
export function true_positive_rate(predictions, threshold) {
  var total_positives = 0;
  var true_positives = 0;
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    total_positives += hero.class;
    if(hero.prediction_probability >= threshold) {
        if (hero.class) {
          true_positives += 1.0;
        }
    }
  }
  if (total_positives == 0) {
    return 1.0;
  }
  return true_positives / total_positives;
}

// Calculate positive predictive value
export function positive_predictive_value(predictions, threshold) {
  var total_predicted_positives = 0;
  var true_positives = 0;
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    if(hero.prediction_probability >= threshold) {
        total_predicted_positives += 1;
        if (hero.class) {
          true_positives += 1.0;
        }
    }
  }
  if (total_predicted_positives == 0) {
    return 1.0;
  }
  return true_positives / total_predicted_positives;
}

// Calculate confusion_matrix
export function confusion_matrix(predictions, threshold) {
  var true_positives = 0.0;
  var true_negatives = 0.0;
  var false_positives = 0.0;
  var false_negatives = 0.0
  for (let i = 0; i < predictions.length; i++) {
    let hero = predictions[i]
    if(hero.prediction_probability >= threshold) {
      if (hero.class) {
        true_positives += 1.0;
      }
      else {
        false_positives += 1.0;
      }
    }
    else {
      if (hero.class) {
        false_negatives += 1.0;
      }
      else {
        true_negatives += 1.0;
      }
    }
  }
  return {"tp": true_positives, "fp": false_positives,
          "fn": false_negatives, "tn": true_negatives};
}
