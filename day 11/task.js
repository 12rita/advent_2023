import {dataInput, testInput} from "./input.js";

const data = dataInput.split('\n');

const EXPAND = 1000000;
const getDist = ({x1, y1, x2, y2}) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

const getDistWithEmpty = ({x1, y1, x2, y2, emptyRows, emptyColumns}) => {
    const insideColumn = emptyColumns.filter((column) => (column > x1 && column < x2) || (column > x2 && column < x1)).length;
    const insideRow = emptyRows.filter((row) => (row > y1 && row < y2) || (row > y2 && row < y1)).length;
    return Math.abs(x1 - x2) + (EXPAND - 1) * insideColumn + Math.abs(y1 - y2) + (EXPAND - 1) * insideRow;
}
const expandUniverse = (data) => {
    let expandedUniverse = [];

    data.forEach((row) => {
        expandedUniverse.push(row);
        if (row.split('').every((char) => char === '.')) {
            expandedUniverse.push(row);
        }
    })

    // console.log({expandedUniverse})
    let emptyColumns = [];

    for (let i = 0; i < expandedUniverse[0].length; i++) {
        // console.log(expandedUniverse[0].length)
        let foundGalaxy = false;
        for (let j = 0; j < expandedUniverse.length; j++) {
            if (expandedUniverse[j][i] !== '.') {
                foundGalaxy = true;
                break;
            }
        }
        if (!foundGalaxy) {
            emptyColumns.push(i);


        }
    }
    emptyColumns.forEach((column, idx) => {

        expandedUniverse = expandedUniverse.map((row) => {
            return row.slice(0, column + 1 + idx) + '.' + row.slice(column + idx + 1);
        })
    })


    return expandedUniverse
}

const getEmptyRowColumns = (data) => {
    let emptyRows = [];

    data.forEach((row, x) => {
        if (row.split('').every((char) => char === '.')) {
            emptyRows.push(x)
        }
    })

    // console.log({expandedUniverse})
    let emptyColumns = [];

    for (let i = 0; i < data[0].length; i++) {
        let foundGalaxy = false;
        for (let j = 0; j < data.length; j++) {
            if (data[j][i] !== '.') {
                foundGalaxy = true;
                break;
            }
        }
        if (!foundGalaxy) {
            emptyColumns.push(i);
        }
    }

    return {emptyRows, emptyColumns}
}

const findGalaxies = (universe) => {
    const galaxies = [];
    universe.forEach((row, y) => {
        row.split('').forEach((char, x) => {
            if (char !== '.') {
                galaxies.push({
                    name: galaxies.length + 1,
                    x,
                    y,
                    distances: []
                });
            }
        })
    })
    return galaxies
}
// const expandedUniverse = expandUniverse(data);
// console.log({expandedUniverse});
const galaxies = findGalaxies(data);
const findAllDist = (galaxies) => {
    const {emptyRows, emptyColumns} = getEmptyRowColumns(data);
    galaxies.forEach((galaxy, index) => {
        for (let i = index; i < galaxies.length - 1; i++) {
            const {x: x1, y: y1} = galaxy;
            const {x: x2, y: y2} = galaxies[i + 1];


            galaxy.distances.push(getDistWithEmpty({x1, y1, x2, y2, emptyRows, emptyColumns}));
            // console.log({x1,y1,x2,y2, galaxy});
        }
        // console.log({galaxy});
    })

}

findAllDist(galaxies)

// console.log({galaxies});

const result = galaxies.reduce((acc, galaxy) => {
    const sum = galaxy.distances.reduce((acc, dist) => acc + dist, 0);
    // console.log({galaxy,sum});
    return acc + sum
}, 0)
console.log(result);
//181058420056 too low
//613686987427