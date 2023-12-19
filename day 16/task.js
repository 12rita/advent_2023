import {dataInput} from "./input.js";


let visited = {};
const lines = dataInput.split("\n");
// console.log(boxes)

const goLeft = (x, y, matrix, prevDir) => {
    // console.log({x, y, next: matrix[y]?.[x - 1], dir: "left"})
    // if (visited[`${x},${y},${prevDir}`]) {
    //     return;
    // }
    visited[`${x},${y},${prevDir}`] = true;
    // console.log({cell:matrix[y]})

    if (visited[`${x - 1},${y},left`]) {
        return;
    }
    if (!matrix[y]?.[x - 1]) {
        return;
    }
    if (matrix[y][x - 1] === "." || matrix[y][x - 1] === "-") {
        goLeft(x - 1, y, matrix, 'left');
    } else {
        if (matrix[y][x - 1] === `|`) {
            goDown(x - 1, y, matrix, 'left');
            goUp(x - 1, y, matrix, 'left');
        } else if (matrix[y][x - 1] === `\\`) {
            goUp(x - 1, y, matrix, 'left');
        } else if (matrix[y][x - 1] === `/`) {
            goDown(x - 1, y, matrix, 'left');
        }

    }
}

const goUp = (x, y, matrix, prevDir) => {
    // console.log({x, y, next: matrix[y - 1]?.[x], dir: "up"})
    // if (visited[`${x},${y},${prevDir}`]) {
    //     return;
    // }
    visited[`${x},${y},${prevDir}`] = true;

    if (visited[`${x},${y - 1},up`]) {
        return;
    }
    if (!matrix[y - 1]?.[x]) {
        return;
    }
    if (matrix[y - 1][x] === "." || matrix[y - 1][x] === "|") {
        goUp(x, y - 1, matrix, 'up');
    } else {
        if (matrix[y - 1][x] === `-`) {
            goLeft(x, y - 1, matrix, 'up');
            goRight(x, y - 1, matrix, 'up');
        } else if (matrix[y - 1][x] === `\\`) {
            goLeft(x, y - 1, matrix, 'up');
        } else if (matrix[y - 1][x] === `/`) {
            goRight(x, y - 1, matrix, 'up');
        }

    }
}
const goDown = (x, y, matrix, prevDir) => {
    // console.log({x, y, next: matrix[y + 1]?.[x], dir: "down"})
    // if (visited[`${x},${y},${prevDir}`]) {
    //     return;
    // }
    visited[`${x},${y},${prevDir}`] = true;

    if (visited[`${x},${y + 1},down`]) {
        return;
    }
    if (!matrix[y + 1]?.[x]) {
        return;
    }
    if (matrix[y + 1][x] === "." || matrix[y + 1][x] === "|") {
        goDown(x, y + 1, matrix, 'down');
    } else {
        if (matrix[y + 1]?.[x] === `-`) {
            goLeft(x, y + 1, matrix, 'down');
            goRight(x, y + 1, matrix, 'down');
        } else if (matrix[y + 1][x] === `\\`) {
            goRight(x, y + 1, matrix, 'down');
        } else if (matrix[y + 1][x] === `/`) {
            goLeft(x, y + 1, matrix, 'down');
        }
    }

}

const goRight = (x, y, matrix, prevDir) => {
    // console.log({x, y, next: matrix[y]?.[x + 1], dir: "right"})
    // if (visited[`${x},${y},${prevDir}`]) {
    //     return;
    // }
    visited[`${x},${y},${prevDir}`] = true;

    if (visited[`${x + 1},${y},right`]) {
        return;
    }
    if (!matrix[y]?.[x + 1]) {
        return;
    }
    if (matrix[y][x + 1] === "." || matrix[y][x + 1] === "-") {
        goRight(x + 1, y, matrix, 'right');
    } else {
        if (matrix[y][x + 1] === `|`) {
            goDown(x + 1, y, matrix, 'right');
            goUp(x + 1, y, matrix, 'right');
        } else if (matrix[y][x + 1] === `\\`) {
            goDown(x + 1, y, matrix, 'right');
        } else if (matrix[y][x + 1] === `/`) {
            goUp(x + 1, y, matrix, 'right');
        }

    }
}

const getSum = (visited) => {
    const visitedArr = [];
    lines.forEach((line, y) => {
        visitedArr[y] = [];
        line.split("").forEach((cell, x) => {
            visitedArr[y][x] = 0;
        })
    })
    Object.keys(visited).forEach((key) => {
        const [x, y] = key.split(",");
        visitedArr[y][x] = 1;
    });
    return visitedArr.reduce((acc, line) => {

        const innerSum = line.reduce((accInner, cell) => {
            return accInner + Number(cell);
        }, 0)

        return acc + innerSum
    }, 0);
}

const beamWay = (lines) => {
    const start = {x: 0, y: 0};
    const sums = [];
    for (let i = 0; i < lines[0].length; i++) {
        goDown(i, 0, lines,'down');
        const sum = getSum(visited);
        sums.push(sum);
        visited = {};
    }
    for (let i = 0; i < lines.length; i++) {
        goRight(0, i, lines,'right');
        const sum = getSum(visited);
        sums.push(sum);
        visited = {};
    }
    for (let i = 0; i < lines[0].length; i++) {
        goUp(i, lines.length - 1, lines,'up');
        const sum = getSum(visited);
        sums.push(sum);
        visited = {};
    }
    for (let i = 0; i < lines.length; i++) {
        goLeft(lines[0].length - 1, i, lines,'left');
        const sum = getSum(visited);
        sums.push(sum);
        visited = {};
    }
   console.log(Math.max(...sums));
    // goLeft(start.x, start.y, lines);
    // goUp(start.x, start.y, lines);
    // goDown(start.x, start.y, lines);
}

beamWay(lines);

//7673 correct
