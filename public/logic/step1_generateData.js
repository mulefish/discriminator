const {COMMON_STRINGS, cyan} = require('./library.js');

const fs = require('fs');

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const app_response = ['ar1', 'ar2', 'ar3', 'ar4', 'ar5', 'ar6', 'ar7'];
const something = ['car', 'house', 'shirt', 'flower', 'sky'];
const noise = ['singing', 'flying', 'eating', 'watching', 'sleeping'];
const component_event = ['ce1', 'ce2', 'ce3', 'ce4', 'ce5'];
const page_view = ['pv1', 'pv2', 'pv3', 'pv4', 'pv5', 'pv6'];
//const actions = ['flying', 'nesting', 'singing', 'hunting', 'swimming'];


function generateComponentEvent() {

    return {
        type: 'component-event',
        one: getRandomElement(component_event),
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

function generateAppResponse() {
    
    return {
        type: 'app-response',
        one: getRandomElement(app_response),
        noise1:getRandomElement(noise),
        noise2:getRandomElement(noise),
        noise3:getRandomElement(noise),
        noise4:getRandomElement(noise),
        noise5:getRandomElement(noise),
        noise6:getRandomElement(noise),
        noise7:getRandomElement(noise)

    };
}



function generatePageView() {
    
    return {
        type: 'page_view',
        one: getRandomElement(page_view),
        noise1:getRandomElement(noise),
        noise2:getRandomElement(noise),
        noise3:getRandomElement(noise),
        noise4:getRandomElement(noise),
        noise5:getRandomElement(noise),
        noise6:getRandomElement(noise),
        noise7:getRandomElement(noise)

    };
}

const LIMIT = 1000 // 10? 1000? 10000? 100000? All good
function generateData() {
    const data = [];
    for (let i = 0; i < LIMIT; i++) {
        const r = Math.random() 
        if (r < 0.33) {
            data.push(generateComponentEvent());
        } else if ( r < 0.66) {
            data.push(generateAppResponse());
        } else {
            data.push(generatePageView());
        }
    }
    return data;
}

const jsonData = generateData();

fs.writeFileSync(COMMON_STRINGS.DATA_PRE_TRAINING, JSON.stringify(jsonData, null, 2));
cyan("Created " + LIMIT + " units of training data in " + COMMON_STRINGS.DATA_PRE_TRAINING)
