import React, { useState, useRef } from 'react';

const FourSumTwoPointersRegularVisualizer = () => {
    const [inputValue, setInputValue] = useState('1,0,-1,0,-2,2');
    const [target, setTarget] = useState(0);
    const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1, left: -1, right: -1 });
    const [result, setResult] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin 4Sum Two Pointers visualization');
    const [stepCount, setStepCount] = useState(0);
    const [inputArray, setInputArray] = useState([1, 0, -1, 0, -2, 2]);
    const [phase, setPhase] = useState('init'); // 'init', 'outer', 'inner', 'pointers'

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ i: 0, j: 1, left: 2, right: 0 });

    const startVisualization = () => {
        if (isRunning) return;
        
        // Parse the input array
        const parsedArray = inputValue
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num));
        
        if (parsedArray.length < 4) {
            setMessage('Array must have at least 4 elements');
            return;
        }

        // Sort array for two pointers technique
        const sorted = [...parsedArray].sort((a, b) => a - b);
        setInputArray(sorted);
        
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
        setCurrentIndices({ i: 0, j: 1, left: 2, right: sorted.length - 1 });
        setCurrentSum(null);
        setPhase('outer');
        setMessage('Starting 4Sum Two Pointers visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm(sorted);
        }, 1200);
    };

    const stepThroughAlgorithm = (nums) => {
        const state = algorithmStateRef.current;
        const n = nums.length;

        // Check if we've completed all combinations
        if (state.i >= n - 3) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, j: -1, left: -1, right: -1 });
            setCurrentSum(null);
            setPhase('complete');
            setMessage(`Algorithm complete! Found ${result.length} unique quadruplets.`);
            return;
        }

        // Skip duplicates for i
        if (state.i > 0 && nums[state.i] === nums[state.i - 1]) {
            state.i++;
            state.j = state.i + 1;
            state.left = state.j + 1;
            state.right = n - 1;
            return;
        }

        if (state.j >= n - 2) {
            state.i++;
            state.j = state.i + 1;
            state.left = state.j + 1;
            state.right = n - 1;
            return;
        }

        // Skip duplicates for j
        if (state.j > state.i + 1 && nums[state.j] === nums[state.j - 1]) {
            state.j++;
            state.left = state.j + 1;
            state.right = n - 1;
            return;
        }

        if (state.left >= state.right) {
            state.j++;
            state.left = state.j + 1;
            state.right = n - 1;
            return;
        }

        // Calculate current quadruplet sum
        const currentQuadSum = nums[state.i] + nums[state.j] + nums[state.left] + nums[state.right];
        
        setCurrentIndices({ i: state.i, j: state.j, left: state.left, right: state.right });
        setCurrentSum(currentQuadSum);
        setStepCount(prev => prev + 1);
        setPhase('pointers');

        if (currentQuadSum === target) {
            const quadruplet = [nums[state.i], nums[state.j], nums[state.left], nums[state.right]];
            setResult(prev => [...prev, quadruplet]);
            setMessage(`Found quadruplet: [${quadruplet.join(', ')}] = ${target}`);
            
            // Move both pointers and skip duplicates
            state.left++;
            state.right--;
            while (state.left < state.right && nums[state.left] === nums[state.left - 1]) {
                state.left++;
            }
            while (state.left < state.right && nums[state.right] === nums[state.right + 1]) {
                state.right--;
            }
        } else if (currentQuadSum < target) {
            setMessage(`Sum ${currentQuadSum} < ${target}, move left pointer right`);
            state.left++;
        } else {
            setMessage(`Sum ${currentQuadSum} > ${target}, move right pointer left`);
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
        setPhase('init');
        setMessage('Click "Start" to begin 4Sum Two Pointers visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { i, j, left, right } = currentIndices;
        if (index === i) {
            return 'element-secondary'; // First element (i)
        }
        if (index === j) {
            return 'element-tertiary'; // Second element (j)
        }
        if (index === left) {
            return 'element-active'; // Left pointer
        }
        if (index === right) {
            return 'element-primary'; // Right pointer
        }
        return 'element-inactive'; // Default
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">4Sum - Two Pointers Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n³) Two Pointers</h3>
                <p className="text-sm">
                    Fix two elements with nested loops, then use two pointers for the remaining pair.
                    Requires sorted array for pointer movement logic.
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> For each i, j, use left and right pointers to find 
                    the remaining two elements that complete the target sum.
                </div>
            </div>

            {/* Input Controls */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Array (comma-separated):</label>
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
                    <span className="ml-4">Found: {result.length} quadruplets</span>
                    {currentSum !== null && (
                        <span className="ml-4">
                            Current Sum: <span className={currentSum === target ? 'text-green-400 font-bold' : 'text-gray-300'}>{currentSum}</span>
                        </span>
                    )}
                    {currentIndices.i !== -1 && (
                        <span className="ml-4">
                            Indices: i={currentIndices.i}, j={currentIndices.j}, L={currentIndices.left}, R={currentIndices.right}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-secondary"></div>
                    <span>i (fixed first)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-tertiary"></div>
                    <span>j (fixed second)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-active"></div>
                    <span>left pointer</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-primary"></div>
                    <span>right pointer</span>
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

            {/* Current Quadruplet */}
            {currentIndices.i !== -1 && currentIndices.j !== -1 && currentIndices.left !== -1 && currentIndices.right !== -1 && (
                <div className="message-warning">
                    <h4 className="font-semibold mb-2">Current Quadruplet:</h4>
                    <div className="text-lg">
                        <span className="text-blue-400 font-bold">
                            {inputArray[currentIndices.i]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-green-400 font-bold">
                            {inputArray[currentIndices.j]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-yellow-400 font-bold">
                            {inputArray[currentIndices.left]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-purple-400 font-bold">
                            {inputArray[currentIndices.right]}
                        </span>
                        <span className="mx-2">=</span>
                        <span className={currentSum === target ? 'text-green-400 font-bold' : 'text-gray-300'}>
                            {currentSum}
                        </span>
                    </div>
                    <div className="text-sm mt-2">
                        Fixed: nums[{currentIndices.i}] = {inputArray[currentIndices.i]}, nums[{currentIndices.j}] = {inputArray[currentIndices.j]}
                        <span className="ml-4">
                            Two Pointers: L={currentIndices.left}, R={currentIndices.right}
                        </span>
                    </div>
                    <div className="text-xs mt-1 opacity-80">
                        {currentSum === target ? 
                            '✓ Target match! Adding to result.' : 
                            currentSum < target ? 
                                '→ Sum too small, move left pointer right' : 
                                '← Sum too large, move right pointer left'
                        }
                    </div>
                </div>
            )}

            {/* Two Pointers Strategy */}
            {phase === 'pointers' && currentIndices.left !== -1 && currentIndices.right !== -1 && (
                <div className="mb-4 p-3 bg-gray-800 rounded border border-gray-700">
                    <h4 className="font-semibold mb-2 text-blue-400">Two Pointers Strategy:</h4>
                    <div className="text-sm space-y-1">
                        <div>• Fixed elements: nums[{currentIndices.i}] = {inputArray[currentIndices.i]}, nums[{currentIndices.j}] = {inputArray[currentIndices.j]}</div>
                        <div>• Target for remaining two: {target} - ({inputArray[currentIndices.i]} + {inputArray[currentIndices.j]}) = {target - (inputArray[currentIndices.i] + inputArray[currentIndices.j])}</div>
                        <div>• Current two-sum: {inputArray[currentIndices.left]} + {inputArray[currentIndices.right]} = {inputArray[currentIndices.left] + inputArray[currentIndices.right]}</div>
                        <div className="text-blue-300">
                            • Next move: {currentSum < target ? 'Move left pointer right (increase sum)' : 
                                        currentSum > target ? 'Move right pointer left (decrease sum)' : 
                                        'Found match! Move both pointers and continue'}
                        </div>
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
                    <h4 className="font-semibold mb-2">Found Quadruplets:</h4>
                    <div className="bg-gray-800 text-gray-300 p-3 rounded border border-gray-700">
                        {result.map((quad, index) => (
                            <div key={index} className="mb-1">
                                <strong>#{index + 1}:</strong> [{quad.join(', ')}] = {quad.reduce((a, b) => a + b, 0)}
                            </div>
                        ))}
                        <div className="text-sm opacity-80 mt-2">
                            Total unique quadruplets found: {result.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FourSumTwoPointersRegularVisualizer;
