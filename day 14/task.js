import {dataInput, testInput} from "./input.js";


const data = testInput.split('\n');


const findRockPositions = (input) => {
    const rockPositions = [];
    for (let i = 0; i < input[0].length; i++) {
        rockPositions[i] = [{y: 0, x: i, countRock: 0}];
    }
    input.forEach((row, y) => {
        row.split('').forEach((el, x) => {

            if (el === 'O') {
                // if (!rockPositions[x])
                //     rockPositions[x] = [{y, x, countRock: 1}];
                rockPositions[x][rockPositions[x].length - 1].countRock++;

                // console.log({el, rockPositions})
            } else if (el === '#') {
                if (rockPositions[x])
                    rockPositions[x].push({y: y + 1, x, countRock: 0});
            }
        })
    })
    // console.log({rockPositions})
    const newRockPositions = rockPositions.map((row) => {
        const newRow = [];
        row.forEach((el, i) => {
            let {x, y, countRock} = el;
            if (y === 0) {
                newRow[y]='O'
                countRock--;
            }
            else {
                newRow[y-1] = '#';
            }
            for (let j = 0; j < countRock; j++) {
                newRow[y+j] = 'O';
            }
        })
        return newRow

    });
    console.log({newRockPositions})
    const transposed = [];
    const n = newRockPositions[0].length;
    const m = newRockPositions.length;
    // console.log({n, m, 0: input[0]})
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < m; j++) {
            console.log({i, j, val: input[j][i]})
            if (!input[j][i])
                input[j][i] = '.';
            row += input[j][i];
        }
        transposed.push(row);
    }
console.log({transposed: transposed.join('\n')})
    return rockPositions;
}
const positions = findRockPositions(data)

const findRockWeight = (rockPositions) => {
    // const rockWeight = [];
    const rowLength = rockPositions.length;
    const rocksWeight = rockPositions.reduce((acc, row) => {


        const rowWeight = row.reduce((acc, el) => {
            // console.log({acc, el});
            let weight = 0;
            const {x, y, countRock} = el;
            for (let i = y; i < y + countRock; i++) {
                weight += rowLength - i;
            }
            return acc + weight;
        }, 0)

        return acc + rowWeight;
    }, 0)
    console.log({rocksWeight})
    return rocksWeight;
}

findRockWeight(positions)

const transpose = (input) => {
    const transposed = [];
    const n = input[0].length;
    const m = input.length;
    // console.log({n, m, 0: input[0]})
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < m; j++) {
            // console.log({i, j, val: input[j][i]})
            row += input[j][i];
        }
        transposed.push(row);
    }
    return transposed;
}
const rockCycle = (input) => {
    const north = findRockPositions(input);
    const west = findRockPositions(transpose(north.reverse()));
    const east = findRockPositions(transpose(north));
    const south = findRockPositions(input.reverse());

}