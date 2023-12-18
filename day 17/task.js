import {testInput, dataInput} from "./input.js";


const lines = testInput.split('\n');
const sums = [];
const waysCost = {};

const cameFrom = {};
const neighboursQueue = [];

const heuristic = (a, b) => {
// Manhattan distance on a square grid
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
const getNeighbours = ({x, y, dir, stepCount, lines}) => {
    const neighbours = [];
    // if (dir === 'L') {
    //     for (let i = 0; i < 3; i++) {
    //         neighbours.push({x, y: y + i, count: lines[y + i]?.[x], dir: 'D'});
    //         neighbours.push({x, y: y - i, count: lines[y - i]?.[x], dir: 'U'})
    //     }
    //
    // } else if (dir === 'R') {
    //     for (let i = 0; i < 3; i++) {
    //         neighbours.push({x, y: y + i, count: lines[y + i]?.[x], dir: 'D'});
    //         neighbours.push({x, y: y - i, count: lines[y - i]?.[x], dir: 'U'})
    //     }
    // } else if (dir === 'U') {
    //     for (let i = 0; i < 3; i++) {
    //         neighbours.push({x: x + i, y, count: lines[y]?.[x + i], dir: 'R'});
    //         neighbours.push({x: x - i, y, count: lines[y]?.[x - i], dir: 'L'})
    //     }
    // } else if (dir === 'D') {
    //     for (let i = 0; i < 3; i++) {
    //         neighbours.push({x: x + i, y, count: lines[y]?.[x + i], dir: 'R'});
    //         neighbours.push({x: x - i, y, count: lines[y]?.[x - i], dir: 'L'})
    //     }
    // } else {
    //     for (let i = 0; i < 3; i++) {
    //         neighbours.push({x: x + i, y, count: lines[y]?.[x + i], dir: 'R'});
    //         neighbours.push({x, y: y + i, count: lines[y + i]?.[x], dir: 'D'});
    //     }
    // }
    if (y < lines.length - 1 && lines[y + 1]?.[x] !== undefined) {
        neighbours.push({
            x,
            y: y + 1,
            count: Number(lines[y + 1]?.[x]),
            dir: 'D',
            stepCount: dir === 'D' ? stepCount + 1 : 1
        });
    }
    if (y > 0 && lines[y - 1]?.[x] !== undefined) {
        neighbours.push({
            x,
            y: y - 1,
            count: Number(lines[y - 1]?.[x]),
            dir: 'U',
            stepCount: dir === 'U' ? stepCount + 1 : 1
        });
    }
    if (x < lines[0].length - 1 && lines[y]?.[x + 1] !== undefined) {
        neighbours.push({
            x: x + 1,
            y,
            count: Number(lines[y]?.[x + 1]),
            dir: 'R',
            stepCount: dir === 'R' ? stepCount + 1 : 1
        });
    }
    if (x > 0 && lines[y]?.[x - 1] !== undefined) {
        neighbours.push({
            x: x - 1,
            y,
            count: Number(lines[y]?.[x - 1]),
            dir: 'L',
            stepCount: dir === 'L' ? stepCount + 1 : 1
        });
    }


    return neighbours.filter((el) => {
        return el.x !== undefined && el.y !== undefined && el.count !== undefined;
    })
}


const getNeighbourNode = (node, lines) => {
    const neighbours = [];
    const {x, y, dir} = node;
}

const formQueue = (neighbour) => {
    neighboursQueue.push(neighbour);
    neighboursQueue.sort((a, b) => a.priority - b.priority);
}
const findWay = (lines) => {
    // const start = {x: 0, y: 0, counter: 0, lines, sum: 0};
    const start = {x: 0, y: 0, count: 0, dir: 'S', stepCount: 0};
    const end = {x: lines[0].length - 1, y: lines.length - 1, count: lines[lines.length - 1][lines[0].length - 1]};
    const ends = [];
    // const startNode = new Node(start.x, start.y, start.count, start.dir, start.stepCount);
    neighboursQueue.push({...start, priority: 0});
    waysCost[`${start.x}-${start.y}-S`] = 0;

    const oppositeDir = {
        U: 'D',
        D: 'U',
        L: 'R',
        R: 'L'
    }
    while (neighboursQueue.length) {
        const current = neighboursQueue.shift();
        const {x: currX, y: currY, dir: currDir} = current;
        console.log({current, cost: waysCost[`${currX}-${currY}-${currDir}`]})


        const keyCost = `${currX}-${currY}-${currDir}`;

        if (current.x === end.x && current.y === end.y) {
            // waysCost[keyCost] = waysCost[keyCost]+Number(current.count);
            break;
        }
        const neighbours = getNeighbours({...current, lines});
        // console.log({current, neighbours, neighboursQueue})

        neighbours.forEach((neighbour) => {
            const {x, y, count, dir, stepCount} = neighbour;
            // const neighbourNode = new Node(x, y, count, dir, stepCount);
            const newKeyCost = `${x}-${y}-${dir}`;
            const backNeighbour = oppositeDir[dir] === current.dir;


            const newCost = waysCost[keyCost] + Number(count);

            if ((!waysCost[newKeyCost] || waysCost[newKeyCost] < newCost) && stepCount <= 3 && !backNeighbour) {
                waysCost[newKeyCost] = newCost;
                console.log({current, neighbour, newCost})
                const priority = newCost + heuristic(neighbour, end);
                if (neighbour.x === end.x && neighbour.y === end.y) {
                    ends.push({neighbour, cost: newCost});
                }
                formQueue({...neighbour, priority})
                cameFrom[`${x}-${y}`] = current;
            }
        })

    }
    console.log({ends})
    // console.log({fin: Object.keys(waysCost).filter((el) => el.startsWith(`${end.x}-${end.y}`))})
}
findWay(lines)
//868 too low