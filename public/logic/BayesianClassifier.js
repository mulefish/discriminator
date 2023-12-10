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
}
module.exports = BayesianClassifier;