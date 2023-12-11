const { COMMON_VARIABLES, verdict } = require('./library.js');
const BayesianClassifier = require('./BayesianClassifier.js');

function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
function preProcess_test() {
  function preprocessData(data) {
    return Object.values(data).join(' ').split(' ').filter(Boolean);
  }
  const given = {
    foo: 'a',
    bar: 'b',
    baz: 'c',
    quux: 'kittycat',
  }
  const expected = ['a', 'b', 'c', 'kittycat']
  const actual = preprocessData(given)
  const isOk = isEqual(expected, actual)
  verdict(isOk, true, "preProcess_test")
}

function addDocument_test() {
  const classifier = new BayesianClassifier();
  const someData = [
    'app-response',
    'ar3',
    'eating',
    'eating',
    'flying',
    'singing',
    'sleeping',
    'singing',
    'flying'
  ]
  label = "app-response"
  classifier.addDocument(someData, label)

  const expectedClassCounts = 1
  const expectedFeatureCounts = { "app-response": { "app-response": 1, "ar3": 1, "eating": 2, "flying": 2, "singing": 2, "sleeping": 1 } }
  const expectedTotalDocuments = 1
  let isOk = true
  isOk &&= expectedClassCounts === classifier.classCounts["app-response"]
  isOk &&= isEqual(expectedFeatureCounts, classifier.featureCounts)
  isOk &&= expectedTotalDocuments === classifier.totalDocuments

  verdict(isOk, true, "addDocument_test")
}


function calculateProbability_test() {
  const classifier = new BayesianClassifier();
  const label1 = "this is a label"
  const label2 = "this is another label"
  classifier.addDocument(['finch', 'bewick'], label1);
  classifier.addDocument(['bewick', 'wren'], label1);
  classifier.addDocument(['finch', 'wren'], label2);

  const actualP = classifier.calculateProbability(['finch', 'bewick'], label1);
  const expectedP = Math.log(2 / 3) + Math.log(2 / 3) + Math.log(2 / 3)

  let x = Math.abs(expectedP - actualP)
  let isOk = false
  if (x > 0 && x < 0.2) {
    // close enough!
    isOk = true
  }
  verdict(isOk, true, "calculateProbability_test " + actualP)
}
function getClassProbabilities_test() {

  const classifier = new BayesianClassifier();
  const label1 = "label1"
  const label2 = "label2"
  classifier.addDocument(['finch', 'bewick'], label1);
  classifier.addDocument(['bewick', 'wren'], label1);
  classifier.addDocument(['finch', 'wren'], label2);

  const actual = classifier.getClassProbabilities(['finch', 'bewick']);
  let isOk = true
  isOk &&= parseFloat(actual[label1]) > 77 && parseFloat(actual[label1]) < 78;
  isOk &&= parseFloat(actual[label2]) > 22 && parseFloat(actual[label2]) < 23;


  verdict(isOk, true, "getClassProbabilities_test " + JSON.stringify(actual))

}

preProcess_test()
addDocument_test()
calculateProbability_test()
getClassProbabilities_test()
