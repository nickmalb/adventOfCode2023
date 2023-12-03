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

const isGamePossible = (sets) => {
    const maxRed = 12
    const maxGreen = 13
    const maxBlue = 14

    // split game into reveal sets
    // split into sets of colored cubes
    for (let i = 0; i < sets.length; i++) {
        const cubeSets = sets[i].split(',').map(s => s.trim())
        const regex = /(\d+) (.*)$/
        for (let j = 0; j < cubeSets.length; j++) {
            const cubeDetails = regex.exec(cubeSets[j])
            const count = cubeDetails[1]
            const color = cubeDetails[2]

            switch (color) {
                case 'red':
                    if (count > maxRed) return false
                case 'green':
                    if (count > maxGreen) return false
                case 'blue':
                    if (count > maxBlue) return false
            }
        }
    }
    
    // for each cube set, check if numbers of cubes are less than or equal to their max allowed
    // If at any point the max allowed is exceeded, return false
    // Else return id
    return true
}

// Add the ids of all the games that are possible
// A game is possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes
let result = 0
console.log(gameData)
for (let i = 0; i < gameData.length; i++) {
    
    // parse line into id and reveal sets
    let gameParts = getGameParts(gameData[i])
    const id = parseInt(gameParts[0])
    let isPossible = isGamePossible(gameParts[1])
    result += isPossible ? id : 0
}
console.log(result)