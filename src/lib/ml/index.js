export function predict(input, callback) {
  const options = {
    inputs: [
      "hasLoan",
      "hasCreditCard",
      "currentBalance",
      "loanPendingMonths",
      "creditCardLimit",
      "creditCardUsed",
      "creditCardOverduePayment"
    ],
    outputs: ["classification"],
    task: "classification",
    debug: true
  };

  const nn = ml5.neuralNetwork(options);

  nn.load(
    {
      model: "model.json",
      metadata: "model_meta.json",
      weights: "model.weights.bin"
    },
    onTrainedModelLoaded(input, callback)
  );

  function onTrainedModelLoaded(input, callback) {
    return function runClassification() {
      nn.classify(input, callback);
    };
  }
}
