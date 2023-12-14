import {dataInput, testInput} from "./input.js";


const data = dataInput.split('\n\n');


const findHorizontalReflection = (input) => {
    let reflectionIdx = null;

    let smudges = 0;

    for (let i = 0; i < input.length; i++) {
        // console.log({i})
        for (let j = i+1; j < input.length; j++) {

            reflectionIdx = i;
            const step = j - i;

            if (input[j] !== input[i - step + 1]) {
                if (input[i - step + 1]) {
                    for (let k = 0; k <= input[j].length; k++) {
                        if (input[j][k] !== input[i - step + 1][k]) {
                            smudges++;
                        }
                    }
                    if (smudges > 1) {
                        reflectionIdx = null;
                        smudges = 0;
                        break;
                    }
                }
            }
            if (reflectionIdx !== null) {
                // console.log({prev: i-step+1, val: input[i-step+1]})
                if (smudges === 1) {
                    if (i - step + 1 <= 0) {
                        return {count: reflectionIdx + 1};
                    }
                    if (j === input.length - 1) {
                        return {count: reflectionIdx + 1};
                    }
                }

            }


        }
        // console.log({reflectionIdx})
        // if (reflectionIdx !== null) {
        //     const step = i - reflectionIdx;
        //
        //     // console.log({reflectionIdx, curr: input[i], prev: input[reflectionIdx - step + 1]})
        //     if (reflectionIdx - step + 1 < 0) {
        //         break;
        //     }
        //     if (input[i] !== input[reflectionIdx - step + 1]) {
        //         reflectionIdx = null;
        //     }
        // }
        // else {
        //     console.log({curr: input[i], next: input[i + 1]})
        //     if (input[i] === input[i + 1]) {
        //         reflectionIdx = i;
        //     }
        // }


    }
    return false;
}

const transpose = (input) => {
    const transposed = [];
    const n = input[0].length;
    const m = input.length;
    // console.log({n, m, 0: input[0]})
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < m; j++) {
            // console.log({i, j, val: input[j][i]})
            row += input[j][i];
        }
        transposed.push(row);
    }
    return transposed;
}
const findReflections = () => {
    const result = data.reduce((acc, el, i) => {
        const input = el.split('\n');
        const transposed = transpose(input);
        // console.log({el});
        // console.log({transposed})
        const vertical = findHorizontalReflection(transposed);
        console.log({vertical})
        const horizontal = findHorizontalReflection(input);
        console.log({horizontal})
        if (vertical)
            return acc += vertical.count;
        if (horizontal)
            return acc += horizontal.count * 100;

        // console.log(el)
        return acc;
        // const currNum = vertical.count >= horizontal.count ? vertical.reflectionIdx : horizontal.reflectionIdx * 100;
        // return acc + currNum;
    }, 0)
    console.log({result})
    return result
}

findReflections();

//41697  too high
//40006 correct
// 31494 too low
//31005 too low
//11306 too low