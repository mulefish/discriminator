const {COMMON_VARIABLES, yellow} = require('./library.js');

const fs = require('fs');
const BayesianClassifier = require('./BayesianClassifier.js');

const classifier = new BayesianClassifier();

function preprocessData(data) {
    return Object.values(data).join(' ').split(' ').filter(Boolean);
}
const trainingData = JSON.parse(fs.readFileSync(COMMON_VARIABLES.DATA_PRE_TRAINING, 'utf8'));
trainingData.forEach(data => {
    const tokens = preprocessData(data)
    classifier.addDocument(tokens, data.label);
});

fs.writeFileSync(COMMON_VARIABLES.DATA_POST_TRAINING, JSON.stringify(classifier));
yellow("Read from " + COMMON_VARIABLES.DATA_PRE_TRAINING)
yellow("Wrote to " + COMMON_VARIABLES.DATA_PRE_TRAINING)
