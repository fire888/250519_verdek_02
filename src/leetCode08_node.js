//https://leetcode.com/problems/remove-nth-node-from-end-of-list/



 class ListNode {
  constructor(val, next = null) {
    this.val = val;   // значение, хранимое в узле
    this.next = next; // ссылка на следующий узел
  }
}




/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let currentNode = head 

    let arrList = [head]

    while (currentNode) {
        if (!currentNode.next) {
            currentNode = null
        } else {
            currentNode = currentNode.next
            arrList.push(currentNode) 
        }
    }

    if (arrList.length - n < 0) {
        return null 
    }

    if (arrList.length - n === 0 && arrList[1]) {
        return arrList[1]
    }

    if (arrList.length - n === 0 && !arrList[1]) {
        return null
    }

    if (arrList[arrList.length - n + 1]) {
        arrList[arrList.length - n - 1].next = arrList[arrList.length - n + 1]
    } else {
        arrList[arrList.length - n - 1].next = null 
    }

    if (!arrList[arrList.length - n - 1]) {
        return arrList[1]
    }

    return head
};

const head = [1,2], n = 2

let listN = null 
for (let i = head.length - 1; i > -1; --i) {
    const node = new ListNode(head[i], null)  
    if (listN) {
        node.next = listN
    }
    listN = node
}


console.log(removeNthFromEnd(listN, n))