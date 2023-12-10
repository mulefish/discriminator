const {COMMON_STRINGS, cyan} = require('./library.js');
const fs = require('fs');
const BayesianClassifier = require('./BayesianClassifier');

function preprocessData(data) {
    return Object.values(data).join(' ').split(' ').filter(Boolean);
}

const testData = [
    { subject: 'sparrow', action: 'flying', noise: 'fast' },
    { color: 'red', object: 'car', noise: 'bright' }
];

const classifierData = JSON.parse(fs.readFileSync(COMMON_STRINGS.DATA_POST_TRAINING, 'utf8'));
const classifier = new BayesianClassifier();
Object.assign(classifier, classifierData);

testData.forEach(data => {
    const { chosenClass, confidence } = classifier.classifyWithConfidence(preprocessData(data));
    console.log(`Data: ${JSON.stringify(data)} classified as: ${chosenClass} with ${confidence}% confidence`);
});