import {dataInput, testInput} from "./input.js";

const lines = dataInput.split('\n\n');
const testLines = testInput.split('\n\n');

const workArr = lines;
// console.log(testLines)

const seedLine = workArr.shift();
const [_, seedNumbers] = seedLine.split(': ');
const seeds = seedNumbers.split(' ').map(Number);
const seedRanges = []
seeds.forEach((seed, idx) => {
    if (idx % 2 === 0) {
        seedRanges.push({start: seed, end: seed + seeds[idx + 1] - 1})
    }
})

console.log({seedRanges})

//
// workArr.forEach(line => {
//     const [_, mapData] = line.split(':');
//     const convertion = mapData.split('\n');
//     convertion.shift();
//
//     seeds.forEach((seed, seedIdx) => {
//
//         convertion.forEach((row, idx) => {
//             const [dest, source, rangeLength] = row.split(' ');
//
//             if (seed >= Number(source) && seed <= (Number(source) + Number(rangeLength) - 1)) {
//                 seeds[seedIdx] = Number(dest) + (seed - Number(source));
//             }
//
//         })
//     })
//
// })


workArr.forEach(line => {
    const [_, mapData] = line.split(':');
    const convertion = mapData.split('\n');
    convertion.shift();

    for (let i = 0; i < seedRanges.length; i++) {
        const seedIdx = i;
        convertion.forEach((row) => {
            const seed = seedRanges[seedIdx];
            const {start, end, isVisited} = seed;
            const [dest, rangeStart, rangeLength] = row.split(' ');
            const rangeEnd = Number(rangeStart) + Number(rangeLength) - 1;
            const diff = Number(dest) - Number(rangeStart);
            if (!isVisited) {

                if (start >= Number(rangeStart) && end <= rangeEnd) {

                    seedRanges[seedIdx] = {
                        start: start + diff,
                        end: end + diff,
                        isVisited: true
                    };
                    // console.log({first: seedRanges})

                } else if (start <= Number(rangeStart) && end >= Number(rangeStart) && end <= rangeEnd) {

                    seedRanges[seedIdx] = {
                        start: Number(rangeStart) + diff,
                        end: end + diff,
                        isVisited: true
                    };
                    seedRanges.push({start, end: Number(rangeStart) - 1})
                } else if (start >= Number(rangeStart) && start <= rangeEnd && end >= rangeEnd) {

                    seedRanges[seedIdx] = {
                        start: start + diff,
                        end: Number(rangeEnd) + diff,
                        isVisited: true
                    };
                    seedRanges.push({start: Number(rangeEnd) + 1, end})
                } else if (start <= Number(rangeStart) && end >= rangeEnd) {

                    seedRanges[seedIdx] = {
                        start: Number(rangeStart) + diff,
                        end: Number(rangeEnd) + diff,
                        isVisited: true
                    };
                    seedRanges.push({start, end: Number(rangeStart) - 1})
                    seedRanges.push({start: Number(rangeEnd) + 1, end})
                }
            }
        })

        seedRanges.forEach((seed, idx) => {
            seedRanges[idx].isVisited = false;
        })


    }

})

const result1 = Math.min(...seeds);
const result2 = seedRanges.reduce((acc, seed) => {
    if (seed.start < acc.start) return seed;
    return acc;
})?.start;

console.log({result2})
//4088867119 too high
//265018614 correct

//2338934 too low
//63179500 correct

// console.log({result1})