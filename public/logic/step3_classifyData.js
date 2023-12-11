const {COMMON_VARIABLES, cyan} = require('./library.js');
const fs = require('fs');
const BayesianClassifier = require('./BayesianClassifier.js');

const testData = [
    // component event ( cf. 'ce3')
    ['ce3', 'flying', 'fast','book','hat','shopping car' ],
    // app response ( cf. 'ar6')
    ['ar6', 'car', 'bright', 'Mr. C' ],
    // page view ( cf. pv3)
    ['pv3', 'car', 'bright', 'Mr. C' ],
    // simply noise
    ["Twas","brillig,","and", "slithy","toves"]
];

const classifierData = JSON.parse(fs.readFileSync(COMMON_VARIABLES.DATA_POST_TRAINING, 'utf8'));
const classifier = new BayesianClassifier();
Object.assign(classifier, classifierData);

testData.forEach(tokens => {
    const classProbabilities = classifier.getClassProbabilities(tokens);
    console.log(`Data: ${JSON.stringify(tokens)}`);
    console.log('Confidence scores:' + JSON.stringify(classProbabilities) );
});