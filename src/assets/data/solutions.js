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
        },
        merge_two_sorted_lists: {
            "recursive_merge": {
                "cpp": `// C++ program to merge two sorted linked
// lists recursively
#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int x) {
        data = x;
        next = nullptr;
    }
};

// Function to merge two sorted linked lists recursively
Node* sortedMerge(Node* head1, Node* head2) {

    // Base cases
    if (head1 == nullptr) 
        return head2;
    if (head2 == nullptr) 
        return head1;

    // Recursive merging based on smaller value
    if (head1->data <= head2->data) {
        head1->next = sortedMerge(head1->next, head2);
        return head1;
    } else {
        head2->next = sortedMerge(head1, head2->next);
        return head2;
    }
}

// Function to print the linked list
void printList(Node* curr) {
    while (curr != nullptr) {
        cout << curr->data;
        if (curr->next != nullptr)
            cout << " ";
        curr = curr->next;
    }
    cout << endl;
}

int main() {
  
    // First linked list: 5 -> 10 -> 15
    Node* head1 = new Node(5);
    head1->next = new Node(10);
    head1->next->next = new Node(15);

    // Second linked list: 2 -> 3 -> 20
    Node* head2 = new Node(2);
    head2->next = new Node(3);
    head2->next->next = new Node(20);

    Node* res = sortedMerge(head1, head2);
    printList(res);

    return 0;
}`,
                "java": `// Java program to merge two sorted linked
// lists recursively
class Node {
    int data;
    Node next;

    Node(int x) {
        data = x;
        next = null;
    }
}

class GfG {

    // Function to merge two sorted linked lists recursively
    static Node sortedMerge(Node head1, Node head2) {

        // Base cases
        if (head1 == null)
            return head2;
        if (head2 == null)
            return head1;

        // Recursive merging based on smaller value
        if (head1.data <= head2.data) {
            head1.next = sortedMerge(head1.next, head2);
            return head1;
        }
        else {
            head2.next = sortedMerge(head1, head2.next);
            return head2;
        }
    }

    static void printList(Node curr) {
        while (curr != null) {
            System.out.print(curr.data);
            if (curr.next != null)
                System.out.print(" ");
            curr = curr.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {

        // First linked list: 5 -> 10 -> 15
        Node head1 = new Node(5);
        head1.next = new Node(10);
        head1.next.next = new Node(15);

        // Second linked list: 2 -> 3 -> 20
        Node head2 = new Node(2);
        head2.next = new Node(3);
        head2.next.next = new Node(20);

        Node res = sortedMerge(head1, head2);
        printList(res);
    }
}`,
                "javascript": `// Javascript program to merge two sorted
// linked lists recursively
class Node {
    constructor(x) {
        this.data = x;
        this.next = null;
    }
}

// Function to merge two sorted linked lists recursively
function sortedMerge(head1, head2)  {

    // Base cases
    if (head1 === null)
        return head2;
    if (head2 === null)
        return head1;

    // Recursive merging based on smaller value
    if (head1.data <= head2.data) {
        head1.next = sortedMerge(head1.next, head2);
        return head1;
    }
    else {
        head2.next = sortedMerge(head1, head2.next);
        return head2;
    }
}

function printList(curr) {
    let result = "";
    while (curr !== null) {
        result += curr.data.toString();
        if (curr.next !== null) {
            result += " ";
        }
        curr = curr.next;
    }
    console.log(result);
}

// First linked list: 5 -> 10 -> 15
let head1 = new Node(5);
head1.next = new Node(10);
head1.next.next = new Node(15);

// Second linked list: 2 -> 3 -> 20
let head2 = new Node(2);
head2.next = new Node(3);
head2.next.next = new Node(20);

let res = sortedMerge(head1, head2);
printList(res);`
            },
            "iterative_merge": {
                "cpp": `// C++ program to merge two sorted linked
// lists iteratively
#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int x) {
        data = x;
        next = nullptr;
    }
};

// Function to merge two sorted linked
// lists iteratively
Node* sortedMerge(Node* head1, Node* head2) {
  
    // Create a dummy node to simplify 
    // the merging process
    Node* dummy = new Node(-1);
    Node* curr = dummy;

    // Iterate through both linked lists
    while (head1 != nullptr && head2 != nullptr) {
      
        // Add the smaller node to the merged list
        if (head1->data <= head2->data) {
            curr->next = head1;
            head1 = head1->next;
        } else {
            curr->next = head2;
            head2 = head2->next;
        }
        curr = curr->next;
    }

    // If any list is left, append it to
    // the merged list
    if (head1 != nullptr) {
        curr->next = head1;
    } else {
        curr->next = head2;
    }

    // Return the merged list starting
    // from the next of dummy node
    return dummy->next;
}

void printList(Node* head) {
  
    while (head != nullptr) {
        cout << head->data;
        if (head->next != nullptr)
            cout << " ";
        head = head->next;
    }
    cout << endl;
}

int main() {
  
    // First linked list: 5 -> 10 -> 15 -> 40
    Node* head1 = new Node(5);
    head1->next = new Node(10);
    head1->next->next = new Node(15);
    head1->next->next->next = new Node(40);

    // Second linked list: 2 -> 3 -> 20
    Node* head2 = new Node(2);
    head2->next = new Node(3);
    head2->next->next = new Node(20);

    Node* res = sortedMerge(head1, head2);
    printList(res);

    return 0;
}`,
                "java": `// Java program to merge two sorted linked 
// lists iteratively
class Node {
    int data;
    Node next;

    Node(int x) {
        data = x;
        next = null;
    }
}

class GfG {

    // Function to merge two sorted linked 
    // lists iteratively
    static Node sortedMerge(Node head1,
                                       Node head2) {

        // Create a dummy node to simplify 
        // the merging process
        Node dummy = new Node(-1);
        Node curr = dummy;

        // Iterate through both linked lists
        while (head1 != null && head2 != null) {
          
            // Add the smaller node to the merged list
            if (head1.data <= head2.data) {
                curr.next = head1;
                head1 = head1.next;
            } else {
                curr.next = head2;
                head2 = head2.next;
            }
            curr = curr.next;
        }

        // If any list is left, append it to 
        // the merged list
        if (head1 != null) {
            curr.next = head1;
        } else {
            curr.next = head2;
        }

        // Return the merged list starting from 
        // the next of dummy node
        return dummy.next;
    }

    static void printList(Node head) {
        while (head != null) {
            System.out.print(head.data);
            if (head.next != null)
                System.out.print(" ");
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {

        // First linked list: 5 -> 10 -> 15 -> 40
        Node head1 = new Node(5);
        head1.next = new Node(10);
        head1.next.next = new Node(15);
        head1.next.next.next = new Node(40);

        // Second linked list: 2 -> 3 -> 20
        Node head2 = new Node(2);
        head2.next = new Node(3);
        head2.next.next = new Node(20);

        Node res = sortedMerge(head1, head2);
        printList(res);
    }
}`,
                "javascript": `// JavaScript program to merge two sorted
// linked lists iteratively
class Node {
    constructor(x) {
        this.data = x;
        this.next = null;
    }
}

// Function to merge two sorted linked lists iteratively
function sortedMerge(head1, head2) {

    // Create a dummy node to simplify the merging process
    let dummy = new Node(-1);
    let curr = dummy;

    // Iterate through both linked lists
    while (head1 !== null && head2 !== null) {

        // Add the smaller node to the merged list
        if (head1.data <= head2.data) {
            curr.next = head1;
            head1 = head1.next;
        }
        else {
            curr.next = head2;
            head2 = head2.next;
        }
        curr = curr.next;
    }

    // If any list is left, append it
    // to the merged list
    if (head1 !== null) {
        curr.next = head1;
    }
    else {
        curr.next = head2;
    }

    // Return the merged list starting from
    // the next of dummy node
    return dummy.next;
}

function printList(head) {
    let result = "";
    while (head !== null) {
        result += head.data;
        if (head.next !== null) {
            result += " ";
        }
        head = head.next;
    }
    console.log(result);
}

// driver code
// First linked list: 5 -> 10 -> 15 -> 40
let head1 = new Node(5);
head1.next = new Node(10);
head1.next.next = new Node(15);
head1.next.next.next = new Node(40);

// Second linked list: 2 -> 3 -> 20
let head2 = new Node(2);
head2.next = new Node(3);
head2.next.next = new Node(20);

let res = sortedMerge(head1, head2);
printList(res);`
            }
        },
        valid_parentheses: {
            "stack": {
                "javascript": `// Javascript program to check if parentheses are balanced
function isValid(s) {

    // Declare a stack to store the opening brackets
    let st = [];
    for (let i = 0; i < s.length; i++) {
    
        // Check if the character is an opening bracket
        if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
            st.push(s[i]);
        } else {
        
            // If it's a closing bracket, check if the stack is non-empty
            // and if the top of the stack is a matching opening bracket
            if (st.length > 0 &&
                ((st[st.length - 1] === '(' && s[i] === ')') ||
                 (st[st.length - 1] === '{' && s[i] === '}') ||
                 (st[st.length - 1] === '[' && s[i] === ']'))) {

                // Pop the matching opening bracket
                st.pop(); 
            } else {
 
                // Unmatched closing bracket
                return false; 
            }
        }
    }
    
    // If stack is empty, return true, otherwise false
    return st.length === 0;
}`
            }
        },
        backspace_string_compare: {
            "stack": {
                "javascript": `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
    const stack_s = [];
    const stack_t = [];

    // handling string s
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '#') {
            stack_s.pop();
        } else {
            stack_s.push(s[i]);
        }
    }

    // handling string t
    for (let i = 0; i < t.length; i++) {
        if (t[i] === '#') {
            stack_t.pop();
        } else {
            stack_t.push(t[i]);
        }
    }

    // Compare 2 stacks if the elements are the same then return true, otherwise return false
    if (stack_s.length !== stack_t.length) return false;

    for (let i = 0; i < stack_s.length; i++) {
        if (stack_s[i] !== stack_t[i]) return false;
    }

    return true;
};`
            },
            "two_pointers": {
                "javascript": `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
    let i = s.length - 1; // index of string s
    let j = t.length - 1; // index of string t

    // Iterate from the end of strings s and t, because two strings are considered equal 
    // when their last elements are equal and we need to skip the characters deleted by the '#' character
    while (i >= 0 || j >= 0) {
        // Find the next valid character in string s, if we encounter a '#', we skip the previous character
        let skipS = 0;
        while (i >= 0 && (s[i] === '#' || skipS > 0)) {
            if (s[i] === '#') {
                skipS++;
            } else {
                skipS--;
            }
            i--;
        }

        // Find the next valid character in string t, if we encounter a '#', we skip the previous character  
        let skipT = 0;
        while (j >= 0 && (t[j] === '#' || skipT > 0)) {
            if (t[j] === '#') {
                skipT++;
            } else {
                skipT--;
            }
            j--;
        }

        // Compare valid characters of strings s and t
        // If they are not equal, return false
        if (i >= 0 && j >= 0 && s[i] !== t[j]) return false;
        
        // If one string is finished but the other isn't, return false
        if ((i >= 0) !== (j >= 0)) return false;

        i--;
        j--;
    }

    return true;
};`
            }
        },
        baseball_game: {
            "stack": {
                "javascript": `/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function (operations) {
    let sum = 0;
    const stack = [];

    for (const operation of operations) {
        if (operation === 'C') {
            // Cancel: Remove the last score and subtract from sum
            sum -= stack.pop();
            continue;
        }

        if (operation === 'D') {
            // Double: Double the last score, add to stack and sum
            const val = stack[stack.length - 1] * 2;
            stack.push(val);
            sum += val;
            continue;
        }

        if (operation === '+') {
            // Add: Sum of last two scores, add to stack and sum
            const val = stack[stack.length - 1] + stack[stack.length - 2];
            stack.push(val);
            sum += val;
            continue;
        }

        // It's a number: Add to stack and sum
        stack.push(+operation);
        sum += +operation;
    }

    return sum;
};`
            }
        },
        first_unique_character_in_a_string: {
            "queue_frequency": {
                "javascript": `/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
    const MAX_CHAR = 26; // the number of lowercase letters in the English alphabet
    const count = new Array(MAX_CHAR).fill(0); // count character frequency
    const queue = []; // queue to store [character, index]

    // Iterate through string s
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);

        count[idx]++;

        // Add [character, index] to queue
        queue.push([ch, i]);

        // Remove elements from the front of the queue if they have been repeated
        while (queue.length > 0) {
            const [frontChar] = queue[0];
            const frontIdx = frontChar.charCodeAt(0) - 'a'.charCodeAt(0);
            if (count[frontIdx] > 1) {
                queue.shift(); // remove
            } else {
                break; // found the first non-repeating character
            }
        }
    }

    // Return the result
    return queue.length === 0 ? -1 : queue[0][1];
};`
            }
        },
        number_of_recent_calls: {
            "queue": {
                "javascript": `class RecentCounter {
    constructor() {
        this.queue = [];
    }

    ping(t) {
        // Add the new request to the queue
        this.queue.push(t);
        
        // Remove requests that are older than (t - 3000)
        // Keep only requests in the range [t - 3000, t]
        while (this.queue.length > 0 && this.queue[0] < t - 3000) {
            this.queue.shift();
        }

        // Return the number of requests in the past 3000ms
        return this.queue.length;
    }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter();
 * var param_1 = obj.ping(t);
 */`
            }
        },
        three_sum: {
            "brute_force": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        const res = new Set();
        nums.sort((a, b) => a - b);
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                for (let k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] === 0) {
                        res.add(JSON.stringify([nums[i], nums[j], nums[k]]));
                    }
                }
            }
        }
        return Array.from(res).map(item => JSON.parse(item));
    }
}`
            },
            "hash_map": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        nums.sort((a, b) => a - b);
        const count = new Map();
        for (let num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const res = [];
        for (let i = 0; i < nums.length; i++) {
            count.set(nums[i], count.get(nums[i]) - 1);
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) - 1);
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                const target = -(nums[i] + nums[j]);
                if (count.get(target) > 0) {
                    res.push([nums[i], nums[j], target]);
                }
            }

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) + 1);
            }
        }
        return res;
    }
}`
            },
            "two_pointers": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        nums.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            let l = i + 1;
            let r = nums.length - 1;
            while (l < r) {
                const sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    res.push([nums[i], nums[l], nums[r]]);
                    l++;
                    r--;
                    while (l < r && nums[l] === nums[l - 1]) {
                        l++;
                    }
                }
            }
        }
        return res;
    }
}`
            }
        },
        two_sum_ii: {
            "brute_force": {
                "javascript": `class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] === target) {
                    return [i + 1, j + 1];
                }
            }
        }
        return [];
    }
}`
            },
            "binary_search": {
                "javascript": `class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        for (let i = 0; i < numbers.length; i++) {
            let l = i + 1, r = numbers.length - 1;
            let tmp = target - numbers[i];
            while (l <= r) {
                let mid = l + Math.floor((r - l) / 2);
                if (numbers[mid] === tmp) {
                    return [i + 1, mid + 1];
                } else if (numbers[mid] < tmp) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return [];
    }
}`
            },
            "hash_map": {
                "javascript": `class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        const mp = new Map();
        for (let i = 0; i < numbers.length; i++) {
            const tmp = target - numbers[i];
            if (mp.has(tmp)) {
                return [mp.get(tmp), i + 1];
            }
            mp.set(numbers[i], i + 1);
        }
        return [];
    }
}`
            },
            "two_pointers": {
                "javascript": `class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        let l = 0, r = numbers.length - 1;

        while (l < r) {
            const curSum = numbers[l] + numbers[r];

            if (curSum > target) {
                r--;
            } else if (curSum < target) {
                l++;
            } else {
                return [l + 1, r + 1];
            }
        }
        return [];
    }
}`
            }
        },
        three_sum_closest: {
            "brute_force": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    threeSumClosest(nums, target) {
        // Khởi tạo closestSum và minDifference ban đầu.
        // Luôn đảm bảo mảng nums có ít nhất 3 phần tử theo ràng buộc của bài toán.
        let closestSum = nums[0] + nums[1] + nums[2];
        let minDifference = Math.abs(target - closestSum);

        // Vòng lặp ngoài cùng cho phần tử thứ nhất (nums[i])
        // i chỉ cần chạy đến nums.length - 3 vì chúng ta cần ít nhất 2 phần tử nữa (j và k) sau i.
        for (let i = 0; i < nums.length - 2; i++) {

            // Vòng lặp thứ hai cho phần tử thứ hai (nums[j])
            // j bắt đầu sau i (i + 1)
            // j chỉ cần chạy đến nums.length - 2 vì chúng ta cần ít nhất 1 phần tử nữa (k) sau j.
            for (let j = i + 1; j < nums.length - 1; j++) {

                // Vòng lặp trong cùng cho phần tử thứ ba (nums[k])
                // k bắt đầu sau j (j + 1)
                // k chạy đến cuối mảng (nums.length - 1)
                for (let k = j + 1; k < nums.length; k++) {

                    let currentSum = nums[i] + nums[j] + nums[k];
                    let currentDifference = Math.abs(target - currentSum);

                    // Nếu tìm thấy tổng chính xác bằng target, đó là kết quả tốt nhất có thể, trả về ngay.
                    if (currentDifference === 0) {
                        return currentSum;
                    }

                    // Nếu khoảng cách của tổng hiện tại nhỏ hơn khoảng cách nhỏ nhất đã ghi nhận
                    if (currentDifference < minDifference) {
                        minDifference = currentDifference; // Cập nhật khoảng cách nhỏ nhất
                        closestSum = currentSum;         // Cập nhật tổng gần nhất
                    }
                }
            }
        }

        return closestSum; // Trả về tổng gần nhất sau khi đã duyệt qua tất cả các bộ ba
    }
}`
            },
            "two_pointers": {
                "javascript": `/**
 * @param {number[]} nums - Mảng số nguyên đầu vào.
 * @param {number} target - Giá trị mục tiêu.
 * @return {number} - Tổng của ba số gần nhất với target.
 */
function threeSumClosestTwoPointers(nums, target) {
    // Sắp xếp các phần tử trong mảng.
    // Việc này là BẮT BUỘC để thuật toán Two-Pointers hoạt động.
    nums.sort((a, b) => a - b);

    // Khởi tạo closestSum (tổng gần nhất) và minDifference (khoảng cách nhỏ nhất).
    // Bắt đầu với tổng của ba phần tử đầu tiên và khoảng cách tương ứng.
    let closestSum = nums[0] + nums[1] + nums[2];
    let minDifference = Math.abs(target - closestSum);

    // Duyệt qua từng phần tử làm số đầu tiên (nums[i]).
    // Vòng lặp dừng ở nums.length - 2 vì chúng ta cần ít nhất hai phần tử nữa (left và right) sau nums[i].
    for (let i = 0; i < nums.length - 2; i++) {
        // Khởi tạo hai con trỏ:
        // left bắt đầu ngay sau i.
        // right bắt đầu ở cuối mảng.
        let left = i + 1;
        let right = nums.length - 1;

        // Vòng lặp Two-Pointers.
        // Vòng lặp tiếp tục cho đến khi con trỏ left vượt qua con trỏ right.
        while (left < right) {
            // Tính tổng hiện tại của ba số.
            let currentSum = nums[i] + nums[left] + nums[right];

            // Nếu tổng chính xác bằng target, chúng ta đã tìm thấy kết quả tối ưu, trả về ngay.
            if (currentSum === target) {
                return target;
            }

            // Điều chỉnh con trỏ dựa trên so sánh tổng với target.
            // Nếu tổng nhỏ hơn target, cần tăng left để tổng lớn hơn (vì mảng đã sắp xếp).
            if (currentSum < target) {
                left++;
            }
            // Nếu tổng lớn hơn target, cần giảm right để tổng nhỏ hơn.
            else {
                right--;
            }

            // Tính khoảng cách tuyệt đối của tổng hiện tại so với target.
            let currentDifference = Math.abs(currentSum - target);

            // Nếu khoảng cách hiện tại nhỏ hơn khoảng cách nhỏ nhất đã ghi nhận, cập nhật.
            if (currentDifference < minDifference) {
                minDifference = currentDifference; // Cập nhật khoảng cách nhỏ nhất.
                closestSum = currentSum;         // Cập nhật tổng gần nhất.
            }
        }
    }

    // Sau khi duyệt qua tất cả các bộ ba có thể, trả về tổng gần nhất tìm được.
    return closestSum;
}`
            }
        },
        four_sum: {
            "brute_force": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        let n = nums.length;
        nums.sort((a, b) => a - b);
        let res = new Set();

        for (let a = 0; a < n; a++) {
            for (let b = a + 1; b < n; b++) {
                for (let c = b + 1; c < n; c++) {
                    for (let d = c + 1; d < n; d++) {
                        if (nums[a] + nums[b] + nums[c] + nums[d] === target) {
                            res.add(JSON.stringify([nums[a], nums[b], nums[c], nums[d]]));
                        }
                    }
                }
            }
        }

        return Array.from(res).map(JSON.parse);
    }
}`
            },
            "hash_map": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }
        const res = [];

        for (let i = 0; i < nums.length; i++) {
            count.set(nums[i], count.get(nums[i]) - 1);
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) - 1);
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                for (let k = j + 1; k < nums.length; k++) {
                    count.set(nums[k], count.get(nums[k]) - 1);
                    if (k > j + 1 && nums[k] === nums[k - 1]) continue;

                    const fourth = target - (nums[i] + nums[j] + nums[k]);
                    if ((count.get(fourth) || 0) > 0) {
                        res.push([nums[i], nums[j], nums[k], fourth]);
                    }
                }

                for (let k = j + 1; k < nums.length; k++) {
                    count.set(nums[k], count.get(nums[k]) + 1);
                }
            }

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) + 1);
            }
        }

        return res;
    }
}`
            },
            "two_pointers": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const res = [];
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                let left = j + 1, right = n - 1;
                while (left < right) {
                    const sum = nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum === target) {
                        res.push([nums[i], nums[j], nums[left], nums[right]]);
                        left++;
                        right--;
                        while (left < right && nums[left] === nums[left - 1]) left++;
                        while (left < right && nums[right] === nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }

        return res;
    }
}`
            },
            "k_sum_two_pointers": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const res = [];
        const quad = [];

        const kSum = (k, start, target) => {
            if (k === 2) {
                let l = start, r = nums.length - 1;
                while (l < r) {
                    const sum = nums[l] + nums[r];
                    if (sum < target) {
                        l++;
                    } else if (sum > target) {
                        r--;
                    } else {
                        res.push([...quad, nums[l], nums[r]]);
                        l++;
                        r--;
                        while (l < r && nums[l] === nums[l - 1]) l++;
                        while (l < r && nums[r] === nums[r + 1]) r--;
                    }
                }
                return;
            }

            for (let i = start; i < nums.length - k + 1; i++) {
                if (i > start && nums[i] === nums[i - 1]) continue;
                quad.push(nums[i]);
                kSum(k - 1, i + 1, target - nums[i]);
                quad.pop();
            }
        };

        kSum(4, 0, target);
        return res;
    }
}`
            }
        },
        permutations: {
            "recursion": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        if (nums.length === 0) {
            return [[]];
        }

        let perms = this.permute(nums.slice(1));
        let res = [];
        for (let p of perms) {
            for (let i = 0; i <= p.length; i++) {
                let p_copy = p.slice();
                p_copy.splice(i, 0, nums[0]);
                res.push(p_copy);
            }
        }
        return res;
    }
}`
            },
            "iteration": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        let perms = [[]];
        for (let num of nums) {
            let new_perms = [];
            for (let p of perms) {
                for (let i = 0; i <= p.length; i++) {
                    let p_copy = p.slice();
                    p_copy.splice(i, 0, num);
                    new_perms.push(p_copy);
                }
            }
            perms = new_perms;
        }
        return perms;
    }
}`
            },
            "backtracking": {
                "javascript": `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        let res = [];
        backtrack([], nums, new Array(nums.length).fill(false));
        return res;
        
        function backtrack(perm, nums, pick) {
            if (perm.length === nums.length) {
                res.push([...perm]);
                return;
            }
            for (let i = 0; i < nums.length; i++) {
                if (!pick[i]) {
                    perm.push(nums[i]);
                    pick[i] = true;
                    backtrack(perm, nums, pick);
                    perm.pop();
                    pick[i] = false;
                }
            }
        }
    }
}`
            }
        }
    }

