
const stack = require('callsite');
// BEGIN CUTE
// PROJECT_NAME is merely cute; unimportant - It is for prettyprint callsite/stack info. 
// Tres deleteable. 
// PROJECT_NAME is referenced a couple of times in this file. You can delete them also.
const fs = require('fs');
const path = require('path');
let PROJECT_NAME; 
(function () {
    const packageJsonPath = path.join(__dirname, '../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    PROJECT_NAME = packageJson.name;
})();
// END CUTE

const COMMON_VARIABLES = { 
    DATA_PRE_TRAINING:"data_pre_training.json",
    DATA_POST_TRAINING:"data_post_training.json",
    TRAINING_AMOUNT:10000
}

const colors = {
    bg_red: "\x1b[41m",
    bg_yellow: "\x1b[43m",
    bold: "\x1b[1m",
    reset: "\x1b[0m",
    bg_cyan:"\x1b[46m" 
}

function verdict(a, b, msg) {
    if (JSON.stringify(a) === JSON.stringify(b) && a !== undefined) {
        console.log(`${colors.bg_yellow}PASS${colors.reset} ${msg}`)
        return true
    } else {
        console.log(`${colors.bg_yellow}FAIL${colors.reset} ${msg}`)
    }
    return false
}

function red(msg) {
    console.log(colors.bg_red + msg + colors.reset)
}
function cyan(msg) {

    const stackHeap = stack()
    const file = stackHeap[1].getFileName().split(PROJECT_NAME)[1]
    const lineNum = stackHeap[1].getLineNumber()

    console.log(` ${file}  ${lineNum}  ${colors.bg_cyan}${msg}${colors.reset}`)
}
function yellow(msg) {

    const stackHeap = stack()
    const file = stackHeap[1].getFileName().split(PROJECT_NAME)[1]
    const lineNum = stackHeap[1].getLineNumber()

    console.log(` ${file}  ${lineNum}  ${colors.bg_yellow}${msg}${colors.reset}`)
}

function logger(msg) {

    const stackHeap = stack()
    const file = stackHeap[1].getFileName().split(PROJECT_NAME)[1]
    const lineNum = stackHeap[1].getLineNumber()

    console.log(` ${file}  ${lineNum}   ${msg} `)
}



module.exports = { COMMON_VARIABLES, verdict, cyan, red, yellow, logger };
