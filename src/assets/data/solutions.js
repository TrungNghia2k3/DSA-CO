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
        }
    }

