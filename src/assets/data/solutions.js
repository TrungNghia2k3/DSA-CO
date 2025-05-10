export const solutions =
    {
        two_sum: {
            "brute_force": {
                "cpp": `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 1. Iterate over every possible number pair
        for (int i = 0; i < nums.size(); i++) {
            // j is always ahead of i so we don’t repeat pairs
            for (int j = i + 1; j < nums.size(); j++) {
                // 2. Check if a given pair adds up to the target
                if (nums[i] + nums[j] == target) {
                    // Return the indices of the two numbers
                    return {i, j};
                }
            }
        }
        // If no pair is found, return an empty vector
        return {};
    }
};`,
                "java": `import java.util.HashMap;

class Solution {
  public static int[] twoSum(int[] nums, int target) {
      // 1. Iterate over every possible number pair
      for (int i = 0; i < nums.length; i++) {
          // j is always ahead of i so that we don't re-evaluate already evaluated sums
          for (int j = i + 1; j < nums.length; j++) {
              // 2. Check if a given pair adds up to our target
              if (nums[i] + nums[j] == target) {
                  // Return the indices when a pair has been found
                  return new int[]{i, j};
              }
          }
      }
      // Return an empty array if no pair is found
      return new int[]{};
  }
}`,
                "javascript": `var twoSum = function(nums, target) {
        // 1. Iterate over every possible number pair
        for (let i = 0; i < nums.length; i++) {
            // j is always ahead of i so that we don't re-evaluate already evaluated sums
            for (let j = i + 1; j < nums.length; j++) {
                // 2. Check if a given pair adds up to our target
                if (nums[i] + nums[j] == target) {
                    // Return the indices when a pair has been found
                    return [i, j];
                }
            }
        }
};`
            },
            "hash_table": {
                "cpp": `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Hash table to store number and its index
        unordered_map<int, int> numToIndex;

        // Iterate over the array
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            // Check if the complement exists in the map
            if (numToIndex.find(complement) != numToIndex.end()) {
                return {numToIndex[complement], i};
            }

            // Store the number and its index
            numToIndex[nums[i]] = i;
        }

        // If no solution found
        return {};
    }
};
`,
                "java": `import java.util.HashMap;

class Solution {
  public static int[] twoSum(int[] nums, int target) {
        // Our hash table that stores at which index the number is at
        HashMap<Integer, Integer> numToIndex = new HashMap<>();
        
        // 1. Iterate over every number in the array
        for (int i = 0; i < nums.length; i++) {
            // 2. Calculate the complement that would sum to our target
            int complement = target - nums[i];
            
            // 3. Check if that complement is in our hash table
            if (numToIndex.containsKey(complement)) {
                return new int[]{numToIndex.get(complement), i};
            }
            
            // 4. Add the current number to our hash table
            numToIndex.put(nums[i], i);
        }
        
        // If no solution found, return an empty array
        return new int[]{};
    }
}`,
                "javascript": `var twoSum = function(nums, target) {
        // Our hash table that stores at which index the number is at
        numToIndex = {}
    
        // 1. Iterate over every number in the array
        for (let i = 0; i < nums.length; i++) {
            // 2. Calculate the complement that would sum to our target
            complement = target - nums[i];
            
            // 3. Check if that complement is in our hash table
            if (numToIndex.hasOwnProperty(complement)) {
                return [numToIndex[complement], i];
            }
            
            // 4. Add the current number to our hash table
            numToIndex[nums[i]] = i;
        }
};`
            },
        },
        remove_element: {
            "brute_force": {
                "cpp": `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        vector<int> tmp;
        for (int num : nums) {
            if (num != val) {
                tmp.push_back(num);
            }
        }
        for (int i = 0; i < tmp.size(); i++) {
            nums[i] = tmp[i];
        }
        return tmp.size();
    }
};`,
                "java": `public class Solution {
    public int removeElement(int[] nums, int val) {
        List<Integer> tmp = new ArrayList<>();
        for (int num : nums) {
            if (num != val) {
                tmp.add(num);
            }
        }
        for (int i = 0; i < tmp.size(); i++) {
            nums[i] = tmp.get(i);
        }
        return tmp.size();
    }
}`,
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} val
     * @return {number}
     */
    removeElement(nums, val) {
        const tmp = [];
        for (const num of nums) {
            if (num !== val) {
                tmp.push(num);
            }
        }
        for (let i = 0; i < tmp.length; i++) {
            nums[i] = tmp[i];
        }
        return tmp.length;
    }
}`
            },
            "two_pointers_i": {
                "cpp": `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
};`,
                "java": `public class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
}`,
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} val
     * @return {number}
     */
    removeElement(nums, val) {
        let k = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] !== val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
}`
            },
            "two_pointers_ii": {
                "cpp": `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int i = 0, n = nums.size();
        while (i < n) {
            if (nums[i] == val) {
                nums[i] = nums[--n];
            } else {
                i++;
            }
        }
        return n;
    }
};`,
                "java": `public class Solution {
    public int removeElement(int[] nums, int val) {
        int i = 0, n = nums.length;
        while (i < n) {
            if (nums[i] == val) {
                nums[i] = nums[--n];
            } else {
                i++;
            }
        }
        return n;
    }
}`,
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} val
     * @return {number}
     */
    removeElement(nums, val) {
        let i = 0, n = nums.length;
        while (i < n) {
            if (nums[i] == val) {
                nums[i] = nums[--n];
            } else {
                i++;
            }
        }
        return n;
    }
}`
            }
        }
    }
