/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function(nums, target) {
//     // const arr = []

//     // for (let i = 0; i < nums.length - 1; ++i) {
//     //     for (let j = i + 1; j < nums.length; ++j) {
//     //         if (nums[i] + nums[j] === target) {
//     //             arr.push([i, j])
//     //         }
//     //     }
//     // }

//     // return arr
    
// };

var twoSum = function(nums, target) {
    let numToIndex = {}
    for (let i = 0; i < nums.length; i++) {
        const compliment = target - nums[i]
        if (compliment in numToIndex) {
            return [numToIndex[compliment], i]
        }
        numToIndex[nums[i]] = i
        console.log('compliment', compliment)
        console.log('numToIndex', numToIndex)
    }
    return []
};

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
const arr = [2,7,11,15]
const target = 9

console.log(twoSum(arr, target))
