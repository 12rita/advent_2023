import {dataInput, testInput} from "./input.js";



const [normTimes, normDistances] = dataInput.split('\n');
const [_, times] = normTimes.split(/:\s+/);
const timesArr = times.split(/\s+/).map((el) => Number(el));
const timeString = times.split(/\s+/).join('');
const [__, distances] = normDistances.split(/:\s+/)
const distancesArr = distances.split(/\s+/).map((el) => Number(el));
const distanceString = distances.split(/\s+/).join('');

const result1 = timesArr.reduce((acc,time, timeIdx) => {
    let counter = 0;
    for (let i=0; i< time; i++){
        if ((time-i)*i > distancesArr[timeIdx]){
            counter++
        }
    }
    return acc * counter
},1)

const getResult2 = (time, dist)=>{
    const root1 = Math.floor((time - Math.sqrt(time**2 - 4*dist))/2)
    const root2 = Math.floor((time + Math.sqrt(time**2 - 4*dist))/2)
    return root2 - root1

}
const result2 = getResult2(Number(timeString), Number(distanceString));
console.log({result1})
console.log({result2})
// console.log(testLines)
//28545090  too high
