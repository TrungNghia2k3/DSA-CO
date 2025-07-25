export const classicProblems = [
    {
        id: 1,
        name: "Tower of Hanoi",
        description: "Move disks between rods following specific rules.",
        techniques: ["Recursion", "Divide and Conquer"],
        difficulty: "Medium",
        category: "Recursion"
    },
    {
        id: 2,
        name: "Eight Queens Puzzle",
        description: "Place 8 queens on a chessboard such that none attack each other.",
        techniques: ["Backtracking", "DFS"],
        difficulty: "Hard",
        category: "Backtracking"
    },
    {
        id: 3,
        name: "Travelling Salesman Problem (TSP)",
        description: "Find shortest tour visiting each city and returning to the start.",
        techniques: ["Dynamic Programming", "NP-Hard", "DFS"],
        difficulty: "Hard",
        category: "Dynamic Programming"
    },
    {
        id: 4,
        name: "Knapsack Problem",
        description: "Choose items to maximize value within a weight limit.",
        techniques: ["Dynamic Programming", "Branch and Bound"],
        difficulty: "Medium",
        category: "Dynamic Programming"
    },
    {
        id: 5,
        name: "Chinese Postman Problem",
        description: "Find the shortest path that covers every edge of a graph.",
        techniques: ["Eulerian Graph", "Matching"],
        difficulty: "Hard",
        category: "Graph Theory"
    },
    {
        id: 6,
        name: "Garbage Collector Problem",
        description: "Optimize multiple agents collecting garbage efficiently.",
        techniques: ["Combinatorial Optimization"],
        difficulty: "Hard",
        category: "Optimization"
    },
    {
        id: 7,
        name: "Graph Coloring",
        description: "Color graph vertices so that no two adjacent vertices share color.",
        techniques: ["Backtracking", "Heuristics"],
        difficulty: "Hard",
        category: "Graph Theory"
    },
    {
        id: 8,
        name: "Job Scheduling",
        description: "Assign jobs to machines to optimize total processing time.",
        techniques: ["Greedy", "Dynamic Programming"],
        difficulty: "Medium",
        category: "Scheduling"
    },
    {
        id: 9,
        name: "Sudoku Solver",
        description: "Fill in numbers so that Sudoku constraints are satisfied.",
        techniques: ["Backtracking", "Constraint Satisfaction"],
        difficulty: "Medium",
        category: "Backtracking"
    },
    {
        id: 10,
        name: "Maze Solving",
        description: "Find a valid path through a maze.",
        techniques: ["DFS", "BFS", "Backtracking"],
        difficulty: "Easy",
        category: "Graph Theory"
    },
    {
        id: 11,
        name: "Shortest Path Problems",
        description: "Examples: Dijkstra, Bellman-Ford, A* algorithm.",
        techniques: ["Graph", "Priority Queue", "Heuristics"],
        difficulty: "Medium",
        category: "Graph Theory"
    },
    {
        id: 12,
        name: "Maximum Flow",
        description: "Compute max flow from source to sink in a network.",
        techniques: ["Flow Network", "Ford–Fulkerson", "BFS/DFS"],
        difficulty: "Hard",
        category: "Graph Theory"
    },
    {
        id: 13,
        name: "Pattern Matching",
        description: "Match substrings in a string using KMP, Trie, etc.",
        techniques: ["String Algorithms", "Hashing"],
        difficulty: "Medium",
        category: "String Processing"
    },
    {
        id: 14,
        name: "Flood Fill",
        description: "Fill a region of connected pixels (like in paint).",
        techniques: ["DFS", "BFS"],
        difficulty: "Easy",
        category: "Graph Theory"
    },
    {
        id: 15,
        name: "Subset Sum",
        description: "Check if a subset sums up to a target value.",
        techniques: ["Backtracking", "Dynamic Programming"],
        difficulty: "Medium",
        category: "Dynamic Programming"
    },
    {
        id: 16,
        name: "Partition Problem",
        description: "Divide an array into two parts with equal sums.",
        techniques: ["DP", "NP-complete"],
        difficulty: "Medium",
        category: "Dynamic Programming"
    },
    {
        id: 17,
        name: "DNA Sequence Optimization",
        description: "Find LCS or minimum edits between DNA sequences.",
        techniques: ["Dynamic Programming"],
        difficulty: "Medium",
        category: "Bioinformatics"
    }
];

export const problemCategories = {
    "Dynamic Programming": ["Knapsack Problem", "Travelling Salesman Problem (TSP)", "Subset Sum", "Partition Problem", "DNA Sequence Optimization"],
    "Graph Theory": ["Chinese Postman Problem", "Graph Coloring", "Maze Solving", "Shortest Path Problems", "Maximum Flow", "Flood Fill"],
    "Backtracking": ["Eight Queens Puzzle", "Sudoku Solver"],
    "Recursion": ["Tower of Hanoi"],
    "String Processing": ["Pattern Matching"],
    "Optimization": ["Garbage Collector Problem"],
    "Scheduling": ["Job Scheduling"],
    "Bioinformatics": ["DNA Sequence Optimization"]
};

export const difficultyColors = {
    "Easy": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800", 
    "Hard": "bg-red-100 text-red-800"
};
