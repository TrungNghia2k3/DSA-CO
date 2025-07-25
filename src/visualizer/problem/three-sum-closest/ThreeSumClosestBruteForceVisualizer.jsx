import React, { useState, useRef } from 'react';

const ThreeSumClosestBruteForceVisualizer = () => {
    const [inputValue, setInputValue] = useState('-1,2,1,-4');
    const [target, setTarget] = useState(1);
    const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1, k: -1 });
    const [result, setResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [closestSum, setClosestSum] = useState(null);
    const [minDistance, setMinDistance] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin 3Sum Closest Brute Force visualization');
    const [stepCount, setStepCount] = useState(0);
    const [inputArray, setInputArray] = useState([-1, 2, 1, -4]);

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ i: 0, j: 1, k: 2 });

    const startVisualization = () => {
        if (isRunning) return;
        
        // Parse the input array
        const parsedArray = inputValue
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num));
        
        if (parsedArray.length < 3) {
            setMessage('Array must have at least 3 elements');
            return;
        }

        setInputArray(parsedArray);
        
        // Initialize with first triplet
        const initialSum = parsedArray[0] + parsedArray[1] + parsedArray[2];
        const initialDistance = Math.abs(target - initialSum);
        
        // Reset state
        algorithmStateRef.current = { i: 0, j: 1, k: 2 };
        setResult(null);
        setIsRunning(true);
        setStepCount(0);
        setCurrentIndices({ i: 0, j: 1, k: 2 });
        setCurrentSum(initialSum);
        setClosestSum(initialSum);
        setMinDistance(initialDistance);
        setMessage(`Starting with first triplet: ${parsedArray[0]} + ${parsedArray[1]} + ${parsedArray[2]} = ${initialSum}`);

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm(parsedArray);
        }, 1500);
    };

    const stepThroughAlgorithm = (nums) => {
        const state = algorithmStateRef.current;

        // Check if we've completed all combinations
        if (state.i >= nums.length - 2) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, j: -1, k: -1 });
            setCurrentSum(null);
            setResult(closestSum);
            setMessage(`Algorithm complete! Closest sum found: ${closestSum} (distance: ${minDistance})`);
            return;
        }

        // Move to next valid combination
        state.k++;
        if (state.k >= nums.length) {
            state.j++;
            state.k = state.j + 1;
            
            if (state.j >= nums.length - 1) {
                state.i++;
                state.j = state.i + 1;
                state.k = state.j + 1;
            }
        }

        // Check if we've exhausted all combinations
        if (state.i >= nums.length - 2) {
            return; // Will be caught by the first condition in next iteration
        }

        // Calculate current triplet
        const currentTripletSum = nums[state.i] + nums[state.j] + nums[state.k];
        const currentDistance = Math.abs(target - currentTripletSum);
        
        setCurrentIndices({ i: state.i, j: state.j, k: state.k });
        setCurrentSum(currentTripletSum);
        setStepCount(prev => prev + 1);

        // Check if this is the exact target
        if (currentTripletSum === target) {
            setClosestSum(currentTripletSum);
            setMinDistance(0);
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setResult(currentTripletSum);
            setMessage(`Found exact target! ${nums[state.i]} + ${nums[state.j]} + ${nums[state.k]} = ${currentTripletSum}`);
            return;
        }

        // Check if this is closer than our current best
        if (currentDistance < minDistance) {
            setClosestSum(currentTripletSum);
            setMinDistance(currentDistance);
            setMessage(`New closest sum found! ${nums[state.i]} + ${nums[state.j]} + ${nums[state.k]} = ${currentTripletSum} (distance: ${currentDistance})`);
        } else {
            setMessage(`Checking: ${nums[state.i]} + ${nums[state.j]} + ${nums[state.k]} = ${currentTripletSum} (distance: ${currentDistance})`);
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ i: -1, j: -1, k: -1 });
        setResult(null);
        setCurrentSum(null);
        setClosestSum(null);
        setMinDistance(null);
        setMessage('Click "Start" to begin 3Sum Closest Brute Force visualization');
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
            <h2 className="text-xl font-bold mb-4">3Sum Closest - Brute Force Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n³) Brute Force</h3>
                <p className="text-sm">
                    Check every possible triplet using three nested loops. 
                    Track the triplet with sum closest to target.
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> For each i, j, k where i &lt; j &lt; k, 
                    calculate sum and update closest if distance to target is smaller.
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
                    {currentSum !== null && (
                        <span className="ml-4">
                            Current Sum: <span className="text-gray-300">{currentSum}</span>
                        </span>
                    )}
                    {closestSum !== null && (
                        <span className="ml-4">
                            Closest Sum: <span className="text-green-400 font-bold">{closestSum}</span>
                        </span>
                    )}
                    {minDistance !== null && (
                        <span className="ml-4">
                            Min Distance: <span className="text-blue-400">{minDistance}</span>
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
                <h4 className="font-semibold mb-2">Array:</h4>
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

            {/* Current Triplet */}
            {currentIndices.i !== -1 && currentIndices.j !== -1 && currentIndices.k !== -1 && (
                <div className="message-warning">
                    <h4 className="font-semibold mb-2">Current Triplet:</h4>
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
                        <span className="mx-2">=</span>
                        <span className="text-gray-300 font-bold">
                            {currentSum}
                        </span>
                    </div>
                    <div className="text-sm mt-2">
                        <span>Distance from target ({target}): </span>
                        <span className="font-bold">
                            |{currentSum} - {target}| = {Math.abs(currentSum - target)}
                        </span>
                        {closestSum !== null && minDistance !== null && (
                            <span className="ml-4">
                                {Math.abs(currentSum - target) < minDistance ? 
                                    <span className="text-green-400">✓ New best!</span> : 
                                    <span className="text-gray-400">Current best: {minDistance}</span>
                                }
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Current Best Tracking */}
            {closestSum !== null && minDistance !== null && (
                <div className="mb-4 p-3 bg-gray-800 rounded border border-gray-700">
                    <h4 className="font-semibold mb-2 text-green-400">Best So Far:</h4>
                    <div className="text-sm">
                        <div>Closest Sum: <span className="font-bold text-green-400">{closestSum}</span></div>
                        <div>Distance: <span className="font-bold text-blue-400">{minDistance}</span></div>
                        <div>Target: <span className="font-bold">{target}</span></div>
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
            {result !== null && (
                <div className="message-success">
                    <h4 className="font-semibold mb-2">Final Result!</h4>
                    <div className="bg-gray-800 text-gray-300 p-3 rounded border border-gray-700">
                        <div className="text-lg">
                            <strong>Closest Sum:</strong> {result}
                        </div>
                        <div className="text-sm opacity-80 mt-1">
                            Distance from target ({target}): {Math.abs(result - target)}
                        </div>
                        <div className="text-sm opacity-80">
                            {result === target ? 'Exact match found!' : `Best approximation with distance ${Math.abs(result - target)}`}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThreeSumClosestBruteForceVisualizer;
