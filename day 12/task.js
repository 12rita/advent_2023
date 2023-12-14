import {dataInput, testInput} from "./input.js";

const example = `????????##?.#. 1,8,1`;

const data = testInput.split('\n');
// ..#.#..###...##. 1,1,3
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

const optimizedArrangementsCount = ({cache, pattern, patternIdx, group, groupIdx, currentGroup}) => {
    const key = `${patternIdx},${groupIdx},${currentGroup}`;
    if (key in cache) return cache[key];
    if (patternIdx === pattern.length) {
        if (groupIdx === group.length - 1 && currentGroup === 0) {
            return 1;
        }
        if (groupIdx === group.length && currentGroup === group[groupIdx]) {
            return 1;
        } else return 0;
    }
    let arrangementsCount = 0;
    if (pattern[patternIdx] === '#' || pattern[patternIdx] === '?') {
        arrangementsCount += optimizedArrangementsCount({
            cache,
            pattern,
            patternIdx: patternIdx + 1,
            group,
            groupIdx,
            currentGroup: currentGroup + 1
        })
        if (pattern[patternIdx] === '.' || pattern[patternIdx] === '?') {
            if (currentGroup === 0) {
                arrangementsCount += optimizedArrangementsCount({
                    cache,
                    pattern,
                    patternIdx: patternIdx + 1,
                    group,
                    groupIdx,
                    currentGroup: 0
                })
            } else if (currentGroup > 0 && currentGroup === group[groupIdx] && groupIdx < group.length) {
                arrangementsCount += optimizedArrangementsCount({
                    cache,
                    pattern,
                    patternIdx: patternIdx + 1,
                    group,
                    groupIdx: groupIdx + 1,
                    currentGroup: 0
                })
            }

        }

    }
    return (cache[key] = arrangementsCount);

}

const result1 = data.reduce((acc, el) => {
    // console.log(el,findArrangementsCount(el))
    const [pattern, groups] = el.split(' ');
    const newPattern = pattern + '?' + pattern + '?' + pattern + '?' + pattern + '?' + pattern;
    const newGroups = (groups + ',' + groups + ',' + groups + ',' + groups + ',' + groups).split(',').map((el) => Number(el));
    const arrangementsCount = optimizedArrangementsCount({
        cache: {},
        pattern: newPattern,
        patternIdx: 0,
        group: newGroups,
        groupIdx: 0,
        currentGroup: 0
    })
    // console.log({pattern, groups, arrangementsCount})
    return acc + arrangementsCount
}, 0)

//11870 too high
//7718 correct
console.log(result1)