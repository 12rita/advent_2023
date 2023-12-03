import {dataInput, testInput} from "./input.js";

const lines = dataInput.split('\n');
const testLines = testInput.split('\n');


const checkNumbers = /\d/g;

const firstResult = lines.reduce((acc, line) => {
    const matches = line.match(checkNumbers);
    const currentSum = matches[0] + (matches[matches.length - 1])
    return acc + (+currentSum);
}, 0);

const numbersDict = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9

}

const checkWords = /one|two|three|four|five|six|seven|eight|nine/g;
const checkReverse = /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g;


const secondResult = lines.reduce((acc, line) => {
    const digitalStringForward = (line).replace(checkWords, (match) => {
        return numbersDict[match]
    })
    const digitalStringReverse = (line.split('').reverse().join('')).replace(checkReverse, (match) => {
        return numbersDict[match.split('').reverse().join('')]
    }).split('').reverse().join('');

    const numberDigits = (digitalStringForward + digitalStringReverse).match(checkNumbers);
    const currentSum = numberDigits[0] + (numberDigits[numberDigits.length - 1])
    return acc + (+currentSum);


}, 0);

