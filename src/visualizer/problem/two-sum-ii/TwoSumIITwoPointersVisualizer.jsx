import React, { useState, useRef } from 'react';

const TwoSumIITwoPointersVisualizer = () => {
    const [inputArray, setInputArray] = useState([2, 7, 11, 15]);
    const [inputValue, setInputValue] = useState('2,7,11,15');
    const [target, setTarget] = useState(9);
    const [currentIndices, setCurrentIndices] = useState({ left: -1, right: -1 });
    const [result, setResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin Two Sum II visualization');
    const [stepCount, setStepCount] = useState(0);

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ left: 0, right: 0 });

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
        algorithmStateRef.current = { left: 0, right: parsedArray.length - 1 };
        setResult(null);
        setIsRunning(true);
        setStepCount(0);
        setMessage('Starting Two Sum II Two Pointers visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm(parsedArray);
        }, 1000);
    };

    const stepThroughAlgorithm = (nums) => {
        const state = algorithmStateRef.current;

        if (state.left >= state.right) {
            // Algorithm complete - no solution found
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ left: -1, right: -1 });
            setCurrentSum(null);
            setMessage('Algorithm complete! No solution found.');
            return;
        }

        // Update visualization
        setCurrentIndices({ left: state.left, right: state.right });
        setStepCount(prev => prev + 1);

        // Calculate current sum
        const sum = nums[state.left] + nums[state.right];
        setCurrentSum(sum);

        if (sum === target) {
            // Found solution
            const solution = [state.left + 1, state.right + 1]; // 1-indexed
            setResult(solution);
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setMessage(`Found solution: indices [${solution.join(', ')}] = ${nums[state.left]} + ${nums[state.right]} = ${sum}`);
            return;
        } else if (sum < target) {
            setMessage(`${nums[state.left]} + ${nums[state.right]} = ${sum} < ${target}, moving left pointer right`);
            state.left++;
        } else {
            setMessage(`${nums[state.left]} + ${nums[state.right]} = ${sum} > ${target}, moving right pointer left`);
            state.right--;
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ left: -1, right: -1 });
        setResult(null);
        setCurrentSum(null);
        setMessage('Click "Start" to begin Two Sum II visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { left, right } = currentIndices;
        if (index === left) return 'bg-blue-500 text-white font-bold border-blue-600';
        if (index === right) return 'bg-green-500 text-white font-bold border-green-600';
        if (left !== -1 && right !== -1 && index > left && index < right) {
            return 'bg-yellow-600 border-yellow-600';
        }
        return 'layout-default-bg';
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Two Sum II - Two Pointers Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n) Two Pointers</h3>
                <p className="text-sm">
                    Uses two pointers at start and end of sorted array. 
                    If sum &lt; target, move left pointer right. If sum &gt; target, move right pointer left.
                </p>
                <div className="mt-2 text-sm">
                    <strong>Input:</strong> Sorted array, target sum<br/>
                    <strong>Output:</strong> 1-indexed positions of two numbers that add up to target
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
                    {currentIndices.left !== -1 && (
                        <span className="ml-4">
                            Pointers: left={currentIndices.left}, right={currentIndices.right}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-secondary"></div>
                    <span>left pointer</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-tertiary"></div>
                    <span>right pointer</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-inactive"></div>
                    <span>search range</span>
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
                                p-3 min-w-[60px] text-center rounded
                                ${getCellStyle(index)}
                                transition-all duration-300
                            `}
                        >
                            <div className="font-bold text-lg">{num}</div>
                            <div className="text-xs opacity-70">idx: {index}</div>
                            <div className="text-xs opacity-70">pos: {index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Calculation */}
            {currentIndices.left !== -1 && currentIndices.right !== -1 && (
                <div className="message-warning">
                    <h4 className="font-semibold mb-2">Current Calculation:</h4>
                    <div className="text-lg">
                        <span className="text-blue-400 font-bold">
                            {inputArray[currentIndices.left]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-green-400 font-bold">
                            {inputArray[currentIndices.right]}
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

export default TwoSumIITwoPointersVisualizer;
