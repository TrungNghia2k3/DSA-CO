import React, { useState, useRef } from 'react';

const FourSumBruteForceVisualizer = () => {
    const [inputValue, setInputValue] = useState('1,0,-1,0,-2,2');
    const [target, setTarget] = useState(0);
    const [currentIndices, setCurrentIndices] = useState({ a: -1, b: -1, c: -1, d: -1 });
    const [result, setResult] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin 4Sum Brute Force visualization');
    const [stepCount, setStepCount] = useState(0);
    const [inputArray, setInputArray] = useState([1, 0, -1, 0, -2, 2]);
    const [foundQuadruplets, setFoundQuadruplets] = useState(new Set());

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ a: 0, b: 1, c: 2, d: 3 });

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
        
        // Reset state
        algorithmStateRef.current = { a: 0, b: 1, c: 2, d: 3 };
        setResult([]);
        setFoundQuadruplets(new Set());
        setIsRunning(true);
        setStepCount(0);
        setCurrentIndices({ a: 0, b: 1, c: 2, d: 3 });
        setCurrentSum(null);
        setMessage('Starting 4Sum Brute Force visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm(sorted);
        }, 1000);
    };

    const stepThroughAlgorithm = (nums) => {
        const state = algorithmStateRef.current;
        const n = nums.length;

        // Check if we've completed all combinations
        if (state.a >= n - 3) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ a: -1, b: -1, c: -1, d: -1 });
            setCurrentSum(null);
            setMessage(`Algorithm complete! Found ${result.length} unique quadruplets.`);
            return;
        }

        // Calculate current quadruplet sum
        const currentQuadSum = nums[state.a] + nums[state.b] + nums[state.c] + nums[state.d];
        
        setCurrentIndices({ a: state.a, b: state.b, c: state.c, d: state.d });
        setCurrentSum(currentQuadSum);
        setStepCount(prev => prev + 1);

        // Check if this quadruplet sums to target
        if (currentQuadSum === target) {
            const quadruplet = [nums[state.a], nums[state.b], nums[state.c], nums[state.d]];
            const quadKey = JSON.stringify(quadruplet);
            
            if (!foundQuadruplets.has(quadKey)) {
                setFoundQuadruplets(prev => new Set([...prev, quadKey]));
                setResult(prev => [...prev, quadruplet]);
                setMessage(`Found quadruplet: [${quadruplet.join(', ')}] = ${currentQuadSum}`);
            } else {
                setMessage(`Duplicate quadruplet skipped: [${quadruplet.join(', ')}] = ${currentQuadSum}`);
            }
        } else {
            setMessage(`Checking: [${nums[state.a]}, ${nums[state.b]}, ${nums[state.c]}, ${nums[state.d]}] = ${currentQuadSum} ≠ ${target}`);
        }

        // Move to next combination
        state.d++;
        if (state.d >= n) {
            state.c++;
            state.d = state.c + 1;
            
            if (state.c >= n - 1) {
                state.b++;
                state.c = state.b + 1;
                state.d = state.c + 1;
                
                if (state.b >= n - 2) {
                    state.a++;
                    state.b = state.a + 1;
                    state.c = state.b + 1;
                    state.d = state.c + 1;
                }
            }
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ a: -1, b: -1, c: -1, d: -1 });
        setResult([]);
        setFoundQuadruplets(new Set());
        setCurrentSum(null);
        setMessage('Click "Start" to begin 4Sum Brute Force visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { a, b, c, d } = currentIndices;
        if (index === a) {
            return 'element-secondary'; // First element (a)
        }
        if (index === b) {
            return 'element-tertiary'; // Second element (b)
        }
        if (index === c) {
            return 'element-active'; // Third element (c)
        }
        if (index === d) {
            return 'element-primary'; // Fourth element (d)
        }
        return 'element-inactive'; // Default
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">4Sum - Brute Force Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n⁴) Brute Force</h3>
                <p className="text-sm">
                    Check every possible quadruplet using four nested loops. 
                    Use sorting and set to handle duplicates.
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> For each a, b, c, d where a &lt; b &lt; c &lt; d, 
                    check if nums[a] + nums[b] + nums[c] + nums[d] equals target.
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
                    {currentIndices.a !== -1 && (
                        <span className="ml-4">
                            Checking: a={currentIndices.a}, b={currentIndices.b}, c={currentIndices.c}, d={currentIndices.d}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-secondary"></div>
                    <span>a (first index)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-tertiary"></div>
                    <span>b (second index)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-active"></div>
                    <span>c (third index)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-primary"></div>
                    <span>d (fourth index)</span>
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
            {currentIndices.a !== -1 && currentIndices.b !== -1 && currentIndices.c !== -1 && currentIndices.d !== -1 && (
                <div className="message-warning">
                    <h4 className="font-semibold mb-2">Current Quadruplet:</h4>
                    <div className="text-lg">
                        <span className="text-blue-400 font-bold">
                            {inputArray[currentIndices.a]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-green-400 font-bold">
                            {inputArray[currentIndices.b]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-yellow-400 font-bold">
                            {inputArray[currentIndices.c]}
                        </span>
                        <span className="mx-2">+</span>
                        <span className="text-purple-400 font-bold">
                            {inputArray[currentIndices.d]}
                        </span>
                        <span className="mx-2">=</span>
                        <span className={currentSum === target ? 'text-green-400 font-bold' : 'text-gray-300'}>
                            {currentSum}
                        </span>
                    </div>
                    <div className="text-sm mt-2">
                        Indices: [{currentIndices.a}, {currentIndices.b}, {currentIndices.c}, {currentIndices.d}]
                        <span className="ml-4">
                            {currentSum === target ? 
                                <span className="text-green-400">✓ Target match!</span> : 
                                <span className="text-gray-400">Target: {target}</span>
                            }
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

export default FourSumBruteForceVisualizer;
