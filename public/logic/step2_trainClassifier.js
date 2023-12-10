const {COMMON_STRINGS, cyan} = require('./library.js');

const fs = require('fs');
const BayesianClassifier = require('./BayesianClassifier');

// Create a new instance of the classifier
const classifier = new BayesianClassifier();

// Function to preprocess and tokenize data (simple example)
function preprocessData(data) {
    return Object.values(data).join(' ').split(' ').filter(Boolean);
}
// Get the training data!
const trainingData = JSON.parse(fs.readFileSync(COMMON_STRINGS.DATA_PRE_TRAINING, 'utf8'));
trainingData.forEach(item => {
    classifier.addDocument(preprocessData(item), item.type);
});

fs.writeFileSync(COMMON_STRINGS.DATA_POST_TRAINING, JSON.stringify(classifier));
cyan("Read from " + COMMON_STRINGS.DATA_PRE_TRAINING)
cyan("Wrote to " + COMMON_STRINGS.DATA_PRE_TRAINING)
