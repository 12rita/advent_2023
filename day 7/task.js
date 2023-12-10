import {dataInput, testInput} from "./input.js";


const parseInput = (input)=>{
   return  input.split('\n').map(
        (line) => {
            const [hand, bid] = line.split(' ');
            return {hand, bid, type: checkType(hand)}
        }
    );
}

const hierarchy = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const checkType = (hand) => {
    const kinds = {};
    hand.split('').forEach((letter) => {
        if (kinds[letter]) {
            kinds[letter]++
        } else {
            kinds[letter] = 1;
        }
    })
    if (Object.keys(kinds).includes('J')) {
        // get key of max value in kinds
        const JValue = kinds['J'];
        delete kinds['J'];
        if (!Object.keys(kinds).length) {
            return 7
        }
        const maxKey = Object.keys(kinds).reduce((acc, key) => kinds[acc] > kinds[key] ? acc : key);
        // console.log({maxKey, kinds})
        kinds[maxKey] = kinds[maxKey] + JValue;


    }

    if (Object.keys(kinds).length === 1) {
        return 7
    } else if (Object.values(kinds).includes(4)) {
        return 6
    } else if (Object.values(kinds).includes(3) && Object.values(kinds).includes(2)) {
        return 5
    } else if (Object.values(kinds).includes(3)) {
        return 4
    } else if (Object.values(kinds).reduce((acc, val) => {
        if (val === 2) return acc + 1;
        else return acc
    }, 0) === 2) {
        return 3
    } else if (Object.values(kinds).reduce((acc, val) => {
        if (val === 2) return acc + 1;
        else return acc
    }, 0) === 1) {
        return 2
    } else return 1
}


const lines =parseInput(dataInput)

const testLines = parseInput(testInput)
// console.log({testLines})

const workingArr = lines;
workingArr.sort((a, b) => {

        let aRank = a.type;
        let bRank = b.type;
        // console.log({aRank, bRank, handA, handB})
        if (aRank !== bRank)
            return aRank - bRank
        else {
            for (let i = 0; i < a.hand.length; i++) {
                const aHigh = hierarchy.indexOf(a.hand[i]);
                const bHigh = hierarchy.indexOf(b.hand[i]);
                if (aHigh !== bHigh) {
                    return aHigh - bHigh;
                }
            }
            // console.log({handA, handB})
            return 0;
        }
    }
)

// console.log(workingArr)

const result1 = workingArr.reduce((acc, val, idx, array) => {
    // const [_, bid] = val.split(' ');
    const rank = idx === 0 ?
        1 :
        val.hand === array[idx - 1].hand ?
            acc.rank :
            acc.rank + 1;
    // console.log(val.hand, val.bid, rank, array[idx - 1]?.hand)
    return {rank, value: Number(val.bid) * rank + acc.value}
}, {rank: 0, value: 0})
console.log(result1)


const result2 = workingArr.reduce((acc, val, idx) => {
    return Number(val.bid) * (idx + 1) + acc
}, 0)
// console.log(result2)
//248535797 too high
//248469879 too high
//248204757 too high
//248284613 too high
//247836839 ??
//247815719 correct