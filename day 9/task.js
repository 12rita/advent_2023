import {dataInput, testInput} from "./input.js";


const reports = dataInput.split("\n");

const findNext = (values) => {
    const diffs = [];
    for (let i = 0; i < values.length - 1; i++) {
        diffs.push(values[i + 1] - values[i]);
    }

    if (diffs.every(diff => diff === 0)) {
        return values.shift();
    }
    return values.shift() - findNext(diffs);
}

const result = reports.reduce((acc, report) => {
    const values = report.split(" ").map(value => Number(value));

    return acc + findNext(values);
}, 0)

console.log({result});