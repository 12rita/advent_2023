import {dataInput, testInput} from "./input.js";


const data = dataInput.split('\n');
// ..#.#..###...##. 1,1,3
const cache = {};

const memoize = (
    func
) => {
    const stored = {};

    return (...args) => {
        const k = JSON.stringify(args);
        if (stored[k]) {
            return stored[k];
        }
        const result = func(...args);
        stored[k] = result;
        return result;
    };
}
const findArrangementsCount = (input) => {
    const [pattern, groups] = input.split(' ');

    if (!checkValidBeforeQM(pattern, groups))
        return 0;
    // console.log({pattern, groups, valid: checkValidBeforeQM(pattern, groups)})
    if (!pattern.includes('?')) {
        const numberGroups = groups.split(',').map((el) => Number(el));
        const equality = pattern.split('.').filter((el) => el !== '').every((el, i) => {
            return el.length === numberGroups[i];
        });
        if (equality) return 1;
        else return 0;
    }

    const firstQM = pattern.indexOf('?');
    const dashed = pattern.substring(0, firstQM) + '#' + pattern.substring(firstQM + 1);
    const dotted = pattern.substring(0, firstQM) + '.' + pattern.substring(firstQM + 1);
    return findArrangementsCount(dashed + ' ' + groups) + findArrangementsCount(dotted + ' ' + groups);

}


const checkValidBeforeQM = (pattern, groups) => {
    const numberGroups = groups.split(',').map((el) => Number(el));
    const partBeforeQM = pattern.split('?')[0];
    const dashes = partBeforeQM.split('.').filter((el) => el !== '');
    const nextSighQM = partBeforeQM.lastIndexOf('#') === partBeforeQM.length - 1;

    // console.log({dashes, nextSighQM, partBeforeQM, pattern, groups})
    if (!pattern.includes('?') && dashes.length !== numberGroups.length) return false;
    if (dashes.length > numberGroups.length) return false;
    for (let i = 0; i < dashes.length; i++) {
        // console.log({i, dashes: dashes[i].length, numberGroups: numberGroups[i]})
        if (i === dashes.length - 1) {
            if (dashes[i].length > numberGroups[i])
                return false;
            else if (dashes[i].length === numberGroups[i]) {
                return true
            } else return nextSighQM

            // return nextSighQM && dashes[i].length < numberGroups[i]
        }
        if (dashes[i].length !== numberGroups[i])
            return false;
    }
    // console.log('true')
    return true;


}

const optimizedArrangementsCount = memoize((pattern, groups) => {
    // const key = `${patternIdx},${groupIdx},${currentGroup}`;
    // const [pattern, groups] = line.split(' ');
    // console.log({pattern, groups});
    if (cache[pattern + groups.join('')]) {
        return cache[pattern + groups.join('')];
    }
    const numberGroups = groups;

    if (pattern.length === 0) {
        if (numberGroups.length === 0) {
            return 1;
        }
        return 0;
    }
    if (numberGroups.length === 0) {
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === "#") {
                return 0;
            }
        }
        return 1;
    }

    const sum = numberGroups.reduce((acc, el) => acc + el, 0);

    if (pattern.length < sum + numberGroups.length - 1) {
        // The line is not long enough for all runs
        return 0;
    }

    if (pattern[0] === ".") {
        return cache[pattern.slice(1) + [...numberGroups].join('')] = optimizedArrangementsCount(pattern.slice(1), [...numberGroups]);
    }
    if (pattern[0] === "#") {
        const currGroup = numberGroups.shift();
        for (let i = 0; i < currGroup; i++) {
            if (pattern[i] === ".") {
                return 0;
            }
        }
        if (pattern[currGroup] === "#") {
            return 0;
        }

        return cache[pattern.slice(currGroup + 1) + [...numberGroups].join('')] = optimizedArrangementsCount(pattern.slice(currGroup + 1), [...numberGroups]);
    }

    return (
        (cache["#" + pattern.slice(1) + [...numberGroups].join('')] = optimizedArrangementsCount("#" + pattern.slice(1), [...numberGroups])) + (cache["." + pattern.slice(1) + [...numberGroups].join('')] = optimizedArrangementsCount("." + pattern.slice(1), [...numberGroups]))
    );

})

const result1 = data.reduce((acc, el, i) => {
    // console.log(el,findArrangementsCount(el))
    const [pattern, groups] = el.split(' ');
    const newPattern = pattern + '?' + pattern + '?' + pattern + '?' + pattern + '?' + pattern;
    const newGroups = (groups + ',' + groups + ',' + groups + ',' + groups + ',' + groups).split(',').map((el) => Number(el));
    // console.log({newPattern, newGroups})
    const arrangementsCount = optimizedArrangementsCount(newPattern, newGroups)
    console.log({arrangementsCount, i})
    return acc + arrangementsCount
}, 0)

//11870 too high
//7718 correct
//128741994134728
console.log(result1)