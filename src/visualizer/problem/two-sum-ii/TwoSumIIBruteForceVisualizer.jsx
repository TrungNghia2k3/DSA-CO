import React, { useState, useRef } from 'react';

const TwoSumIIBruteForceVisualizer = () => {
    const [inputValue, setInputValue] = useState('2,7,11,15');
    const [target, setTarget] = useState(9);
    const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1 });
    const [result, setResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin Two Sum II Brute Force visualization');
    const [stepCount, setStepCount] = useState(0);
    const [inputArray, setInputArray] = useState([2, 7, 11, 15]);

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ i: 0, j: 1 });

    const startVisualization = () => {
        if (isRunning) return;
        
        // Parse the input array
        const parsedArray = inputValue
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num));
        
        if (parsedArray.length < 2) {
            setMessage('Array must have at least 2 elements');
            return;
        }

        setInputArray(parsedArray);
        
        // Reset state
        algorithmStateRef.current = { i: 0, j: 1 };
        setResult(null);
        setIsRunning(true);
        setStepCount(0);
        setCurrentIndices({ i: -1, j: -1 });
        setCurrentSum(null);
        setMessage('Starting Two Sum II Brute Force visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm(parsedArray);
        }, 1200);
    };

    const stepThroughAlgorithm = (nums) => {
        const state = algorithmStateRef.current;

        if (state.i >= nums.length - 1) {
            // Algorithm complete - no solution found
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, j: -1 });
            setCurrentSum(null);
            setMessage('Algorithm complete! No solution found.');
            return;
        }

        if (state.j >= nums.length) {
            // Move to next i
            state.i++;
            state.j = state.i + 1;
            
            if (state.i >= nums.length - 1) {
                return; // Will be caught by the first condition
            }
            
            setMessage(`Moving to next starting position: i=${state.i}`);
            return;
        }

        // Check current pair
        const sum = nums[state.i] + nums[state.j];
        setCurrentIndices({ i: state.i, j: state.j });
        setCurrentSum(sum);
        setStepCount(prev => prev + 1);

        if (sum === target) {
            // Found the solution
            const solution = [state.i + 1, state.j + 1]; // 1-indexed
            setResult(solution);
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setMessage(`Found solution: nums[${state.i}] + nums[${state.j}] = ${nums[state.i]} + ${nums[state.j]} = ${target}`);
            return;
        }

        setMessage(`Checking: nums[${state.i}] + nums[${state.j}] = ${nums[state.i]} + ${nums[state.j]} = ${sum} ${sum === target ? '= target!' : '≠ target'}`);
        
        // Move to next j
        state.j++;
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ i: -1, j: -1 });
        setResult(null);
        setCurrentSum(null);
        setMessage('Click "Start" to begin Two Sum II Brute Force visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { i, j } = currentIndices;
        if (index === i) {
            return 'element-secondary'; // First element (i)
        }
        if (index === j) {
            return 'element-tertiary'; // Second element (j)
        }
        if (i !== -1 && index > i && index < j) {
            return 'element-inactive'; // Already checked or in between
        }
        return 'element-inactive'; // Default
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Two Sum II - Brute Force Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n²) Brute Force</h3>
                <p className="text-sm">
                    Check every possible pair of elements using nested loops. 
                    Time complexity: O(n²), Space complexity: O(1)
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> For each element at index i, check all elements at indices j &gt; i.
                </div>
            </div>

            {/* Input Controls */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Sorted Array (comma-separated):</label>
                    <input
                        type="text"
                        className="input-default"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isRunning}
                        placeholder="Enter sorted numbers separated by commas"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Target Sum:</label>
                    <input
                        type="number"
                        className="input-default"
                        value={target}
                        onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                        disabled={isRunning}
                        placeholder="Enter target sum"
                    />
                </div>
            </div>

            {/* Status */}
            <div className="message-info">
                <p className="font-medium">{message}</p>
                <div className="text-sm opacity-80 mt-1">
                    <span>Steps: {stepCount}</span>
                    <span className="ml-4">Target: {target}</span>
                    {currentSum !== null && (
                        <span className="ml-4">
                            Current Sum: <span className={currentSum === target ? 'text-green-400 font-bold' : 'text-gray-300'}>{currentSum}</span>
                        </span>
                    )}
                    {currentIndices.i !== -1 && (
                        <span className="ml-4">
                            Checking: i={currentIndices.i}, j={currentIndices.j}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-secondary"></div>
                    <span>i (first pointer)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-tertiary"></div>
                    <span>j (second pointer)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-inactive"></div>
                    <span>not selected</span>
                </div>
            </div>

            {/* Array Visualization */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Array (sorted):</h4>
                <div className="flex gap-2 flex-wrap">
                    {inputArray.map((num, index) => (
                        <div
                            key={index}
                            className={`
                                p-3 min-w-[50px] text-center rounded border-2
                                ${getCellStyle(index)}
                                transition-all duration-300
                            `}
                        >
                            <div className="font-bold">{num}</div>
                            <div className="text-xs opacity-70">idx: {index}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Comparison */}
            {currentIndices.i !== -1 && currentIndices.j !== -1 && (
                <div className="message-warning">
                    <h4 className="font-semibold mb-2">Current Comparison:</h4>
                    <div className="text-lg">
                        <span className="text-blue-400 font-bold">
                            {inputArray[currentIndices.i]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-green-400 font-bold">
                            {inputArray[currentIndices.j]}
                        </span>
                        <span className="mx-2">=</span>
                        <span className={currentSum === target ? 'text-green-400 font-bold' : 'text-gray-300'}>
                            {currentSum}
                        </span>
                        <span className="ml-4 opacity-80">
                            (target: {target})
                        </span>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="flex gap-2 mb-4">
                <button
                    className={`px-4 py-2 ${isRunning ? 'btn-disabled' : 'btn-primary'}`}
                    onClick={startVisualization}
                    disabled={isRunning}
                >
                    {isRunning ? 'Running...' : 'Start Visualization'}
                </button>
                <button
                    className="px-4 py-2 btn-danger"
                    onClick={resetVisualization}
                >
                    Reset
                </button>
            </div>

            {/* Result */}
            {result && (
                <div className="message-success">
                    <h4 className="font-semibold mb-2">Solution Found!</h4>
                    <div className="bg-gray-800 text-gray-300 p-3 rounded border border-gray-700">
                        <div className="text-lg">
                            <strong>Indices (1-based):</strong> [{result.join(', ')}]
                        </div>
                        <div className="text-sm opacity-80 mt-1">
                            Values: {inputArray[result[0] - 1]} + {inputArray[result[1] - 1]} = {target}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwoSumIIBruteForceVisualizer;
