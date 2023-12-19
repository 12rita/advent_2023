import {dataInput, testInput} from "./input.js";

const lines = dataInput.split("\n");

// for (let i = 0; i < lines.length-1; i++) {
//     ground[i] = [];
//
// }

const getOutline = (lines) => {
    let ground = [];
    const directions = {
        R: (x, y) => [x + 1, y],
        L: (x, y) => [x - 1, y],
        U: (x, y) => [x, y - 1],
        D: (x, y) => [x, y + 1]

    }
    const start = {x: 0, y: 0};
    lines.forEach((line) => {
        const [direction, steps, color] = line.split(" ");

        for (let i = 0; i < steps; i++) {
            let [x, y] = directions[direction](start.x, start.y);
            // console.log({direction, x, y})
            if (y < 0) {
                ground.unshift([]);
                y = 0;
            } else if (!ground[y]) ground[y] = [];

            if (x < 0) {
                ground.forEach((row) => row.unshift('.'))
                x = 0;
            }
            // console.log({x,y})

            ground[y][x] = '#';
            start.x = x;
            start.y = y;
        }

    })
    return ground;
}
const ground = getOutline(lines);
const getInner = (ground) => {
    ground.forEach((row, y) => {

            let leftBorderIdx = row.findIndex((cell) => cell === '#');
            let continuousDashes = 0;
            let leftBorder = false;
            // const rightBorder = ground[y].lastIndexOf('#');
            for (let x = leftBorderIdx; x < row.length; x++) {
                // console.log({leftBorder, y, line: ground[y]})
                if (row[x] === '#') {
                    continuousDashes++;
                    if (continuousDashes > 1) {

                    }
                    else if (!leftBorder){
                        leftBorder = true;
                        leftBorderIdx = x;
                    }
                    else if (leftBorder){
                        // ground[y][x] = '#';
                        leftBorder = false;
                        leftBorderIdx = -1;
                    }

                } else {
                    if (continuousDashes >1){
                        const upperCell = ground[y-1]?.[x] === '#';
                        const lowerCell = ground[y+1]?.[x] === '#';
                        leftBorder = false;
                        leftBorderIdx=-1;
                        continuousDashes = 0;
                    }

                    if (leftBorder) {
                        ground[y][x] = '#';
                    }
                }
            }


    })
}

// getInner(ground)

let sum = 0;
// console.log(ground)

const maxLineLength = ground.reduce((acc, curr) => Math.max(acc, curr.length), 0);
const beauty = ground.map((line) => {
    // console.log(line.length)
    let newLine = '';
    for (let i = 0; i < maxLineLength; i++) {
        const curr = line[i];
        if (curr === '#') sum++;
        newLine += curr || '.';

    }

    // console.log(newLine)
    return newLine

});
console.log(beauty, sum)
const visualize = () => {
    const el = document.getElementById('root');
    const container = document.createElement('div');

    beauty.forEach((row) => {
        const newRow = document.createElement('div');
        newRow.style.display = 'flex';
        row.split('').forEach(cell => {
            const newCell = document.createElement('div');
            newCell.style.backgroundColor = cell === '#' ? '#dc92eb' : '#92ebd3';
            newCell.style.width = '10px';
            newCell.style.minWidth = '10px';
            newCell.innerText = cell
            newRow.appendChild(newCell);
        })
        container.appendChild(newRow);


    });
    // console.log(container)
    el.appendChild(container);
}
visualize()


//6810 too low
//68834 too high
//51363 too high