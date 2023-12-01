const data = require('./data.json')

// const data = {
//     data: [
//         'two1nine',
//         'eightwothree',
//         'abcone2threexyz',
//         'xtwone3four',
//         '4nineeightseven2',
//         'zoneight234',
//         '7pqrstsixteen'
//     ]
// }

// const data = {
//     data: [
//         'eighthree',
//         'sevenine'
//     ]
// }

const calibrationData = data.data //lol

const getCalibrationValue = (line) => {
    const regex = /[0-9]|one|two|three|four|five|six|seven|eight|nine/g
    let matches = [], found
    while (found = regex.exec(line)) {
        matches.push(found)
        regex.lastIndex = found.index + 1
    }
    //const matches = [...line.matchAll(regex)]
    
    if (matches.length > 0) {
        const firstDigitIndex = Math.min(...matches.map(m => m.index))
        const secondDigitIndex = Math.max(...matches.map(m => m.index))

        //console.log(firstDigitIndex + ", " + secondDigitIndex)

        const firstDigitString = matches.find((m) => {
            if (m.index === firstDigitIndex) {
                return m[0]
            }
        })[0]
        const secondDigitString = matches.find((m) => {
            if (m.index === secondDigitIndex) {
                return m[0]
            }
        })[0]

        //console.log(firstDigitString + ", " + secondDigitString)

        const firstDigit = strToInt(firstDigitString)
        const secondDigit = strToInt(secondDigitString)

        //console.log(firstDigit + ", " + secondDigit)

        return parseInt(firstDigit + secondDigit)

    }
}

const strToInt = (str) => {
    const i = parseInt(str)
    if (!isNaN(i)) {
        return str
    } else {
        switch (str) {
            case 'one':
                return '1'
            case 'two':
                return '2'
            case 'three':
                return '3'
            case 'four':
                return '4'
            case 'five':
                return '5'
            case 'six':
                return '6'
            case 'seven':
                return '7'
            case 'eight':
                return '8'
            case 'nine':
                return '9'
        }
    }
}

let result = 0
//console.log(calibrationData.length)
const n = calibrationData.length
//const n = 10
for (let i = 0; i < n; i++) {
    let sum = getCalibrationValue(calibrationData[i].toString())
    if (sum) {
        result += sum
        console.log(i + ".) " + calibrationData[i] + " sum: " + sum + ", result: " + result)
    } else {
        result = 'Error: No digit found in line'
        break
    }
}

console.log(result)