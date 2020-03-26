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
  onTrainedModelLoaded
);

async function onTrainedModelLoaded() {
  const input = {
    hasLoan: 0,
    hasCreditCard: 0,
    currentBalance: 8213,
    loanPendingMonths: 0,
    creditCardLimit: 0,
    creditCardUsed: 0,
    creditCardOverduePayment: 0
  };
  nn.classify(input, handleResults("Should predict A"));

  const input2 = {
    hasLoan: 1,
    hasCreditCard: 0,
    currentBalance: -1080,
    loanPendingMonths: 7,
    creditCardLimit: 0,
    creditCardUsed: 0,
    creditCardOverduePayment: 0
  };
  nn.classify(input2, handleResults("Should predict C"));

  const input3 = {
    hasLoan: 0,
    hasCreditCard: 1,
    currentBalance: -685,
    loanPendingMonths: 0,
    creditCardLimit: 2046,
    creditCardUsed: 98,
    creditCardOverduePayment: 1
  };
  nn.classify(input3, handleResults("Should predict D"));

  const input4 = {
    hasLoan: 1,
    hasCreditCard: 1,
    currentBalance: 6175,
    loanPendingMonths: 18,
    creditCardLimit: 3346,
    creditCardUsed: 670,
    creditCardOverduePayment: 1
  };
  nn.classify(input4, handleResults("Should predict E"));

  const input5 = {
    hasLoan: 1,
    hasCreditCard: 1,
    currentBalance: -485,
    loanPendingMonths: 24,
    creditCardLimit: 200,
    creditCardUsed: 99,
    creditCardOverduePayment: 1
  };
  nn.classify(input5, handleResults("Should predict F"));
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
