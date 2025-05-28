
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 
 */ 
 class ListNode {
  constructor(val, next = null) {
    this.val = val;   // значение, хранимое в узле
    this.next = next; // ссылка на следующий узел
  }
}


var addTwoNumbers = (l1, l2) => {
    let r1 = ''
    let next1 = l1

    let r2 = ''
    let next2 = l2
    
    while (next1 || next2) {
        if (next1) {
            r1 += next1.val + ''
            next1 = next1.next
        }

        if (next2) {
            r2 += next2.val + ''
            next2 = next2.next
        }
    }

    r1 = r1.split('').reverse().join('')
    r2 = r2.split('').reverse().join('')

    let r1N = Number(r1)
    let r2N = Number(r2)

    if (r1.length > 15 || r2.length > 15) {
        r1N = BigInt(r1)
        r2N = BigInt(r2)
    }

    let r = r1N + r2N
    r = r.toString().split('').join('')

    let n = new ListNode(Number(r[0]))
    for (let i = 1; i < r.length; i++) {
        n = new ListNode(Number(r[i]), n)
    }

    return n
}


const arr1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
//const arr1 = [2,0,1]
//const arr2 = [5,6,4]
const arr2 = [1,0,1]

const createListNode = (arr) => {
    arr = arr.reverse()
    let n = new ListNode(arr[0])
    for (let i = 1; i < arr.length; i++) {
        n = new ListNode(arr[i], n)
    }
    return n
}

const l1 = createListNode(arr1)
console.log('l1', l1)

const l2 = createListNode(arr2) 
console.log('l2', l2)

console.log(addTwoNumbers(l1, l2))
