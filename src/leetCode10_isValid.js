var isValid = function(s) {
    // if (s.length % 2 !== 0) {
    //     return false;   
    // }

    // if (s.length < 2) {
    //     return false;
    // }
    
	// let savedStack = []
   
	// const checkNext = (index) => {
	// 	if (s[index] === undefined) {
	// 		return;
	// 	} 

    //     const closed = {
    //         ']': '[',
    //         '}': '{',   
    //         ')': '(',
    //     }
		
	// 	if (
	// 		s[index] === ']' ||
	// 		s[index] === '}' ||
	// 		s[index] === ')'
	// 	) {

    //         let isExisctsOpenSome = false;
    //         for (let i = 0; i < savedStack.length; ++i) {
    //             if (savedStack[i] === closed[s[index]]) {
    //                 isExisctsOpenSome = true;
    //                 break;
    //             }
    //         }

    //         if (isExisctsOpenSome === false) { 
    //             savedStack.push('x')
    //             return;
    //         }

	// 		if (savedStack[savedStack.length - 1] === closed[s[index]]) {
	// 			savedStack.splice(savedStack.length - 1, 1)
	// 		}
	// 	}
		
	// 	if (
	// 		s[index] === '[' ||
	// 		s[index] === '{' ||
	// 		s[index] === '('
	// 	) {
	// 		savedStack.push(s[index])
	// 	}
    //     checkNext(index + 1)
	// }

	// checkNext(0)
	
	// return savedStack.length === 0


 
    const stack = [];
    
    for (let i = 0 ; i < s.length ; i++) {
        let c = s.charAt(i);
        switch(c) {
            case '(': stack.push(')');
                break;
            case '[': stack.push(']');
                break;
            case '{': stack.push('}');
                break;
            default:
                if (c !== stack.pop()) {
                    return false;
                }
        }
    }
    
    return stack.length === 0;
};

// Input: s = "()[]{}"
// Output: true

//const s = "()[]{}";
//const s = "}";
const s = "[([)]]"
console.log(isValid(s)); // Expected output: true