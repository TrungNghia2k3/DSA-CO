import React, { useState, useRef } from 'react';

const FourSumTwoPointersVisualizer = () => {
    const [inputArray, setInputArray] = useState([1, 0, -1, 0, -2, 2]);
    const [inputValue, setInputValue] = useState('1,0,-1,0,-2,2');
    const [target, setTarget] = useState(0);
    const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1, left: -1, right: -1 });
    const [result, setResult] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin Four Sum Two Pointers visualization');
    const [stepCount, setStepCount] = useState(0);

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ i: 0, j: 1, left: 2, right: 0 });
    const sortedArrayRef = useRef([]);

    const startVisualization = () => {
        if (isRunning) return;
        
        // Parse and sort the input array
        const parsedArray = inputValue
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num));
        
        if (parsedArray.length < 4) {
            setMessage('Array must have at least 4 elements');
            return;
        }

        const sorted = [...parsedArray].sort((a, b) => a - b);
        setInputArray(sorted);
        sortedArrayRef.current = sorted;
        
        // Reset state
        algorithmStateRef.current = { 
            i: 0, 
            j: 1, 
            left: 2, 
            right: sorted.length - 1 
        };
        setResult([]);
        setIsRunning(true);
        setStepCount(0);
        setMessage('Starting Four Sum Two Pointers visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm();
        }, 1000);
    };

    const stepThroughAlgorithm = () => {
        const nums = sortedArrayRef.current;
        const state = algorithmStateRef.current;

        if (state.i >= nums.length - 3) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, j: -1, left: -1, right: -1 });
            setCurrentSum(null);
            setMessage(`Algorithm complete! Found ${result.length} unique quadruplets.`);
            return;
        }

        // Skip duplicates for i
        if (state.i > 0 && nums[state.i] === nums[state.i - 1]) {
            state.i++;
            state.j = state.i + 1;
            state.left = state.j + 1;
            state.right = nums.length - 1;
            setMessage(`Skipping duplicate at i=${state.i - 1}`);
            return;
        }

        if (state.j >= nums.length - 2) {
            // Move to next i
            state.i++;
            state.j = state.i + 1;
            state.left = state.j + 1;
            state.right = nums.length - 1;
            setMessage(`Moving to next i=${state.i}`);
            return;
        }

        // Skip duplicates for j
        if (state.j > state.i + 1 && nums[state.j] === nums[state.j - 1]) {
            state.j++;
            state.left = state.j + 1;
            state.right = nums.length - 1;
            setMessage(`Skipping duplicate at j=${state.j - 1}`);
            return;
        }

        if (state.left >= state.right) {
            // Move to next j
            state.j++;
            state.left = state.j + 1;
            state.right = nums.length - 1;
            setMessage(`Moving to next j=${state.j}`);
            return;
        }

        // Update visualization
        setCurrentIndices({ 
            i: state.i, 
            j: state.j, 
            left: state.left, 
            right: state.right 
        });
        setStepCount(prev => prev + 1);

        // Calculate current sum
        const sum = nums[state.i] + nums[state.j] + nums[state.left] + nums[state.right];
        setCurrentSum(sum);

        if (sum === target) {
            const quadruplet = [nums[state.i], nums[state.j], nums[state.left], nums[state.right]];
            setResult(prev => [...prev, quadruplet]);
            setMessage(`Found quadruplet: [${quadruplet.join(', ')}] = ${sum}`);
            
            // Move both pointers and skip duplicates
            state.left++;
            state.right--;
            
            while (state.left < state.right && nums[state.left] === nums[state.left - 1]) {
                state.left++;
            }
            while (state.left < state.right && nums[state.right] === nums[state.right + 1]) {
                state.right--;
            }
        } else if (sum < target) {
            setMessage(`Sum ${sum} < ${target}, moving left pointer right`);
            state.left++;
        } else {
            setMessage(`Sum ${sum} > ${target}, moving right pointer left`);
            state.right--;
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ i: -1, j: -1, left: -1, right: -1 });
        setResult([]);
        setCurrentSum(null);
        setMessage('Click "Start" to begin Four Sum Two Pointers visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { i, j, left, right } = currentIndices;
        if (index === i) return 'element-tertiary';
        if (index === j) return 'element-warning';
        if (index === left) return 'element-secondary';
        if (index === right) return 'element-active';
        if (i !== -1 && j !== -1 && index > j && index < left) return 'element-inactive opacity-50';
        if (i !== -1 && right !== -1 && index > right) return 'element-inactive opacity-50';
        if (i !== -1 && index <= i) return 'element-inactive opacity-50';
        return 'element-inactive';
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Four Sum - Two Pointers Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation mb-4">
                <h3 className="font-semibold mb-2">Algorithm: O(n³) Two Pointers</h3>
                <p className="text-sm">
                    Fix two elements (i, j) and use two pointers (left, right) to find pairs that sum to target. 
                    Time complexity: O(n³), Space complexity: O(1)
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> For each (i, j) pair, use two pointers to find the remaining two elements.
                </div>
            </div>

            {/* Input Controls */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1 text-gray-300">Array (comma-separated):</label>
                    <input
                        type="text"
                        className="input-default"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isRunning}
                        placeholder="Enter numbers separated by commas"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-300">Target Sum:</label>
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
            <div className="message-info mb-4">
                <p className="font-medium">{message}</p>
                <div className="text-sm mt-1 opacity-80">
                    <span>Steps: {stepCount}</span>
                    <span className="ml-4">Target: {target}</span>
                    {currentSum !== null && (
                        <span className="ml-4">
                            Current Sum: <span className={currentSum === target ? 'text-green-400 font-bold' : 'text-gray-300'}>{currentSum}</span>
                        </span>
                    )}
                    {currentIndices.i !== -1 && (
                        <span className="ml-4">
                            Indices: i={currentIndices.i}, j={currentIndices.j}, left={currentIndices.left}, right={currentIndices.right}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-tertiary rounded"></div>
                    <span className="text-gray-300">i (first fixed)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-warning rounded"></div>
                    <span className="text-gray-300">j (second fixed)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-secondary rounded"></div>
                    <span className="text-gray-300">left pointer</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-active rounded"></div>
                    <span className="text-gray-300">right pointer</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-inactive rounded"></div>
                    <span className="text-gray-300">excluded range</span>
                </div>
            </div>

            {/* Array Visualization */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-300">Sorted Array:</h4>
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
                            <div className="text-xs opacity-70">{index}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Calculation */}
            {currentIndices.i !== -1 && currentIndices.j !== -1 && currentIndices.left !== -1 && currentIndices.right !== -1 && (
                <div className="step-indicator mb-4">
                    <h4 className="font-semibold mb-2">Current Calculation:</h4>
                    <div className="text-lg">
                        <span className="text-orange-400 font-bold">
                            {inputArray[currentIndices.i]}
                        </span>
                        <span className="mx-2 text-gray-300">+</span>
                        <span className="text-yellow-400 font-bold">
                            {inputArray[currentIndices.j]}
                        </span>
                        <span className="mx-2 text-gray-300">+</span>
                        <span className="text-blue-400 font-bold">
                            {inputArray[currentIndices.left]}
                        </span>
                        <span className="mx-2 text-gray-300">+</span>
                        <span className="text-green-400 font-bold">
                            {inputArray[currentIndices.right]}
                        </span>
                        <span className="mx-2 text-gray-300">=</span>
                        <span className={currentSum === target ? 'text-green-400 font-bold' : 'text-gray-300'}>
                            {currentSum}
                        </span>
                        <span className="ml-4 text-gray-400">
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

            {/* Results */}
            {result.length > 0 && (
                <div className="message-success">
                    <h4 className="font-semibold mb-2">Found Quadruplets (sum = {target}):</h4>
                    <div className="space-y-2">
                        {result.map((quadruplet, index) => (
                            <div key={index} className="bg-gray-800 text-gray-300 p-2 rounded border border-gray-700 flex justify-between">
                                <span>[{quadruplet.join(', ')}]</span>
                                <span className="text-green-400">✓</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm opacity-80 mt-2">
                        Total unique quadruplets: {result.length}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FourSumTwoPointersVisualizer;
