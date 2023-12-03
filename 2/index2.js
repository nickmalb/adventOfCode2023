const data = require('./data.json')

// const data = {
//     "data": [
//         "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
//         "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
//         "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
//         "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
//         "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
//     ]
// }
const gameData = data.data

const getGameParts = (game) => {
    const regex = /Game (\d+): (.*)$/
    const parts = regex.exec(game)
    
    const id = parts[1]
    const sets = parts[2].split(';').map(s => s.trim())
    return [id, sets]
}

const getMaxValues = (sets) => {
    let maxRed = 1
    let maxGreen = 1
    let maxBlue = 1

    for (let i = 0; i < sets.length; i++) {
        //console.log('set: ' + sets[i])
        const cubeSets = sets[i].split(',').map(s => s.trim())
        const regex = /(\d+) (.*)$/
        for (let j = 0; j < cubeSets.length; j++) {
            
            const cubeDetails = regex.exec(cubeSets[j])
            //console.log(cubeDetails)
            const count = parseInt(cubeDetails[1])
            const color = cubeDetails[2]

            switch (color) {
                case 'red':
                    if (count > maxRed) maxRed = count
                    //console.log('maxRed = ' + maxRed)
                    break;
                case 'green':
                    if (count > maxGreen) maxGreen = count
                    //console.log('maxGreen = ' + maxGreen)
                    break;
                case 'blue':
                    if (count > maxBlue) maxBlue = count
                    //console.log('maxBlue = ' + maxBlue)
                    break;
            }
        }
    }
    
    // console.log('maxRed: ' + maxRed)
    // console.log('maxGreen: ' + maxGreen)
    // console.log('maxBlue: ' + maxBlue)
    // console.log(maxRed * maxGreen * maxBlue)
    //console.log('maxes: { red: ' + maxRed + ', green: ' + maxGreen + ', blue: ' + maxBlue + '}')
    return {
        'red': maxRed,
        'green': maxGreen,
        'blue': maxBlue
    }
}

// Add the ids of all the games that are possible
// A game is possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes
let result = 0
for (let i = 0; i < gameData.length; i++) {
    let maxRed = 1;
    let maxGreen = 1;
    let maxBlue = 1;
    
    // parse line into id and reveal sets
    let gameParts = getGameParts(gameData[i])
    for (let j = 0; j < gameParts.length; j++) {
        const maxValues = getMaxValues(gameParts[1])
        if (maxValues['red'] > maxRed) maxRed = maxValues['red']
        if (maxValues['green'] > maxGreen) maxGreen = maxValues['green']
        if (maxValues['blue'] > maxBlue) maxBlue = maxValues['blue']
    }
    
    result += maxRed * maxGreen * maxBlue
}
console.log('result: ' + result)