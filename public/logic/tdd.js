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
  verdict(isOk, true,"preProcess_test")
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
  verdict(false, true,"calculateProbability_test TODO!")

}
function getClassProbabilities_test() {
  verdict(false, true,"getClassProbabilities_test TODO!")

}

preProcess_test()
addDocument_test()
calculateProbability_test()
getClassProbabilities_test()
