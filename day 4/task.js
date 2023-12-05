import {dataInput, testInput} from "./input.js";

const lines = dataInput.split('\n');
const testLines = testInput.split('\n');


const result1 = lines.reduce((acc, line) => {
    const [card, numbers] = line.split(': ');
    const [winningNumbers, yourNumbers] = numbers.split(' | ');
    const yourNumbersArray = yourNumbers.trim().split(/\s+/).map(Number);
    const winningNumbersArray = winningNumbers.trim().split(/\s+/).map(Number);
    // console.log({yourNumbers, winningNumbers})
    const cardWorth = yourNumbersArray.reduce((acc, number) => {
        if (winningNumbersArray.includes(number)) {
            // console.log({number})
            return acc === 0 ? 1 : acc * 2;
        }
        return acc;
    }, 0)


    return acc + (cardWorth);
}, 0)

const cards = {};
const cardCounts = {};
lines.forEach((line, idx) => {
    const [card, numbers] = line.split(': ');
    const [_, cardNumberString] = card.split(/\s+/);
    const cardNumber = Number(cardNumberString);
    if (!cards[cardNumber]) {
        cards[cardNumber] = 1;
    } else cards[cardNumber]++

    const [winningNumbers, yourNumbers] = numbers.split(' | ');
    const yourNumbersArray = yourNumbers.trim().split(/\s+/).map(Number);
    const winningNumbersArray = winningNumbers.trim().split(/\s+/).map(Number);
    // console.log({yourNumbers, winningNumbers})
    const cardCount = yourNumbersArray.reduce((acc, number) => {
        if (winningNumbersArray.includes(number)) {
            return acc + 1;
        }
        return acc;
    }, 0)
    cardCounts[cardNumber]=cardCount;


    for (let i = 1; i < cardCount + 1; i++) {

        if (!cards[cardNumber + i])
            cards[cardNumber + i] = 0;

        cards[cardNumber + i] = cards[cardNumber + i] + (1 * cards[cardNumber]);
        // console.log({cardNumber, newCardNumber: cardNumber+1, NewCard: cards[cardNumber + i]})
    }


})
const lastCardNumber = Number(lines[lines.length - 1].split(':')[0].split(' ')[1]);

const result2 = Object.keys(cards).reduce((acc, key) => {
    if (key <= lastCardNumber) return acc + Number(cards[key]);
    else return acc;
}, 0)
console.log(cardCounts)
console.log({result2});