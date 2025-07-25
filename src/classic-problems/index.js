// Classic Problem Components
import TowerOfHanoi from './TowerOfHanoi.jsx';
import EightQueensPuzzle from './EightQueensPuzzle.jsx';
import TravellingSalesmanProblem from './TravellingSalesmanProblem.jsx';
import KnapsackProblem from './KnapsackProblem.jsx';
import ChinesePostmanProblem from './ChinesePostmanProblem.jsx';
import GarbageCollectorProblem from './GarbageCollectorProblem.jsx';
import GraphColoring from './GraphColoring.jsx';
import JobScheduling from './JobScheduling.jsx';
import SudokuSolver from './SudokuSolver.jsx';
import MazeSolving from './MazeSolving.jsx';
import ShortestPathProblems from './ShortestPathProblems.jsx';
import MaximumFlow from './MaximumFlow.jsx';
import PatternMatching from './PatternMatching.jsx';
import FloodFill from './FloodFill.jsx';
import SubsetSum from './SubsetSum.jsx';
import PartitionProblem from './PartitionProblem.jsx';
import DNASequenceOptimization from './DNASequenceOptimization.jsx';

// Named exports
export { default as TowerOfHanoi } from './TowerOfHanoi.jsx';
export { default as EightQueensPuzzle } from './EightQueensPuzzle.jsx';
export { default as TravellingSalesmanProblem } from './TravellingSalesmanProblem.jsx';
export { default as KnapsackProblem } from './KnapsackProblem.jsx';
export { default as ChinesePostmanProblem } from './ChinesePostmanProblem.jsx';
export { default as GarbageCollectorProblem } from './GarbageCollectorProblem.jsx';
export { default as GraphColoring } from './GraphColoring.jsx';
export { default as JobScheduling } from './JobScheduling.jsx';
export { default as SudokuSolver } from './SudokuSolver.jsx';
export { default as MazeSolving } from './MazeSolving.jsx';
export { default as ShortestPathProblems } from './ShortestPathProblems.jsx';
export { default as MaximumFlow } from './MaximumFlow.jsx';
export { default as PatternMatching } from './PatternMatching.jsx';
export { default as FloodFill } from './FloodFill.jsx';
export { default as SubsetSum } from './SubsetSum.jsx';
export { default as PartitionProblem } from './PartitionProblem.jsx';
export { default as DNASequenceOptimization } from './DNASequenceOptimization.jsx';

// Component mapping for dynamic imports
export const classicProblemComponents = {
    'Tower of Hanoi': TowerOfHanoi,
    'Eight Queens Puzzle': EightQueensPuzzle,
    'Travelling Salesman Problem (TSP)': TravellingSalesmanProblem,
    'Knapsack Problem': KnapsackProblem,
    'Chinese Postman Problem': ChinesePostmanProblem,
    'Garbage Collector Problem': GarbageCollectorProblem,
    'Graph Coloring': GraphColoring,
    'Job Scheduling': JobScheduling,
    'Sudoku Solver': SudokuSolver,
    'Maze Solving': MazeSolving,
    'Shortest Path Problems': ShortestPathProblems,
    'Maximum Flow': MaximumFlow,
    'Pattern Matching': PatternMatching,
    'Flood Fill': FloodFill,
    'Subset Sum': SubsetSum,
    'Partition Problem': PartitionProblem,
    'DNA Sequence Optimization': DNASequenceOptimization
};
