import {dataInput, testInput} from "./input.js";

const boxes = {}
const lenses = {}

dataInput.split(",").forEach((item, index) => {
    let lens, focalLength;
    if (item.indexOf('-') !== -1) {
        lens = item.substring(0, item.length - 1);
    } else if (item.indexOf('=') !== -1) {
        [lens, focalLength] = item.split('=');
    }

    const boxNumber = lens.split('').reduce((acc, curr, idx) => {
        const ascii = Number(item.charCodeAt(idx));
        return (acc + ascii) * 17 % 256
    }, 0)
    const currBox = boxes[boxNumber] || [];


    if (!focalLength) {
        if (currBox.length) {
            const sameLens = currBox.findIndex((item) => item.indexOf(lens) !== -1);

            if (sameLens !== -1) {
                currBox.splice(sameLens, 1);
            }
        }
    } else if (focalLength) {
        if (!currBox.length) {
            boxes[boxNumber] = [lens + ' ' + focalLength];
        } else {
            const sameLens = currBox.findIndex((item) => item.indexOf(lens) !== -1);
            if (sameLens === -1) {
                currBox.push(lens + ' ' + focalLength);

            } else {
                currBox.splice(sameLens, 1, lens + ' ' + focalLength);

            }
        }
    }

}, 0)
// console.log(boxes)
Object.keys(boxes).forEach((currKey) => {
    const currBox = boxes[currKey];
    currBox.forEach((item, idx) => {
        const [lens, focalLength] = item.split(' ');
        lenses[lens] = (Number(currKey) + 1) * Number(focalLength) * (idx + 1);
    })

})
const result = Object.values(lenses).reduce((acc, curr) => acc + curr, 0);
