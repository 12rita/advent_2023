import {dataInput, testInput} from "./input.js";

const lines = dataInput.split('\n');
const testLines = testInput.split('\n');

// const rules = `12 red cubes, 13 green cubes, and 14 blue cubes`;
// const possibleGames = [];
const rules = {
    red: 12,
    green: 13,
    blue: 14

}

const result1 = lines.reduce((acc, line) => {
    const [, setString] = line.split(':');
    const sets = setString.split(';')
    // console.log({game, sets})
    const gameRules = {
        red: 0,
        green: 0,
        blue: 0
    }

    sets.forEach(set => {
        const cubes = set.split(',');
        cubes.forEach(cube => {
            cube = cube.trim();
            const [count, color] = cube.split(' ');

            if (gameRules[color] < Number(count)) {
                gameRules[color] = Number(count);

            }

        })


    })
    const gamePower = Object.values(gameRules).reduce((acc, val) => acc * val);

    return acc+gamePower;


}, 0)

console.log({result1})