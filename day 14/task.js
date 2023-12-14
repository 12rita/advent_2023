import {dataInput} from "./input.js";


const data = dataInput.split('\n');


const transpose = (input, restore) => {
    const transposed = [];
    const n = input[0].length;
    const m = input.length;
    // console.log({n, m, input})
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < m; j++) {
            // console.log({i, j, val: input[j][i]})
            if (restore && !input[j][i])
                input[j][i] = '.';
            row += input[j][i];
        }
        transposed.push(row);
    }
    return transposed;
}

const moveRocksNorth = (input) => {
    const rockPositions = [];
    for (let i = 0; i < input[0].length; i++) {
        rockPositions[i] = [{y: 0, x: i, countRock: 0}];
    }
    input.forEach((row, y) => {
        row.split('').forEach((el, x) => {
            if (el === 'O') {
                rockPositions[x][rockPositions[x].length - 1].countRock++;
            } else if (el === '#') {
                if (rockPositions[x])
                    rockPositions[x].push({y: y + 1, x, countRock: 0});
            }
        })
    })
    return rockPositions;
}

const getRockMatrix = (rockPositions, length) => {
    const newRockPositions = rockPositions.map((row) => {
        const newRow = [];
        // console.log({newRow})
        row.forEach((el, idx) => {
            // console.log({el, length: row.length, idx, inputLength: input.length})
            let {y, countRock} = el;
            // let rowStart = 0;

            if (y !== 0) {
                newRow[y - 1] = '#';
            }

            for (let j = 0; j < countRock; j++) {
                newRow[y + j] = 'O';
            }
            if (idx === row.length - 1 && y + countRock < length) {
                for (let i = y + countRock + 1; i < length; i++) {
                    // console.log({i, newRow})
                    newRow[i] = '.';
                }
            }
            if (idx === row.length - 1 && countRock === 0) {
                for (let i = y; i < length; i++) {
                    // console.log({i, newRow})
                    newRow[i] = '.';
                }
            }
        })
        return newRow

    });
    return transpose(newRockPositions, true);
}
const findRockPositions = (input) => {

    const moved = moveRocksNorth(input);
    return getRockMatrix(moved, input.length);
}
// const {rockPositions} = findRockPositions(data)

// const findRockWeight = (rockPositions) => {
//     // const rockWeight = [];
//     const rowLength = rockPositions.length;
//     const rocksWeight = rockPositions.reduce((acc, row) => {
//
//         const rowWeight = row.reduce((acc, el) => {
//             // console.log({acc, el});
//             let weight = 0;
//             const {x, y, countRock} = el;
//             for (let i = y; i < y + countRock; i++) {
//                 weight += rowLength - i;
//             }
//             return acc + weight;
//         }, 0)
//
//         return acc + rowWeight;
//     }, 0)
//     // console.log({rocksWeight})
//     return rocksWeight;
// }

const countRockWeight = (input) => {
    return input.reverse().reduce((acc, row, i) => {
        let os = 0;
        for (let i = 0; i < row.length; i++) {
            if (row[i] === 'O') {
                os++;
            }
        }
        return acc + (os * (i + 1));

    }, 0)
}
// findRockWeight(rockPositions)

const getCycledRockPositions = (startPosition) => {
    // console.log('startPosition: \n', startPosition.join('\n'), '\n\n');

    const north = findRockPositions(startPosition);
    // console.log('north: \n', north.join('\n'), '\n\n');
    const west = transpose(findRockPositions(transpose(north.reverse()))).reverse();
    // console.log('west: \n', west.join('\n'), '\n\n');
    const south = (findRockPositions(west.reverse())).reverse();
    // console.log('south: \n', south.join('\n'), '\n\n');
    const east = transpose(findRockPositions(transpose(south).reverse()).reverse());
    // console.log('east: \n', east.join('\n'), '\n\n');
    return east;
}
const rockCycle = (input) => {
    let startPosition = input;
    const cache = {};
    let fullCycle = 0;
    for (let i = 0; i < 1000000000; i++) {

        cache[startPosition.join('')] = i;

        const newPosition = getCycledRockPositions(startPosition);

        if (cache[newPosition.join('')] !== undefined) {
            const cycleStart = cache[newPosition.join('')];
            const cycleLength = i - cycleStart + 1;

            fullCycle = (1000000000 - cycleStart) % cycleLength;
            startPosition=input;
            for (let i = 0; i < cycleStart + fullCycle; i++) {
                startPosition = getCycledRockPositions(startPosition);


            }
            return countRockWeight(startPosition);
        }

        startPosition = newPosition;
    }

    const result = countRockWeight(startPosition);
    console.log({result});
    return result;

}

rockCycle(data)
//99432 too low
//100876 correct