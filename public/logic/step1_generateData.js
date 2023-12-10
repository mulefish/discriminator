const {COMMON_STRINGS, cyan} = require('./library.js');

const fs = require('fs');

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateHamData() {
    const birds = ['sparrow', 'eagle', 'parrot', 'owl', 'penguin'];
    const actions = ['flying', 'nesting', 'singing', 'hunting', 'swimming'];
    const noise = ['colorful', 'fast', 'bright', 'big', 'quiet']; // Noise elements

    return {
        type: 'ham',
        subject: getRandomElement(birds),
        action: getRandomElement(actions),
        noise: Math.random() < 0.2 ? getRandomElement(noise) : undefined // 20% chance of noise
    };
}

function generateSpamData() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    const objects = ['car', 'house', 'shirt', 'flower', 'sky'];
    const noise = ['singing', 'flying', 'eating', 'watching', 'sleeping'];
    
    return {
        type: 'spam',
        color: getRandomElement(colors),
        object: getRandomElement(objects),
        noise: Math.random() < 0.2 ? getRandomElement(noise) : undefined // 20% chance of noise
    };
}

function generateData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        if (Math.random() < 0.5) {
            data.push(generateHamData());
        } else {
            data.push(generateSpamData());
        }
    }
    return data;
}

const jsonData = generateData();

fs.writeFileSync(COMMON_STRINGS.DATA_PRE_TRAINING, JSON.stringify(jsonData, null, 2));
cyan("Created training data at " + COMMON_STRINGS.DATA_PRE_TRAINING)
