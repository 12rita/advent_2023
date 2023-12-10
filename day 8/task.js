import {dataInput, testInput} from "./input.js";

const [instructions, linesData] = dataInput.split('\n\n')
const nodes = {}

linesData.split('\n').forEach((line) => {
    const [nodeName, nodeData] = line.split(' = ')
    const [left, right] = nodeData.substring(1, nodeData.length - 1).split(', ')
    nodes[nodeName] = {
        L: left, R: right
    }


});

const LCM = (arr) => {
    const n = arr.length;
    let a = Math.abs(arr[0]);
    for (let i = 1; i < n; i++) {
        let b = Math.abs(arr[i]),
            c = a;
        while (a && b) {
            a > b ? a %= b : b %= a;
        }
        a = Math.abs(c * arr[i]) / (a + b);
    }
    return a;
}
const findWay = (start) => {

    let instructionIdx = 0;
    let counter = 0;
    let found = false;


    while (!found) {

        const instruction = instructions[instructionIdx];
        // console.log({start, instruction})
        if (start[instruction].endsWith('Z')) found = true;
        start = nodes[start[instruction]];
        // console.log({newStart: start})

        counter++;

        instructionIdx++;
        if (instructionIdx === instructions.length) instructionIdx = 0;
    }
    return counter;
}

// findWay(nodes['AAA']);

const findWay2 = () => {
    let starts = Object.keys(nodes).filter(key => {
        return key.endsWith('A')
    });

    const paths = starts.map(start => {
        return findWay(nodes[start]);
    })
    return  LCM(paths)
}

console.log(findWay2());