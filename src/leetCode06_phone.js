https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

var letterCombinations = function(digits) {
    const phone = [
		'0', 
		'1', 
		['a','b','c'], 
		['d','e','f'], 
		['g','h','i'], 
		['j','k','l'], 
		['m','n','o'], 
		['p','q','r','s'], 
		['t','u','v'], 
		['w','x','y','z']
	]

    const d = digits.split('')
    const result = []

	// const fillWorld = (i, j) => {
	// 	result.push('' + )
	// }
    
	
	for (let i = 0; i < d.length; ++i) {
		let str = ''
		for (let j = 0; j < phone[d[i]].length; ++j) {
			
			for (let k = 0; k < d.length; ++k) {
				let str = ''
				for (let a = 0; a < phone[d[k]].length; ++a) {
					str += phone[d[k]][a]
				}
				console.log('!!----', str)
			}
			




			
			

			// for (let k = 0; k <= i; ++k) {
			// 	let str = ''
			// 	for (let a = 0; a <= j; ++a) {
			// 		str += phone[d[k]][a]
			// 	}
			// 	console.log(str)
			// 	result.push(str)
			// }

		}
	}


    
	
	//const str = ''
	
	//for (let i = 0; i < digits.length; ++i) {
	//	const digit = digits[i]
    //		const key = phone[digit]
	//	for (let j = 0; j < key.length; ++j) {
	//		
	//	}
	//}

    


    console.log('result', result)
    return result


};

const digits = '234'
console.log(letterCombinations(digits))


