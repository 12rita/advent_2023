import {dataInput, testInput} from "./input.js";

const lines = testInput.split("\n");

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
const checkCellInside = (x, y, ground) => {

    let leftBorder = false;
    let rightBorder = false;
    let upperBorder = false;
    let lowerBorder = false;
    for (let i = x; i >= 0; i--) {
        if (ground[y][i] === '#') leftBorder = true;
    }
    for (let i = x; i < ground[y].length; i++) {
        if (ground[y][i] === '#') rightBorder = true;
    }
    for (let i = y; i >= 0; i--) {
        if (ground[i][x] === '#') upperBorder = true;
    }
    for (let i = y; i < ground.length; i++) {
        if (ground[i][x] === '#') lowerBorder = true;
    }
    // console.log({x, y, row: ground[y], leftBorder, rightBorder, upperBorder, lowerBorder})

    return leftBorder && rightBorder && upperBorder && lowerBorder;
}




const shoelaceS = (arrayOfVertex) => {
    let leftSum = 0;
    for (let i = 0; i < arrayOfVertex.length - 1; i++) {
        leftSum += Number(arrayOfVertex[i]?.x) * Number(arrayOfVertex[i + 1]?.y)
    }
    leftSum += Number(arrayOfVertex[arrayOfVertex.length - 1]?.x) * Number(arrayOfVertex[0]?.y)

    let rightSum = 0;
    for (let i = 0; i < arrayOfVertex.length - 1; i++) {
        rightSum += Number(arrayOfVertex[i]?.y) * Number(arrayOfVertex[i + 1]?.x)
    }
    rightSum -= Number(arrayOfVertex[arrayOfVertex.length - 1]?.y) * Number(arrayOfVertex[0]?.x)
    return Math.abs(leftSum - rightSum) * 0.5
}
const getInner = (ground) => {
    const vertexes = [];

    ground.forEach((row, y) => {
        row.forEach((cell, x) => {
                if (cell === '#') {
                    vertexes.push({x, y})
                }
            }
        )
    })
    console.log({vertexes})
    const S = shoelaceS(vertexes);
    console.log({S});
    return S;




}


const coloredGround = getInner(ground)


// console.log(ground)


const beautify = (ground) => {
    let sum = 0;
    const maxLineLength = ground.reduce((acc, curr) => Math.max(acc, curr.length), 0);
    // console.log({localGround})

    return {
        matrix: [...ground].map((line) => {
            // console.log(line.length)
            let newLine = '';
            for (let i = 0; i < maxLineLength; i++) {
                const curr = line[i];
                if (curr === '#') sum++;
                newLine += curr || '.';

            }

            // console.log(newLine)
            return newLine

        }), sum
    };

}


const outer = beautify(ground);
// const inner = beautify(coloredGround);

console.log({outerSum: outer.sum})
const visualize = (outer, inner) => {
    const el = document.getElementById('root');
    const container = document.createElement('div');
    const innerContainer = document.createElement('div');

    outer.forEach((row) => {
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

   inner && inner.forEach((row) => {
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
        innerContainer.appendChild(newRow);


    });
    const doubleContainer = document.createElement('div');
    doubleContainer.style.display = 'flex';
    doubleContainer.style.gap = '20px';
    doubleContainer.appendChild(innerContainer);
    doubleContainer.appendChild(container);

    // console.log(container)
    el.appendChild(doubleContainer);
}
visualize(outer.matrix)


//6810 too low
//68834 too high
//51363 too high