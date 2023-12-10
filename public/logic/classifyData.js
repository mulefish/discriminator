const fs = require('fs');
const BayesianClassifier = require('./BayesianClassifier');

// Function to preprocess and tokenize data
function preprocessData(data) {
    return Object.values(data).join(' ').split(' ').filter(Boolean);
}

// Load the trained classifier
/*
const classifierData = JSON.parse(fs.readFileSync('classifier.json', 'utf8'));
const classifier = new BayesianClassifier();
Object.assign(classifier, classifierData);
*/
// Classify new data
const testData = [
    { subject: 'sparrow', action: 'flying', noise: 'fast' },
    { color: 'red', object: 'car', noise: 'bright' }
];
/*
testData.forEach(data => {
    const classification = classifier.classify(preprocessData(data));
    console.log(`Data: ${JSON.stringify(data)} classified as: ${classification}`);
});
*/

// Load the trained classifier
const classifierData = JSON.parse(fs.readFileSync('classifier.json', 'utf8'));
const classifier = new BayesianClassifier();
Object.assign(classifier, classifierData);

// Classify new data with confidence
testData.forEach(data => {
    const { chosenClass, confidence } = classifier.classifyWithConfidence(preprocessData(data));
    console.log(`Data: ${JSON.stringify(data)} classified as: ${chosenClass} with ${confidence}% confidence`);
});