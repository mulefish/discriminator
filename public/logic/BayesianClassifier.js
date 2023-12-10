class BayesianClassifier {
    constructor() {
        this.classCounts = {};
        this.featureCounts = {};
        this.totalDocuments = 0;
    }

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

    calculateProbability(features, label) {
        let logProbability = Math.log(this.classCounts[label] / this.totalDocuments);

        features.forEach(feature => {
            const featureCount = this.featureCounts[label][feature] || 0;
            logProbability += Math.log((featureCount + 1) / (this.classCounts[label] + 2));
        });

        return logProbability;
    }

    getClassProbabilities(features) {
        const classProbabilities = {};
        let totalLogProbabilities = 0;

        Object.keys(this.classCounts).forEach(label => {
            classProbabilities[label] = Math.exp(this.calculateProbability(features, label));
            totalLogProbabilities += classProbabilities[label];
        });

        // Normalize the probabilities to 100!
        Object.keys(classProbabilities).forEach(label => {
            classProbabilities[label] = (classProbabilities[label] / totalLogProbabilities * 100).toFixed(2);
        });

        return classProbabilities;
    }
}
module.exports = BayesianClassifier;