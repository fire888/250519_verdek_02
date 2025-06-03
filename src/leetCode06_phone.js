//https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

//const { add } = require("three/tsl");

//https://leetcode.com/problems/letter-combinations-of-a-phone-number/solutions/6756396/easy-to-understand-beats-100-js/

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (digits.length === 0) {
        return []
    }

    const PHONE_KEYS = ['X', 'XX', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

    const results = []
    const d = digits.split('')

    const addLetter = (inx, str) => {
        console.log(inx, str)
        
        if (d[inx] === undefined) {
            results.push(str)
            return
        }

        for (let i = 0; i < PHONE_KEYS[d[inx]].length; ++i) {
            const s = str + PHONE_KEYS[d[inx]][i]
            addLetter(inx + 1, s)
        }
    }

    addLetter(0, '')

    return results
}

const d = '234'
console.log(letterCombinations(d))