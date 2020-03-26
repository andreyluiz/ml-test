// const names = require("./names.json");
const fs = require("fs");

// const NAMES_COUNT = 49;
const TOP_SCORE = 500;
const CUSTOMERS = 10000;

const dataSet = [];

function getRandomAccountBalance() {
  const positive = 10000;
  const negative = 2000;
  const includeZero = true;
  let result;

  do result = Math.ceil(Math.random() * (positive + negative)) - negative;
  while (includeZero === false && result === 0);
  return result;
}

for (let i = 0; i < CUSTOMERS; i++) {
  // Uncomment for names :)
  // const name = names.name[Math.floor(Math.random() * NAMES_COUNT) + 1];
  // const surName = names.surName[Math.floor(Math.random() * NAMES_COUNT) + 1];

  const xs = {
    // name,
    // surName,
    hasLoan: Math.round(Math.random()),
    hasCreditCard: Math.round(Math.random()),
    currentBalance: getRandomAccountBalance()
  };

  if (xs.hasLoan) {
    xs.loanPendingMonths = Math.floor(Math.random() * 36) + 1;
  } else {
    xs.loanPendingMonths = 0;
  }

  if (xs.hasCreditCard) {
    const limit = Math.floor(Math.random() * 3500) + 1;
    const used = Math.floor(Math.random() * limit) + 1;
    xs.creditCardLimit = limit;
    xs.creditCardUsed = used;
    xs.creditCardOverduePayment = Math.round(Math.random());
  } else {
    xs.creditCardLimit = 0;
    xs.creditCardUsed = 0;
    xs.creditCardOverduePayment = 0;
  }

  let score = TOP_SCORE;
  const {
    currentBalance,
    hasLoan,
    loanPendingMonths,
    hasCreditCard,
    creditCardLimit,
    creditCardUsed,
    creditCardOverduePayment
  } = xs;
  // Account balance is negative
  if (currentBalance < 0) {
    score -= 100;
  }
  // Has a loan
  if (hasLoan) {
    score -= 100;
    // More than one year of remaining months to pay
    if (loanPendingMonths > 12) {
      score -= 50;
    }
  }
  // Has a credit card
  if (hasCreditCard) {
    score -= 50;
    // Credit card remaining limit is more tha 500 AND
    // used value is twice the current balance
    if (
      creditCardLimit - creditCardUsed < 500 &&
      creditCardUsed * 2 > currentBalance
    ) {
      score -= 50;
    }
    // Fail to pay credit card on date
    if (creditCardOverduePayment) {
      score -= 150;
    }
  }

  let classification;
  if (score === 500) {
    classification = "A";
  } else if (score >= 400 && score < 500) {
    classification = "B";
  } else if (score >= 300 && score < 400) {
    classification = "C";
  } else if (score >= 200 && score < 300) {
    classification = "D";
  } else if (score >= 100 && score < 200) {
    classification = "E";
  } else {
    classification = "F";
  }

  const ys = {
    score,
    classification
  };

  dataSet.push({ ...xs, ...ys });
}

const csv = [];
csv.push(Object.keys(dataSet[0]).map(k => k));
const data = dataSet.map(item => Object.values(item));
csv.push(...data);
const csvString = csv.join("\n");
fs.writeFileSync("static/dataset.csv", csvString);
