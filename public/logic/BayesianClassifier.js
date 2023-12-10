class BayesianClassifier {
    constructor() {
        this.classCounts = {};
        this.featureCounts = {};
        this.totalDocuments = 0;
    }

    // Add a document to the classifier
    addDocument(features, label) {
        if (!this.classCounts[label]) {
            this.classCounts[label] = 0;
            this.featureCounts[label] = {};
        }

        features.forEach(feature => {
            if (!this.featureCounts[label][feature]) {
                this.featureCounts[label][feature] = 0;
            }
            this.featureCounts[label][feature]++;
        });

        this.classCounts[label]++;
        this.totalDocuments++;
    }

    // Calculate probabilities and classify a document
    classify(features) {
        let maxProbability = -Infinity;
        let chosenClass = null;

        Object.keys(this.classCounts).forEach(label => {
            const classProbability = this.calculateProbability(features, label);
            if (classProbability > maxProbability) {
                maxProbability = classProbability;
                chosenClass = label;
            }
        });

        return chosenClass;
    }

    // Calculate the probability for a class given a set of features
    calculateProbability(features, label) {
        let logProbability = Math.log(this.classCounts[label] / this.totalDocuments);

        features.forEach(feature => {
            const featureCount = this.featureCounts[label][feature] || 0;
            logProbability += Math.log((featureCount + 1) / (this.classCounts[label] + 2));
        });

        return logProbability;
    }

    calculateClassProbabilities(features) {
        const classProbabilities = {};

        Object.keys(this.classCounts).forEach(label => {
            classProbabilities[label] = this.calculateProbability(features, label);
        });

        return classProbabilities;
    }

    // Modify the classify method to include confidence
    classifyWithConfidence(features) {
        const classProbabilities = this.calculateClassProbabilities(features);
        let maxProbability = -Infinity;
        let chosenClass = null;

        Object.keys(classProbabilities).forEach(label => {
            if (classProbabilities[label] > maxProbability) {
                maxProbability = classProbabilities[label];
                chosenClass = label;
            }
        });

        // Calculate confidence
        const totalProbabilities = Object.values(classProbabilities).reduce((a, b) => a + Math.exp(b), 0);
        const confidence = (Math.exp(maxProbability) / totalProbabilities) * 100;

        return { chosenClass, confidence: confidence.toFixed(2) };
    }

}
module.exports = BayesianClassifier;