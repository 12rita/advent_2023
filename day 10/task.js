import {dataInput, testInput} from "./input.js";

const data = dataInput.split('\n');

const start = {
    x: data.find((row) => row.includes('S')).indexOf('S'),
    y: data.findIndex((row) => row.includes('S'))
}
const directions = {
    '|': {
        U:true,
        D:true,
        L: false,
         R:false
    },
    "-": {
        from: 'W',
        to: 'E'
    },
    "L": {
        from: 'N',
        to: 'E'
    },
    'J': {
        from: 'N',
        to: 'W'
    },
    '7': {
        from: 'W',
        to: 'S'
    },
    'F': {
        from: 'E',
        to: 'S'
    },
    '.': {
        from: '',
        to: ''
    },

}
const goLeft = (x, y, line) => {
    for (let i = x; i<line.length; i++){
        const {from, to} = directions[line[i]];

    }
}

const findLoop = ()=>{

}
