/**
 * @param {string} s
 * @return {string}
 */

console.log('HHH')
var longestPalindrome = function(s) {

    const results = []

    nextStartLetter: for (let i = 0; i < s.length; ++i) {
        nextEndLetter: for (let j = s.length - 1; j > i; --j) {
            if (s[i] === s[j]) {

                const ind1 = i
                const ind2 = j

                let l = Math.ceil((ind2 - ind1) / 2)

                for (let n = 0; n < l; ++n) {
                    if (s[ind1 + n] !== s[ind2 - n]) {
                        continue nextEndLetter
                    }
                }

                results.push(s.slice(ind1, ind2 + 1)) 
                continue nextStartLetter
            }     
        }
    }

    if (results.length > 0) {
        const sorted = results.sort((a, b) => b.length - a.length)
        return sorted[0]
    }

    return s[0] || ''
};


//const str = 'abcdeedca'
const str = 'a'
//const str = 'aacabdkacaa'
console.log(str)
console.log(longestPalindrome(str))