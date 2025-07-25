import React, { useState, useRef } from 'react';

const FourSumHashMapVisualizer = () => {
    const [inputValue, setInputValue] = useState('1,0,-1,0,-2,2');
    const [target, setTarget] = useState(0);
    const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1, k: -1 });
    const [result, setResult] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [needed, setNeeded] = useState(null);
    const [hashMap, setHashMap] = useState(new Map());
    const [message, setMessage] = useState('Click "Start" to begin 4Sum Hash Map visualization');
    const [stepCount, setStepCount] = useState(0);
    const [inputArray, setInputArray] = useState([1, 0, -1, 0, -2, 2]);
    const [phase, setPhase] = useState('init'); // 'init', 'searching', 'restoring'

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ i: 0, j: 1, k: 2, phase: 'searching' });

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

        // Sort array for duplicate handling
        const sorted = [...parsedArray].sort((a, b) => a - b);
        setInputArray(sorted);
        
        // Initialize hash map with element counts
        const initialMap = new Map();
        sorted.forEach(num => {
            initialMap.set(num, (initialMap.get(num) || 0) + 1);
        });
        
        // Reset state
        algorithmStateRef.current = { i: 0, j: 1, k: 2, phase: 'searching' };
        setResult([]);
        setIsRunning(true);
        setStepCount(0);
        setCurrentIndices({ i: 0, j: 1, k: 2 });
        setCurrentSum(null);
        setNeeded(null);
        setHashMap(new Map(initialMap));
        setPhase('init');
        setMessage('Initializing hash map with element frequencies...');

        // Start the step-by-step visualization
        setTimeout(() => {
            setPhase('searching');
            setMessage('Starting 4Sum Hash Map visualization...');
            intervalRef.current = setInterval(() => {
                stepThroughAlgorithm(sorted, initialMap);
            }, 1200);
        }, 1000);
    };

    const stepThroughAlgorithm = (nums, initialMap) => {
        const state = algorithmStateRef.current;
        const n = nums.length;

        // Check if we've completed all combinations
        if (state.i >= n - 3) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, j: -1, k: -1 });
            setCurrentSum(null);
            setNeeded(null);
            setPhase('complete');
            setMessage(`Algorithm complete! Found ${result.length} unique quadruplets.`);
            return;
        }

        if (state.phase === 'searching') {
            // Decrement counts for i, j, k
            const currentMap = new Map(initialMap);
            
            // Remove current elements from consideration
            for (let idx = state.i; idx <= state.k; idx++) {
                currentMap.set(nums[idx], currentMap.get(nums[idx]) - 1);
            }
            
            const threeSum = nums[state.i] + nums[state.j] + nums[state.k];
            const fourth = target - threeSum;
            
            setCurrentIndices({ i: state.i, j: state.j, k: state.k });
            setCurrentSum(threeSum);
            setNeeded(fourth);
            setHashMap(new Map(currentMap));
            setStepCount(prev => prev + 1);

            // Check if the needed fourth element exists in remaining elements
            if ((currentMap.get(fourth) || 0) > 0) {
                const quadruplet = [nums[state.i], nums[state.j], nums[state.k], fourth];
                setResult(prev => [...prev, quadruplet]);
                setMessage(`Found quadruplet: [${quadruplet.join(', ')}] = ${target}`);
                setPhase('found');
                
                // Restore counts for next iteration
                state.phase = 'restoring';
                return;
            } else {
                setMessage(`Checking: [${nums[state.i]}, ${nums[state.j]}, ${nums[state.k]}, ?] - need ${fourth}, ${(currentMap.get(fourth) || 0) > 0 ? 'found' : 'not available'}`);
                state.phase = 'restoring';
                return;
            }
        }

        if (state.phase === 'restoring') {
            // Move to next combination
            state.k++;
            if (state.k >= n) {
                state.j++;
                state.k = state.j + 1;
                
                if (state.j >= n - 2) {
                    state.i++;
                    state.j = state.i + 1;
                    state.k = state.j + 1;
                }
            }
            
            // Skip duplicates
            while (state.i < n - 3 && state.i > 0 && nums[state.i] === nums[state.i - 1]) {
                state.i++;
                state.j = state.i + 1;
                state.k = state.j + 1;
            }
            while (state.j < n - 2 && state.j > state.i + 1 && nums[state.j] === nums[state.j - 1]) {
                state.j++;
                state.k = state.j + 1;
            }
            while (state.k < n - 1 && state.k > state.j + 1 && nums[state.k] === nums[state.k - 1]) {
                state.k++;
            }
            
            state.phase = 'searching';
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ i: -1, j: -1, k: -1 });
        setResult([]);
        setCurrentSum(null);
        setNeeded(null);
        setHashMap(new Map());
        setPhase('init');
        setMessage('Click "Start" to begin 4Sum Hash Map visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { i, j, k } = currentIndices;
        if (index === i) {
            return 'element-secondary'; // First element (i)
        }
        if (index === j) {
            return 'element-tertiary'; // Second element (j)
        }
        if (index === k) {
            return 'element-active'; // Third element (k)
        }
        return 'element-inactive'; // Default
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">4Sum - Hash Map Optimization Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n³) Hash Map Optimization</h3>
                <p className="text-sm">
                    Fix three elements with nested loops, then use hash map to find the fourth element.
                    Reduces the innermost loop from O(n) to O(1) average case.
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> For each i, j, k, calculate needed = target - (nums[i] + nums[j] + nums[k]) 
                    and check if needed exists in hash map.
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
                            Sum of 3: <span className="text-gray-300">{currentSum}</span>
                        </span>
                    )}
                    {needed !== null && (
                        <span className="ml-4">
                            Need: <span className="text-blue-400 font-bold">{needed}</span>
                        </span>
                    )}
                    {currentIndices.i !== -1 && (
                        <span className="ml-4">
                            Checking: i={currentIndices.i}, j={currentIndices.j}, k={currentIndices.k}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-secondary"></div>
                    <span>i (first index)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-tertiary"></div>
                    <span>j (second index)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-active"></div>
                    <span>k (third index)</span>
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

            {/* Hash Map Visualization */}
            {phase !== 'init' && hashMap.size > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold mb-2">Hash Map (Available Elements):</h4>
                    <div className="bg-gray-800 p-3 rounded border border-gray-700">
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-sm">
                            {Array.from(hashMap.entries())
                                .filter(([, count]) => count > 0)
                                .map(([num, count]) => (
                                <div
                                    key={num}
                                    className={`
                                        p-2 text-center rounded border
                                        ${needed === num ? 'border-green-400 bg-green-900 text-green-200' : 'border-gray-600 bg-gray-700'}
                                    `}
                                >
                                    <div className="font-bold">{num}</div>
                                    <div className="text-xs opacity-70">×{count}</div>
                                </div>
                            ))}
                        </div>
                        {needed !== null && (
                            <div className="mt-2 text-sm">
                                <span>Looking for: </span>
                                <span className="font-bold text-blue-400">{needed}</span>
                                <span className="ml-2">
                                    {(hashMap.get(needed) || 0) > 0 ? 
                                        <span className="text-green-400">✓ Found!</span> : 
                                        <span className="text-red-400">✗ Not available</span>
                                    }
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Current Triplet */}
            {currentIndices.i !== -1 && currentIndices.j !== -1 && currentIndices.k !== -1 && (
                <div className="message-warning">
                    <h4 className="font-semibold mb-2">Current State:</h4>
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
                            {inputArray[currentIndices.k]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-purple-400 font-bold">
                            {needed !== null ? needed : '?'}
                        </span>
                        <span className="mx-2">=</span>
                        <span className="text-gray-300 font-bold">
                            {target}
                        </span>
                    </div>
                    <div className="text-sm mt-2">
                        Three elements sum: {currentSum}
                        {needed !== null && (
                            <span className="ml-4">
                                Need fourth element: <span className="font-bold text-blue-400">{needed}</span>
                            </span>
                        )}
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

export default FourSumHashMapVisualizer;
