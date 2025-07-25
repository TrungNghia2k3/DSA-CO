import React, { useState, useRef } from 'react';

const TwoSumIIBinarySearchVisualizer = () => {
    const [inputArray, setInputArray] = useState([2, 7, 11, 15]);
    const [inputValue, setInputValue] = useState('2,7,11,15');
    const [target, setTarget] = useState(9);
    const [currentIndices, setCurrentIndices] = useState({ i: -1, left: -1, right: -1, mid: -1 });
    const [result, setResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [complement, setComplement] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin Two Sum II Binary Search visualization');
    const [stepCount, setStepCount] = useState(0);
    const [phase, setPhase] = useState('selecting'); // 'selecting', 'searching', 'found', 'notfound'

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ i: 0, left: 1, right: 0, searchTarget: 0 });

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
        algorithmStateRef.current = { 
            i: 0, 
            left: 1, 
            right: parsedArray.length - 1,
            searchTarget: target - parsedArray[0],
            phase: 'selecting'
        };
        setResult(null);
        setIsRunning(true);
        setStepCount(0);
        setPhase('selecting');
        setCurrentIndices({ i: -1, left: -1, right: -1, mid: -1 });
        setComplement(null);
        setCurrentSum(null);
        setMessage('Starting Two Sum II Binary Search visualization...');

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
            setCurrentIndices({ i: -1, left: -1, right: -1, mid: -1 });
            setCurrentSum(null);
            setComplement(null);
            setPhase('notfound');
            setMessage('Algorithm complete! No solution found.');
            return;
        }

        if (state.phase === 'selecting') {
            // Select current element and calculate complement
            const comp = target - nums[state.i];
            state.searchTarget = comp;
            state.left = state.i + 1;
            state.right = nums.length - 1;
            state.phase = 'searching';
            
            setCurrentIndices({ i: state.i, left: state.left, right: state.right, mid: -1 });
            setComplement(comp);
            setStepCount(prev => prev + 1);
            setPhase('searching');
            setMessage(`Selected nums[${state.i}] = ${nums[state.i]}, searching for complement ${comp} in range [${state.left}, ${state.right}]`);
            return;
        }

        if (state.phase === 'searching') {
            if (state.left > state.right) {
                // Binary search failed for this element, move to next
                state.i++;
                state.phase = 'selecting';
                setPhase('selecting');
                setMessage(`Complement ${state.searchTarget} not found, trying next element...`);
                return;
            }

            const mid = state.left + Math.floor((state.right - state.left) / 2);
            setCurrentIndices({ i: state.i, left: state.left, right: state.right, mid });
            setStepCount(prev => prev + 1);

            if (nums[mid] === state.searchTarget) {
                // Found the complement
                const solution = [state.i + 1, mid + 1]; // 1-indexed
                setResult(solution);
                setCurrentSum(nums[state.i] + nums[mid]);
                clearInterval(intervalRef.current);
                setIsRunning(false);
                setPhase('found');
                setMessage(`Found solution: nums[${state.i}] + nums[${mid}] = ${nums[state.i]} + ${nums[mid]} = ${target}`);
                return;
            } else if (nums[mid] < state.searchTarget) {
                setMessage(`nums[${mid}] = ${nums[mid]} < ${state.searchTarget}, search right half`);
                state.left = mid + 1;
            } else {
                setMessage(`nums[${mid}] = ${nums[mid]} > ${state.searchTarget}, search left half`);
                state.right = mid - 1;
            }
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ i: -1, left: -1, right: -1, mid: -1 });
        setResult(null);
        setCurrentSum(null);
        setComplement(null);
        setPhase('selecting');
        setMessage('Click "Start" to begin Two Sum II Binary Search visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { i, left, right, mid } = currentIndices;
        if (index === i) return 'bg-red-500 text-white font-bold border-red-600';
        if (index === mid) return 'bg-purple-500 text-white font-bold border-purple-600';
        if (index === left && index === right) return 'bg-orange-400 text-white font-bold border-orange-500';
        if (index === left) return 'bg-blue-500 text-white font-bold border-blue-600';
        if (index === right) return 'bg-green-500 text-white font-bold border-green-600';
        if (left !== -1 && right !== -1 && index > left && index < right) {
            return 'bg-yellow-600 border-yellow-600';
        }
        if (i !== -1 && index <= i) return 'bg-gray-300 border-gray-400';
        return 'layout-default-bg';
    };

    const getPhaseColor = () => {
        switch (phase) {
            case 'found': return 'text-green-600';
            case 'searching': return 'text-blue-600';
            case 'notfound': return 'text-red-600';
            default: return 'text-gray-700';
        }
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Two Sum II - Binary Search Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n log n) Binary Search</h3>
                <p className="text-sm">
                    For each element, use binary search to find its complement in the remaining array.
                    Time complexity: O(n log n), Space complexity: O(1)
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> Fix one element, binary search for target - element in the rest.
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
                <p className={`font-medium ${getPhaseColor()}`}>{message}</p>
                <div className="text-sm text-gray-600 mt-1">
                    <span>Steps: {stepCount}</span>
                    <span className="ml-4">Target: {target}</span>
                    {complement !== null && (
                        <span className="ml-4">Searching for: {complement}</span>
                    )}
                    {currentSum !== null && (
                        <span className="ml-4">
                            Sum: <span className="text-green-600 font-bold">{currentSum}</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded border border-red-600"></div>
                    <span>current element (i)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-active"></div>
                    <span>mid (binary search)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-secondary"></div>
                    <span>left boundary</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-tertiary"></div>
                    <span>right boundary</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-inactive"></div>
                    <span>search range</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded border border-gray-400"></div>
                    <span>already processed</span>
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Operation */}
            {phase === 'searching' && currentIndices.i !== -1 && (
                <div className="message-info">
                    <h4 className="font-semibold mb-2">Binary Search Progress:</h4>
                    <div className="text-sm space-y-1">
                        <div>
                            <strong>Fixed element:</strong> nums[{currentIndices.i}] = {inputArray[currentIndices.i]}
                        </div>
                        <div>
                            <strong>Looking for:</strong> {complement} (complement to reach {target})
                        </div>
                        <div>
                            <strong>Search range:</strong> [{currentIndices.left}, {currentIndices.right}]
                        </div>
                        {currentIndices.mid !== -1 && (
                            <div>
                                <strong>Mid:</strong> nums[{currentIndices.mid}] = {inputArray[currentIndices.mid]}
                            </div>
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

            {/* Result */}
            {result && (
                <div className="message-success">
                    <h4 className="font-semibold mb-2">Solution Found!</h4>
                    <div className="bg-gray-800 text-gray-300 p-3 rounded border border-gray-700">
                        <div className="text-lg">
                            <strong>Indices (1-based):</strong> [{result.join(', ')}]
                        </div>
                        <div className="text-sm opacity-80 mt-1">
                            Values: {inputArray[result[0] - 1]} + {inputArray[result[1] - 1]} = {currentSum}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwoSumIIBinarySearchVisualizer;
