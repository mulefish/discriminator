
const stack = require('callsite');

const COMMON_STRINGS = { 
    RAW_EVENT_DATA_FILE:"raw_event_data.json"
}

const colors = {
    bg_red: "\x1b[41m",
    bg_yellow: "\x1b[43m",
    bold: "\x1b[1m",
    reset: "\x1b[0m",
    bg_cyan:"\x1b[46m" 
}
function verdict(a, b, msg) {

    const stackHeap = stack()
    const file = stackHeap[1].getFileName().split(PROJECT_NAME)[1]
    const lineNum = stackHeap[1].getLineNumber()


    if (JSON.stringify(a) === JSON.stringify(b) && a !== undefined) {
        console.log(`${colors.bg_yellow} ${file} ${lineNum} PASS ${colors.reset} ${msg}`)
        return true
    } else {
        console.log(`${colors.bg_yellow} ${file} ${lineNum} FAIL ${colors.reset} ${msg}`)
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

    console.log(` ${file}  ${lineNum} ${colors.bg_cyan}  ${msg} ${colors.reset}`)
}

function yellow(msg) {

    const stackHeap = stack()
    const file = stackHeap[1].getFileName().split(PROJECT_NAME)[1]
    const lineNum = stackHeap[1].getLineNumber()

    console.log(` ${file}  ${lineNum} ${colors.bg_yellow}  ${msg} ${colors.reset}`)
}

function logger(msg) {

    const stackHeap = stack()
    const file = stackHeap[1].getFileName().split(PROJECT_NAME)[1]
    const lineNum = stackHeap[1].getLineNumber()

    console.log(` ${file}  ${lineNum}   ${msg} `)
}


module.exports = { COMMON_STRINGS, verdict, cyan, red, yellow, logger };
