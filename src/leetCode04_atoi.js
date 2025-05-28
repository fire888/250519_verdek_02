var myAtoi = function(s) {
    s = s.trim() 
    s = s.replaceAll(' ', 'a')
    let str = ''

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '-' || s[i] === '+') {
            continue;
        }

        if (+s[i] >= 0 && +s[i] <= 9) {

            if (s[i - 1] && s[i - 1] === '-' ) {
               str += '-'
               if (
                    s[i - 2] && s[i - 2] === '+' || 
                    s[i - 2] && s[i - 2] === '-'
                ) {
                    return 0
               }
            }

            if (s[i - 1] && s[i - 1] === '+' ) {
               if (
                    s[i - 2] && s[i - 2] === '+' ||
                    s[i - 2] && s[i - 2] === '-' 
                ) {
                    return 0
               }
            }

            str += s[i]

            let isNextNum = false
            if (
                s[i + 1] &&
                +s[i + 1] >= 0 &&
                +s[i + 1] <= 9
            ) {
                isNextNum = true
            }
            if (!isNextNum) {
                const MIN = -Math.pow(2, 31)
                const MAX = Math.pow(2, 31) - 1

                if (+str > MAX) {
                    return MAX
                }
                if (+str < MIN) {
                    return MIN
                }

                return +str
            }
        } else {
            return 0
        }
    }  

    return 0
}

const str = ' -42 a44 aaa'
console.log(str)
console.log(myAtoi(str))