const options = {
  dataUrl: "dataset.csv",
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

const nn = ml5.neuralNetwork(options, onModelLoaded);

function onModelLoaded() {
  nn.normalizeData();
  trainModel();
}

function trainModel() {
  const trainingOptions = {
    epochs: 200,
    batchSize: 12
  };
  nn.train(trainingOptions, finishedTraining);
}

function finishedTraining() {
  nn.save("customers-model");
  classify();
}

function classify() {
  const input = {
    hasLoan: 0,
    hasCreditCard: 0,
    currentBalance: 4028,
    loanPendingMonths: 0,
    creditCardLimit: 0,
    creditCardUsed: 0,
    creditCardOverduePayment: 0
  };
  nn.classify(input, handleResults("Should predict A"));
}

function handleResults(text) {
  return function print(error, result) {
    console.log(text);
    if (error) {
      console.error(error);
      return;
    }
    console.log(result);
  };
}
