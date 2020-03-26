<script>
  import { predict } from "./lib/ml";

  let currentBalance = 0;
  let loanPendingMonths = 0;
  let creditCardLimit = 0;
  let creditCardUsed = 0;
  let creditCardOverduePayment = 0;
  let hasLoan = 0;
  let hasCreditCard = 0;

  $: {
    if (hasLoan === 0) {
      loanPendingMonths = 0;
    }

    if (hasCreditCard === 0) {
      creditCardLimit = 0;
      creditCardUsed = 0;
      creditCardOverduePayment = 0;
    }
  }

  let error = "";
  let classification = "";
  let confidence = 0;

  function makePrediction() {
    const input = {
      currentBalance: currentBalance,
      loanPendingMonths,
      creditCardLimit,
      creditCardUsed,
      creditCardOverduePayment,
      hasLoan,
      hasCreditCard
    };

    console.log(input);

    predict(input, (_error, results) => {
      if (_error) {
        error = _error.message;
      } else {
        const firstResult = results[0];
        classification = firstResult.label;
        confidence = firstResult.confidence * 100;
      }
    });
  }

  function reset() {
    currentBalance = 0;
    loanPendingMonths = 0;
    creditCardLimit = 0;
    creditCardUsed = 0;
    creditCardOverduePayment = 0;
    hasLoan = 0;
    hasCreditCard = 0;
    error = "";
    classification = "";
    confidence = 0;
  }
</script>

<style>
  .form {
    font-family: sans-serif;
    margin: 100px auto;
    max-width: 400px;
    background-color: #eeeeee;
    padding: 24px;
  }

  .field {
    margin-bottom: 12px;
  }

  .field label {
    display: block;
    margin-bottom: 4px;
  }

  .field input,
  .field select {
    font-size: 16px;
    padding: 2px;
  }

  .section {
    background-color: #dddddd;
    padding: 12px;
    margin-bottom: 24px;
    border: 1px solid #cccccc;
    -webkit-box-shadow: 0px 2px 4px 0px rgba(143, 143, 143, 1);
    -moz-box-shadow: 0px 2px 4px 0px rgba(143, 143, 143, 1);
    box-shadow: 0px 2px 4px 0px rgba(143, 143, 143, 1);
  }

  .section h4 {
    margin-top: 0;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .actions button:last-child {
    margin-right: 0;
  }

  button {
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 4px;
    outline: none;
  }

  button.primary {
    background-color: #4455bb;
    color: white;
  }

  .result {
    background-color: #388e3c;
    padding: 12px;
    color: white;
    margin-top: 24px;
  }

  .result .real-result {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
  }

  .error {
    background-color: #ff5252;
    padding: 12px;
    color: white;
    margin-top: 24px;
  }
</style>

<div class="form">
  <div class="field">
    <label for="account-balance">Account Balance</label>
    <input type="number" name="account-balance" bind:value={currentBalance} />
  </div>

  <div class="field">
    <label for="loan">Has a loan?</label>
    <select name="loan" bind:value={hasLoan}>
      <option value={1}>Yes</option>
      <option value={0}>No</option>
    </select>
  </div>

  {#if hasLoan === 1}
    <div class="section">
      <h4>Loan</h4>

      <div class="field">
        <label for="pending-months">Pending Months</label>
        <input
          type="number"
          name="pending-months"
          bind:value={loanPendingMonths} />
      </div>
    </div>
  {/if}

  <div class="field">
    <label for="credit-card">Has a credit card?</label>
    <select name="credit-card" bind:value={hasCreditCard}>
      <option value={1}>Yes</option>
      <option value={0}>No</option>
    </select>
  </div>

  {#if hasCreditCard === 1}
    <div class="section">
      <h4>Credit Card</h4>

      <div class="field">
        <label for="limit">Limit</label>
        <input type="number" name="limit" bind:value={creditCardLimit} />
      </div>

      <div class="field">
        <label for="used">Used</label>
        <input type="number" name="used" bind:value={creditCardUsed} />
      </div>

      <div class="field">
        <label for="credit-card-overdue">Has any overdue payment?</label>
        <select
          name="credit-card-overdue"
          bind:value={creditCardOverduePayment}>
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>
      </div>
    </div>
  {/if}

  <div class="actions">
    <button class="primary" on:click={makePrediction}>Predict</button>
    <button on:click={reset}>Reset</button>
  </div>

  {#if error}
    <div class="error">
      <h4>Error</h4>
      <p>The prediction returned error.</p>
      <p>{error}</p>
    </div>
  {/if}

  {#if classification && confidence && !error}
    <div class="result">
      <h4>Result</h4>
      <p>This client is ranked: {classification}</p>
      <p>
        The result confidence is: {confidence.toFixed(2)}%
        <span class="real-result">({confidence})</span>
      </p>
    </div>
  {/if}
</div>
