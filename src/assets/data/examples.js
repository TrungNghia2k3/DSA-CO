export const examples = {
    "array": {
        "example 1": {
            "cpp": `// This array will store integer type element
int arr[5];      

// This array will store char type element
char arr[10];   

// This array will store float type element
float arr[20]; `,
            "java": `// This array will store integer type element
int arr[];     

// This array will store char type element
char arr[];   

// This array will store float type element
float arr[];`,
            "javascript": `// JS code
let arr = []`
        },
        "example 2": {
            "cpp": `int arr[] = { 1, 2, 3, 4, 5 };
char arr[5] = { 'a', 'b', 'c', 'd', 'e' };
float arr[10] = { 1.4, 2.0, 24, 5.0, 0.0 };`,
            "java": `int arr[] = { 1, 2, 3, 4, 5 };
char arr[] = { 'a', 'b', 'c', 'd', 'e' };
float arr[] = { 1.4f, 2.0f, 24f, 5.0f, 0.0f };`,
            "javascript": `let arr = [ 1, 2, 3, 4, 5 ];
let arr = [ 'a', 'b', 'c', 'd', 'e' ];
let arr = [ 1.4, 2.0, 24, 5.0, 0.0 ];`
        },
        "example 3": {
            "cpp": `// Method 1 to create a fixed sized array. 
// Here the memory is allocated at compile time.
int arr[5]; 
// Another way (creation and initialization both)
int arr2[5] = {1, 2, 3, 4, 5}; 

// Method 2 to create a fixed sized array
// Here memory is allocated at run time (Also
// known as dynamically allocated arrays)
int *arr = new int[5];`,
            "java": `// Fixed sized array examples
int[] arr1 = new int [5];

// Another way (Array creation and 
// initialization both)
int[] arr2 = {1, 2, 3, 4, 5};`,
        },
        "example 4": {
            "cpp": `#include<vector>

// Dynamic Integer Array
vector<int> v;`,
            "java": `// Dynamic Integer Array
ArrayList<Integer> arr = new ArrayList<>();`,
            "javascript": `// Dynamic Sized Array
let arr = new Array();  `
        },
    },
    "hashTable": {
        "example 1": {
            "cpp": `#include <bits/stdc++.h>
using namespace std;

struct Hash {
    int BUCKET; // No. of buckets

    // Vector of vectors to store the chains
    vector<vector<int>> table;

    // Inserts a key into hash table
    void insertItem(int key) {
        int index = hashFunction(key);
        table[index].push_back(key);
    }

    // Deletes a key from hash table
    void deleteItem(int key);

    // Hash function to map values to key
    int hashFunction(int x) {
        return (x % BUCKET);
    }

    void displayHash();

    // Constructor to initialize bucket count and table
    Hash(int b) {
        this->BUCKET = b;
        table.resize(BUCKET);
    }
};

// Function to delete a key from the hash table
void Hash::deleteItem(int key) {
    int index = hashFunction(key);

    // Find and remove the key from the table[index] vector
    auto it = find(table[index].begin(), table[index].end(), key);
    if (it != table[index].end()) {
        table[index].erase(it); // Erase the key if found
    }
}

// Function to display the hash table
void Hash::displayHash() {
    for (int i = 0; i < BUCKET; i++) {
        cout << i;
        for (int x : table[i]) {
            cout << " --> " << x;
        }
        cout << endl;
    }
}

// Driver program
int main() {
    // Vector that contains keys to be mapped
    vector<int> a = {15, 11, 27, 8, 12};

    // Insert the keys into the hash table
    Hash h(7); // 7 is the number of buckets 
    for (int key : a)
        h.insertItem(key);

    // Delete 12 from the hash table
    h.deleteItem(12);

    // Display the hash table
    h.displayHash();

    return 0;
}`,
            "java": `import java.util.ArrayList;

public class Hash {
    // Number of buckets
    private final int bucket;
    // Hash table of size bucket
    private final ArrayList<Integer>[] table;

    public Hash(int bucket)
    {
        this.bucket = bucket;
        this.table = new ArrayList[bucket];
        for (int i = 0; i < bucket; i++) {
            table[i] = new ArrayList<>();
        }
    }

    // hash function to map values to key
    public int hashFunction(int key)
    {
        return (key % bucket);
    }

    public void insertItem(int key)
    {
        // get the hash index of key
        int index = hashFunction(key);
        // insert key into hash table at that index
        table[index].add(key);
    }

    public void deleteItem(int key)
    {
        // get the hash index of key
        int index = hashFunction(key);

        // Check if key is in hash table
        if (!table[index].contains(key)) {
            return;
        }

        // delete the key from hash table
        table[index].remove(Integer.valueOf(key));
    }

    // function to display hash table
    public void displayHash()
    {
        for (int i = 0; i < bucket; i++) {
            System.out.print(i);
            for (int x : table[i]) {
                System.out.print(" --> " + x);
            }
            System.out.println();
        }
    }

    // Drive Program
    public static void main(String[] args)
    {
        // array that contains keys to be mapped
        int[] a = { 15, 11, 27, 8, 12 };

        // Create a empty has of BUCKET_SIZE
        Hash h = new Hash(7);

        // insert the keys into the hash table
        for (int x : a) {
            h.insertItem(x);
        }

        // delete 12 from the hash table
        h.deleteItem(12);

        // Display the hash table
        h.displayHash();
    }
}`,
            "javascript": `class Hash {
    constructor(V) {
        this.BUCKET = V; // No. of buckets
        this.table = new Array(V);
        for (let i = 0; i < V; i++) {
            this.table[i] = [];
        }
    }

    insertItem(x) {
        const index = this.hashFunction(x);
        this.table[index].push(x);
    }

    deleteItem(key) {
        const index = this.hashFunction(key);
        const i = this.table[index].indexOf(key);
        if (i !== -1) {
            this.table[index].splice(i, 1);
        }
    }

    hashFunction(x) {
        return x % this.BUCKET;
    }

    displayHash() {
        for (let i = 0; i < this.BUCKET; i++) {
            let str = \`\${i}\`;
            for (let j = 0; j < this.table[i].length; j++) {
                str += \`-- > \${ this.table[i][j]}\`;
            }
            console.log(str);
        }
    }
}

// Driver program
const a = [15, 11, 27, 8, 12];
const h = new Hash(7);
for (let i = 0; i < a.length; i++) {
    h.insertItem(a[i]);
}
h.deleteItem(12);
h.displayHash();`,
        },
        "example 2": {
            "cpp": `int arr[] = { 1, 2, 3, 4, 5 };
char arr[5] = { 'a', 'b', 'c', 'd', 'e' };
float arr[10] = { 1.4, 2.0, 24, 5.0, 0.0 };`,
            "java": `int arr[] = { 1, 2, 3, 4, 5 };
char arr[] = { 'a', 'b', 'c', 'd', 'e' };
float arr[] = { 1.4f, 2.0f, 24f, 5.0f, 0.0f };`,
            "javascript": `let arr = [ 1, 2, 3, 4, 5 ];
let arr = [ 'a', 'b', 'c', 'd', 'e' ];
let arr = [ 1.4, 2.0, 24, 5.0, 0.0 ];`
        }
    },
    "bubbleSort": {
        "example 1": {
            "cpp": `#include <bits/stdc++.h>
using namespace std;

// An optimized version of Bubble Sort 
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
  
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
      
        // If no two elements were swapped, then break
        if (!swapped)
            break;
    }
}

// Function to print a vector
void printVector(const vector<int>& arr) {
    for (int num : arr)
        cout << " " << num;
}

int main() {
    vector<int> arr = { 64, 34, 25, 12, 22, 11, 90 };
    bubbleSort(arr);
    cout << "Sorted array: \\n";
    printVector(arr);
    return 0;
}`,
            "java": `// Optimized java implementation of Bubble sort
import java.io.*;

class GFG {
    
    // An optimized version of Bubble Sort
    static void bubbleSort(int arr[], int n){
        int i, j, temp;
        boolean swapped;
        for (i = 0; i < n - 1; i++) {
            swapped = false;
            for (j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    
                    // Swap arr[j] and arr[j+1]
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // If no two elements were
            // swapped by inner loop, then break
            if (swapped == false)
                break;
        }
    }

    // Function to print an array
    static void printArray(int arr[], int size){
        int i;
        for (i = 0; i < size; i++)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    // Driver program
    public static void main(String args[]){
        int arr[] = { 64, 34, 25, 12, 22, 11, 90 };
        int n = arr.length;
        bubbleSort(arr, n);
        System.out.println("Sorted array: ");
        printArray(arr, n);
    }
}`,
            "javascript": `// Optimized javaScript implementation
// of Bubble sort
function bubbleSort(arr, n){
    var i, j, temp;
    var swapped;
    for (i = 0; i < n - 1; i++){
        swapped = false;
        for (j = 0; j < n - i - 1; j++){
            if (arr[j] > arr[j + 1]) 
            {
                // Swap arr[j] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // IF no two elements were 
        // swapped by inner loop, then break
        if (swapped == false)
        break;
    }
}

// Function to print an array 
function printArray(arr, size){
  var i;
  for (i = 0; i < size; i++)
      console.log(arr[i] + " ");
}

// Driver program
var arr = [ 64, 34, 25, 12, 22, 11, 90 ];
var n = arr.length;
bubbleSort(arr, n);
console.log("Sorted array: ");
printArray(arr, n);`
        }
    }

    // Add more categories as needed
};
