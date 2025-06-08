 // https://leetcode.com/problems/merge-two-sorted-lists/
 
 class ListNode {
  constructor(val, next = null) {
    this.val = val;   // значение, хранимое в узле
    this.next = next; // ссылка на следующий узел
  }
}

const createListNode = (arr) => {
    arr = arr.reverse()
    let n = new ListNode(arr[0])
    for (let i = 1; i < arr.length; i++) {
        n = new ListNode(arr[i], n)
    }
    return n
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    const listToArray = (l) => {
        const arr = [l]

        let nextNode = l
        while (nextNode) {
            arr.push(nextNode)
            if (nextNode.next) {
                nextNode = nextNode.next
            } else {
                nextNode = null
            }
        }

        return arr
    }
    
    const arr1 = listToArray(list1);
    const arr2 = listToArray(list2);

    if (arr1.length === 0 && arr2.length === 0) {
        return null;
    }

    if (arr1.length === 0) {
        return arr2[0];
    }

    if (arr2.length === 0) {
        return arr1[0];
    }

    const merged = [...arr1, ...arr2].sort((a, b) => a.val - b.val);

    for (let i = 0; i < merged.length; ++i) {
        merged[i].next = merged[i + 1] || null;
    }

    return merged[0];
};



// const arr1 = [1,2,4];
// const arr2 = [1,3,4];

const arr1 = [];
const arr2 = [];

const list1 = createListNode(arr1);
const list2 = createListNode(arr2);

console.log(mergeTwoLists(list1, list2));

// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]