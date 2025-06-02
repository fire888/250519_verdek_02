//https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

//https://leetcode.com/problems/letter-combinations-of-a-phone-number/solutions/6756396/easy-to-understand-beats-100-js/

// var letterCombinations = function(digits) {
//     const PHONE_KEYS = [
// 		'0', 
// 		'1', 
// 		['a','b','c'], 
// 		['d','e','f'], 
// 		['g','h','i'], 
// 		['j','k','l'], 
// 		['m','n','o'], 
// 		['p','q','r','s'], 
// 		['t','u','v'], 
// 		['w','x','y','z']
// 	]




//     const d = digits.split('')
    
// 	const kits = []

// 	const currentIndicies = []
// 	for (let i = 0; i < digits.length; ++i) {
// 		currentIndicies.push(0)
// 	}

// 	const insertN = (arr, indx1) => {
// 		console.log(arr, indx1)
// 		if (d[indx1] === undefined) {
// 			console.log('RETURN 1', indx1, arr)
// 			return;			
// 		}

// 		for (let i = 0; i < PHONE_KEYS[d[indx1]].length; ++i) {
// 			const newArr = [...arr]
// 			newArr[indx1] = i
// 			kits.push[newArr]
// 			//insertN(copyNewArr, indx1)
// 		}

// 		indx1 += 1

// 		insertN(arr, indx1)
// 	}

// 	insertN(currentIndicies, 0, 0)

	
// 	// for (let i = 0; i < d.length; ++i) {
// 	// 	const copy = [...currentIndicies]
// 	// 	for (let j = 0; j < phone[d[i]].length; ++j) {
// 	// 		copy[i] = j
						
// 	// 		kits.push([...copy])
// 	// 		//const singleKit = [...currentIndicies]
// 	// 	}
// 	// }

// 	console.log('kits', kits)


//     console.log('result', result)
//     return result


// };


var letterCombinations = function(digits) {
    const n = digits.length;
    let result = [], letters = ["X", "XX", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    if (n == 0) return result;
	
    function dfs(i, current) {
		console.log(i, current)

        if (i >= n) {
            result.push(current);
			console.log('!--------', i, current)
            return;
        }
		//console.log('digits[i]', String(digits[i]))
        //for (let c of letters[digits[i]]) {
		//	let newStr = current + c
         //   dfs(i + 1, newStr);
		//	console.log('#####################')
        //}

		for (let j = 0; j < letters[digits[i]].length; ++j) {
			let newStr = current + letters[digits[i]][j]
			dfs(i + 1, newStr);
		}
    }

    dfs(0, "");
    return result;
};

const digits = '234'
console.log(letterCombinations(digits))


