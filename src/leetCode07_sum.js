// https://leetcode.com/problems/4sum/description/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const result = []

    nums = nums.sort((a, b) => a - b)

    if (nums.length < 4) {
        return result
    }

    if (nums.length === 4) {
        if (nums[0] + nums[1] + nums[2] + nums[3] === target) { 
            result.push(nums)
            return result
        }
    }

    const checkIsExists = (results, newAnswer) => { 
        for (let i = 0; i < results.length; ++i) {
            let isCompared = true
            const existArr = results[i]
            for (let j = 0; j < existArr.length; ++j) {
                if (existArr[j] !== newAnswer[j]) {
                    isCompared = false
                }
            }
            if (isCompared) {
                return true
            }
        }
        return false
    }


     for (let i = 0; i < nums.length - 3; ++i) {
        for (let j = i + 1; j < nums.length - 2; ++j) {
           let left = j + 1
           let right = nums.length - 1
           
           while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right]

                if (sum === target) {
                    const newAnswer = [nums[i], nums[j], nums[left], nums[right]]

                    if (checkIsExists(result, newAnswer)) {
                        ++left
                        continue
                    }

                    result.push([nums[i], nums[j], nums[left], nums[right]])
                    
                    while (left < right && nums[left] == nums[left+1]) {
                        left++;
                    }

                    while (left < right && nums[right] == nums[right-1]) {
                        right--;
                    }
                    
                    
                    ++left
                    right--
                }
                
                if (sum < target) {
                    ++left
                }

                if (sum > target) {
                    --right
                }
           }
        }
    }

    return result
}

const nums = [-3,-2,-1,0,0,1,2,3]
console.log(fourSum(nums, 0))

//Input: nums = [1,0,-1,0,-2,2], target = 0
//Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]