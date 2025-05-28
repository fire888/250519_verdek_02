/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let pres = x < 0 ? '-' : ''

    const result = []
    const str = x + ''
    for (let j = str.length - 1; j >  -1; j--) {
        result.push(str[j])
    }
    const rr = result.join('')
    // let str = (x + '').()

    return pres + rr
};

const aa = 123
console.log(reverse(123))