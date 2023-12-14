import {dataInput, testInput} from "./input.js";

const data = testInput.split('\n');
const visitedCells = data.map((row) => row.split('').map(() => false));
const visitedWay = data.map((row) => row.split('').map(() => '.'));


const start = {
    x: data.find((row) => row.includes('S')).indexOf('S'),
    y: data.findIndex((row) => row.includes('S'))
}
visitedWay[start.y][start.x] = 'S';
let x = start.x;
let y = start.y;
let counter = 0;
let foundStart = false

const directions = {
    '|': {
        U: true,
        D: true,
        L: false,
        R: false
    },
    "-": {
        U: false,
        D: false,
        L: true,
        R: true
    },
    "L": {
        U: true,
        D: false,
        L: false,
        R: true
    },
    'J': {
        U: true,
        D: false,
        L: true,
        R: false
    },
    '7': {
        U: false,
        D: true,
        L: true,
        R: false
    },
    'F': {
        U: false,
        D: true,
        L: false,
        R: true
    },
    '.': {
        U: false,
        D: false,
        L: false,
        R: false
    },
    'S': {
        U: true,
        D: true,
        L: true,
        R: true
    }

}
const beutify = {
    '|': '│',
    "-": '─',
    "L": '└',
    'J': '┘',
    '7': '┐',
    'F': '┌',
    '.': '.',
    'S': 'S'

}

const goRight = () => {

    // console.log({x, y, counter, point: data[y][x], dir: 'right'})
    const line = data[y];
    for (let i = x; i < line.length; i++) {
        visitedCells[y][i] = true;

        const {R: RS} = directions[line[i]];
        const {L: LF} = line[i + 1] ? directions[line[i + 1]] : {L: false};
        if (RS && LF) {
            const isStart = checkStart(i + 1, y)
            if (isStart) {
                counter++;
                foundStart = true;
                return;
            }
            if (!visitedCells[y][i + 1]) {
                counter++;
                visitedWay[y][i + 1] = beutify[line[i + 1]];
            } else {
                x = i;
                return
            }

        } else {
            x = i;
            return
        }


    }
}

const goLeft = () => {

    // console.log({x, y, counter, point: data[y][x], dir: 'left'})
    const line = data[y];
    for (let i = x; i >= 0; i--) {
        visitedCells[y][i] = true;

        const {L: LF} = directions[line[i]];
        const {R: RS} = line[i - 1] ? directions[line[i - 1]] : {R: false};
        if (LF && RS) {
            const isStart = checkStart(i - 1, y)
            if (isStart) {
                counter++;
                foundStart = true;
                return;
            }
            if (!visitedCells[y][i - 1]) {
                counter++;
                visitedWay[y][i - 1] = beutify[line[i - 1]];
            } else {
                x = i;
                return
            }
        } else {
            // console.log({x, y, counter, point: data[y][x], dir: 'left'})
            x = i;
            return;
        }
    }
}
const goUp = () => {

    // console.log({x, y, counter, point: data[y][x], dir: 'up'})
    for (let i = y; i >= 0; i--) {
        visitedCells[i][x] = true;

        const {U: US} = directions[data[i][x]];
        const {D: DF} = data[i - 1] ? directions[data[i - 1][x]] : {D: false};

        if (US && DF) {
            const isStart = checkStart(x, i - 1)
            if (isStart) {
                counter++;
                foundStart = true;
                return;
            }
            if (!visitedCells[i - 1][x]) {
                counter++;
                visitedWay[i - 1][x] = beutify[data[i - 1][x]];
            } else {
                y = i;
                return
            }

        } else {
            // console.log({x, y, counter, point: data[y][x], dir: 'up'})
            y = i;
            return;

        }
    }
}

const goDown = () => {

    // console.log({x, y, counter, point: data[y][x], nextPoint: data[y + 1][x], dir: 'down'})
    for (let i = y; i < data.length; i++) {
        visitedCells[i][x] = true;

        const {D: DS} = directions[data[i][x]];
        const {U: UF} = data[i + 1] ? directions[data[i + 1][x]] : {U: false};

        if (DS && UF) {
            const isStart = checkStart(x, i + 1)
            if (isStart) {
                counter++;
                foundStart = true;
                return;
            }
            if (!visitedCells[i + 1][x]) {
                counter++;
                console.log({point: data[i + 1][x], beauty: beutify[data[i + 1][x]]})
                visitedWay[i + 1][x] = beutify[data[i + 1][x]];
            } else {
                y = i;
                return
            }
        } else {
            y = i;
            return
        }
    }
}

const checkStart = (x, y) => {
    return x === start.x && y === start.y
}


const findLoop = () => {

    while (!foundStart) {

        goUp();
        goLeft();
        goDown();
        goRight();

    }
    return counter / 2;

}
console.log(findLoop())

console.log(visitedWay.map((row) => row.join('')).join('\n'));

const checkCell = ({x, y, array}) => {
    let counterLeft = 0;
    let counterRight = 0;
    let counterUp = 0;
    let counterDown = 0;

    for (let i = 0; i < x; i++) {
        console.log({left: array[y][i]})
        if (array[y][i] !== '.') counterLeft++;
    }
    for (let i = x + 1; i < array.length; i++) {
        console.log({right: array[y][i]})
        if (array[y][i] !== '.') counterRight++;
    }
    for (let i = 0; i < y; i++) {
        console.log({up: array[i][x]})
        if (array[i][x] !== '.') counterUp++;
    }
    for (let i = y + 1; i < array.length; i++) {
        console.log({down: array[i][x]})
        if (array[i][x] !== '.') counterDown++;
    }
    console.log({x, y, point:array[y][x], counterLeft, counterRight, counterUp, counterDown});

   return [counterLeft, counterRight, counterUp, counterDown].every((item) => item % 2 !== 0)
}
const getInner = () => {
    let inner = 0;
    visitedWay.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === '.')
                checkCell({x, y, array: visitedWay}) && inner++;
        })
    });
    return inner;
}
console.log(getInner())

const visualize = () => {
    const el = document.getElementById('root');
    const container = document.createElement('div');

    visitedWay.forEach((row) => {
        const newRow = document.createElement('div');
        newRow.style.display = 'flex';
        row.forEach(cell => {
            const newCell = document.createElement('div');
            newCell.style.color = cell === '.' ? 'red' : 'blue';
            newCell.style.width = '10px';
            newCell.innerText = cell === '.' ? '●' : cell;
            newRow.appendChild(newCell);
        })
        container.appendChild(newRow);


    });
    console.log(container)
    el.appendChild(container);
}
// visualize();
