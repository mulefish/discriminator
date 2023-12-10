const {COMMON_STRINGS, cyan} = require('./library.js');

const fs = require('fs');

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const app_response = ['ar1', 'ar2', 'ar3', 'ar4', 'ar5', 'ar6', 'ar7'];
const objects = ['car', 'house', 'shirt', 'flower', 'sky'];
const noise = ['singing', 'flying', 'eating', 'watching', 'sleeping'];
const component_event = ['ce1', 'ce2', 'ce3', 'ce4', 'ce5'];
const page_view = ['sparrow', 'eagle', 'parrot', 'owl', 'penguin'];
//const actions = ['flying', 'nesting', 'singing', 'hunting', 'swimming'];


function generateHamData() {

    return {
        type: 'component-event',
        one: getRandomElement(component_event),
        two: getRandomElement(objects),
        noise1:getRandomElement(noise),
        noise2:getRandomElement(noise),
        noise3:getRandomElement(noise),
        noise4:getRandomElement(noise),
        noise5:getRandomElement(noise),
        noise6:getRandomElement(noise),
        noise7:getRandomElement(noise)
//        noise: Math.random() < 0.2 ? getRandomElement(noise) : undefined // 20% chance of noise
    };
}

function generateSpamData() {
    
    return {
        type: 'app-response',
        one: getRandomElement(app_response),
        two: getRandomElement(objects),
        noise1:getRandomElement(noise),
        noise2:getRandomElement(noise),
        noise3:getRandomElement(noise),
        noise4:getRandomElement(noise),
        noise5:getRandomElement(noise),
        noise6:getRandomElement(noise),
        noise7:getRandomElement(noise)

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
