// Separate data into males and females
export function separate_data(dataset) {
  const male_predictions = []
  const female_predictions = []
  for (let i = 0; i < dataset.length; i++) {
    if (dataset[i].gender == "male") {
      male_predictions.push(dataset[i]);
    }
    else {
      female_predictions.push(dataset[i]);
    }
  }
  return {"male": male_predictions, "female": female_predictions};
}
