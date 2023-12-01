//const data = require('./data.json')

const data = {
    data: [
        '1abc2',
        'pqr3stu8vwx',
        'a1b2c3d4e5f',
        'treb7uchet'
    ]
}

const calibrationData = data.data //lol


const processLine = (line) => {
    //console.log(line)
    let firstDigit, secondDigit = null
    const isDigitRegex = new RegExp('[0-9]')

    for (let i = 0; i < line.length; i++) {
        if (isDigitRegex.test(line[i])) {
            firstDigit = line[i]
            break
        }
    }

    if (!firstDigit) {
        console.log('No digit found!')
    } else {
        for (let i = line.length - 1; i >= 0; i--) {
            if (isDigitRegex.test(line[i])) {
                secondDigit = line[i]
                break
            }
        }
    }

    if (firstDigit && secondDigit) {
        return parseInt(firstDigit + secondDigit)
    } else {
        return null
    }
}

let result = 0
//console.log(calibrationData.length)
for (let i = 0; i < calibrationData.length; i++) {
    let sum = processLine(calibrationData[i].toString())
    if (sum) {
        //console.log("sum: " + sum)
        result += sum
    } else {
        result = 'Error: No digit found in line'
        break
    }
}

console.log(result)