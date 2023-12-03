import {dataInput, testInput} from "./input.js";

const lines = dataInput.split('\n');
const testLines = testInput.split('\n');

const goodNumbers = [];

const isNumber = (char) => {
    return !isNaN(Number(char));
}
const checkLine = (line, startIdx, endIdx) => {
    if (line[startIdx - 1] && line[startIdx - 1] !== '.' && !isNumber(line[startIdx - 1])) return true;
    if (line[endIdx + 1] && line[endIdx + 1] !== '.' && !isNumber(line[endIdx + 1])) return true;
    else return false;
}

const checkUpAndDown = (neighbourLine, startIdx, endIdx) => {
    if (!neighbourLine)
        return false
    for (let i = startIdx - 1; i <= endIdx + 1; i++) {
        if (neighbourLine[i] && neighbourLine[i] !== '.' && !isNumber(neighbourLine[i])) return true;
    }
    return false;
}
const checkPart = ({startIdx, endIdx, prevLine, currLine, nextLine}) => {

    const hasNeighbors = checkLine(currLine, startIdx, endIdx)
    const hasUpAndDown = checkUpAndDown(nextLine, startIdx, endIdx) || checkUpAndDown(prevLine, startIdx, endIdx);
    return hasNeighbors || hasUpAndDown;
}

lines.forEach((line, lineIdx, array) => {
    let numberStart = null;
    let number = null;

    for (let i = 0; i < line.length; i++) {
        if (isNumber(line[i])) {
            if (numberStart === null) {
                numberStart = i;
                number = line[i];
            } else {
                number += line[i];
            }
            if (i === line.length - 1) {
                if (checkPart({
                    startIdx: numberStart,
                    endIdx: i,
                    prevLine: array[lineIdx - 1],
                    currLine: line,
                    nextLine: array[lineIdx + 1]
                })) {

                    goodNumbers.push(Number(number));
                }
            }

        } else {
            if (numberStart !== null) {
                if (checkPart({
                    startIdx: numberStart,
                    endIdx: i - 1,
                    prevLine: array[lineIdx - 1],
                    currLine: line,
                    nextLine: array[lineIdx + 1]
                })) {

                    goodNumbers.push(Number(number));
                }

                numberStart = null;
                number = null;

            }

        }

    }

})
const getLeftNumber = (idx, line) => {
    let number = null;

    for (let i = idx; i >= 0; i--) {
        if (isNumber(line[i])) {
            if (i === idx) {
                number = line[i];
            } else {
                number = line[i] + number;
            }
        } else {
            break;
        }
    }
    return number
}

const getRightNumber = (idx, line) => {
    let number = null;

    for (let i = idx; i < line.length; i++) {
        if (isNumber(line[i])) {
            if (i === idx) {
                number = line[i];
            } else {
                number += line[i];
            }
        } else {
            break;
        }
    }
    return number

}
const checkLeft = ({idx, line}) => {
    if (isNumber(line[idx - 1])) {
        return getLeftNumber(idx - 1, line)
    }
    return null;
}
const checkRight = ({idx, line}) => {
    if (isNumber(line[idx + 1])) {
        return getRightNumber(idx + 1, line)
    }
    return null;
}

const checkNeighbour = ({idx, neighbourLine}) => {
    let leftNeighbour = null;
    let rightNeighbour = null;
    let fullNumber = null;
    const neighbours = [];

    if (!neighbourLine) return neighbours;

    if (isNumber(neighbourLine[idx - 1])) {
        leftNeighbour = getLeftNumber(idx - 1, neighbourLine)
        // neighbours.push(leftNeighbour)
    }
    if (isNumber(neighbourLine[idx + 1])) {
        rightNeighbour = getRightNumber(idx + 1, neighbourLine)
        // neighbours.push(rightNeighbour)
    }
    if (isNumber(neighbourLine[idx])) {
        fullNumber = neighbourLine[idx];
        if (leftNeighbour) fullNumber = leftNeighbour + fullNumber;
        if (rightNeighbour) fullNumber = fullNumber + rightNeighbour;
        neighbours.push(fullNumber)
    }
    if (leftNeighbour && !fullNumber){
        neighbours.push(leftNeighbour)
    }
    if (rightNeighbour && !fullNumber){
        neighbours.push(rightNeighbour)
    }
    // console.log({neighbours, rightNeighbour, leftNeighbour, neighbourLine})

    return neighbours;


}

const gearRatios = [];

lines.forEach((line, lineIdx, array) => {

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '*') {
            const neighbours = [];
            const left = checkLeft({idx: i, line})
            const right = checkRight({idx: i, line})
            const up = checkNeighbour({idx: i, neighbourLine: array[lineIdx - 1]})
            const down = checkNeighbour({idx: i, neighbourLine: array[lineIdx + 1]})

            if (left) neighbours.push(left);
            if (right) neighbours.push(right);
            if (up.length) neighbours.push(...up);
            if (down.length) neighbours.push(...down);
            // console.log({left, right, up, down, item:line[i], line, neighbours})
            if (neighbours.length === 2) {
                gearRatios.push(Number(neighbours[0]) * Number(neighbours[1]))
            }
        }
    }
})

const result2 = gearRatios.reduce((acc, number) => acc + number, 0);
console.log({result2})

// const result1 = goodNumbers.reduce((acc, number) => acc + number, 0);
// console.log({result1})
// console.log({goodNumbers})
//521979