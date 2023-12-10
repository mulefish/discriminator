const {COMMON_STRINGS} = require('./library.js');

const fs = require('fs');
const BayesianClassifier = require('./BayesianClassifier');

// Create a new instance of the classifier
const classifier = new BayesianClassifier();

// Function to preprocess and tokenize data (simple example)
function preprocessData(data) {
    return Object.values(data).join(' ').split(' ').filter(Boolean);
}

// Train the classifier with your data
const trainingData = JSON.parse(fs.readFileSync(COMMON_STRINGS.RAW_EVENT_DATA_FILE, 'utf8'));
trainingData.forEach(item => {
    classifier.addDocument(preprocessData(item), item.type);
});

// Save the trained classifier to a file
fs.writeFileSync('classifier.json', JSON.stringify(classifier));
