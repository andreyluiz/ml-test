# What is it?

This application is a sample using [ml5.js](https://ml5js.org/).

## Contents

The application already has a pre-trained model of a customer base. A customer is given a rank from A to F based on attributes like account balance, if it has loans, credit cards and overdue payments. For more details on how the initial dataset was generated, check `bin/dataset-gen/index.js`

## Application

The front-end application built in [Svelte](https://svelte.dev/) is a way to input attributes for an hypotetical client. When clicking predict, the Machine Learning model will run the prediction for the given input.

To run the application:

```bash
$ npm install
$ npm start
```

## Contributing

Feel free to raise an issue or create a PR if you have any suggestion. :)
