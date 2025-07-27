export const examples = {
    "array": {
        "example 1": {
            "javascript": `// JS code
let arr = []`
        },
        "example 2": {
            "javascript": `let arr = [ 1, 2, 3, 4, 5 ];
let arr = [ 'a', 'b', 'c', 'd', 'e' ];
let arr = [ 1.4, 2.0, 24, 5.0, 0.0 ];`
        },
        "example 3": {
        },
        "example 4": {
            "javascript": `// Dynamic Sized Array
let arr = new Array();  `
        },
    },
    "hashTable": {
        "example 1": {
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
            "javascript": `let arr = [ 1, 2, 3, 4, 5 ];
let arr = [ 'a', 'b', 'c', 'd', 'e' ];
let arr = [ 1.4, 2.0, 24, 5.0, 0.0 ];`
        }
    },
    "bubbleSort": {
        "example 1": {
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
