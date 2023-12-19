import {dataInput, testInput} from "./input.js";

const cache = {};

const moveRight = (x, y, array) => {
    const nextExist = array[y][x + 1] !== undefined;
    const canMove = array[y][x + 1] === '.' || array[y][x + 1] === '-';
    while (nextExist && canMove) {
        x++;
        if (array[y][x] === 1) {
            return x;
        }
    }
}
const beamWay = ()=>{
    let startX = 0;
    let startY = 0;
}