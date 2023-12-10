const {COMMON_STRINGS, cyan} = require('./library.js');
const fs = require('fs');
const BayesianClassifier = require('./BayesianClassifier');

// function preprocessData(data) {
//     return Object.values(data).join(' ').split(' ').filter(Boolean);
// }

// const testData = [
//     { one: 'sparrow', two: 'flying', noise: 'fast' },
//     { one: 'red', two: 'car', noise: 'bright' }
// ];

// const classifierData = JSON.parse(fs.readFileSync(COMMON_STRINGS.DATA_POST_TRAINING, 'utf8'));
// const classifier = new BayesianClassifier();
// Object.assign(classifier, classifierData);

// testData.forEach(data => {
//     const tokens = preprocessData(data)
//     console.log( tokens )
//     const { chosenClass, confidence } = classifier.classifyWithConfidence(tokens);
//     console.log(`Data: ${JSON.stringify(data)} classified as: ${chosenClass} with ${confidence}% confidence`);
// });


const testData = [
    ['ce3', 'flying', 'fast','book','hat','shopping car' ],
    ['ar6', 'car', 'bright', 'Mr. C' ],
    ['pv3', 'car', 'bright', 'Mr. C' ],
    ["Twas","brillig,","and", "slithy","toves"]


];

const classifierData = JSON.parse(fs.readFileSync(COMMON_STRINGS.DATA_POST_TRAINING, 'utf8'));
const classifier = new BayesianClassifier();
Object.assign(classifier, classifierData);

// testData.forEach(tokens => {
//     console.log( tokens )
//     const { chosenClass, confidence } = classifier.classifyWithConfidence(tokens);
//     console.log(`Data: ${JSON.stringify(tokens)} classified as: ${chosenClass} with ${confidence}% confidence`);
// });

testData.forEach(tokens => {
    const classProbabilities = classifier.getClassProbabilities(tokens);
    console.log(`Data: ${JSON.stringify(tokens)}`);
    console.log('Confidence scores:', classProbabilities);
});