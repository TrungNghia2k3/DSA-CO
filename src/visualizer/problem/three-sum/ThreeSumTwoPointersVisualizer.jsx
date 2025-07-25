import React, { useState, useRef } from 'react';

const ThreeSumTwoPointersVisualizer = () => {
    const [inputArray, setInputArray] = useState([-1, 0, 1, 2, -1, -4]);
    const [inputValue, setInputValue] = useState('-1,0,1,2,-1,-4');
    const [currentIndices, setCurrentIndices] = useState({ i: -1, left: -1, right: -1 });
    const [result, setResult] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin Three Sum Two Pointers visualization');
    const [stepCount, setStepCount] = useState(0);
    const [phase, setPhase] = useState('init'); // 'init', 'searching', 'found', 'moving'

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ i: 0, left: 1, right: 0 });
    const sortedArrayRef = useRef([]);

    const startVisualization = () => {
        if (isRunning) return;
        
        // Parse and sort the input array
        const parsedArray = inputValue
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num));
        
        if (parsedArray.length < 3) {
            setMessage('Array must have at least 3 elements');
            return;
        }

        const sorted = [...parsedArray].sort((a, b) => a - b);
        setInputArray(sorted);
        sortedArrayRef.current = sorted;
        
        // Reset state
        algorithmStateRef.current = { i: 0, left: 1, right: sorted.length - 1 };
        setResult([]);
        setIsRunning(true);
        setStepCount(0);
        setPhase('init');
        setMessage('Starting Three Sum Two Pointers visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm();
        }, 1200);
    };

    const stepThroughAlgorithm = () => {
        const nums = sortedArrayRef.current;
        const state = algorithmStateRef.current;

        if (state.i >= nums.length - 2) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, left: -1, right: -1 });
            setCurrentSum(null);
            setPhase('complete');
            setMessage(`Algorithm complete! Found ${result.length} unique triplets.`);
            return;
        }

        // Skip positive numbers for i (optimization)
        if (nums[state.i] > 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, left: -1, right: -1 });
            setCurrentSum(null);
            setPhase('complete');
            setMessage(`Algorithm complete! Found ${result.length} unique triplets.`);
            return;
        }

        // Skip duplicates for i
        if (state.i > 0 && nums[state.i] === nums[state.i - 1]) {
            state.i++;
            state.left = state.i + 1;
            state.right = nums.length - 1;
            setMessage(`Skipping duplicate at i=${state.i - 1}`);
            return;
        }

        // Update visualization
        setCurrentIndices({ i: state.i, left: state.left, right: state.right });
        setStepCount(prev => prev + 1);

        if (state.left >= state.right) {
            // Move to next i
            state.i++;
            state.left = state.i + 1;
            state.right = nums.length - 1;
            setPhase('init');
            setMessage(`Moving to next i=${state.i}`);
            return;
        }

        // Calculate current sum
        const sum = nums[state.i] + nums[state.left] + nums[state.right];
        setCurrentSum(sum);

        if (sum === 0) {
            const triplet = [nums[state.i], nums[state.left], nums[state.right]];
            setResult(prev => [...prev, triplet]);
            setPhase('found');
            setMessage(`Found triplet: [${triplet.join(', ')}] = ${sum}`);
            
            // Move both pointers and skip duplicates
            state.left++;
            state.right--;
            
            while (state.left < state.right && nums[state.left] === nums[state.left - 1]) {
                state.left++;
            }
        } else if (sum < 0) {
            setPhase('moving');
            setMessage(`Sum ${sum} < 0, moving left pointer right`);
            state.left++;
        } else {
            setPhase('moving');
            setMessage(`Sum ${sum} > 0, moving right pointer left`);
            state.right--;
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndices({ i: -1, left: -1, right: -1 });
        setResult([]);
        setCurrentSum(null);
        setPhase('init');
        setMessage('Click "Start" to begin Three Sum Two Pointers visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        const { i, left, right } = currentIndices;
        if (index === i) return 'bg-red-500 text-white font-bold border-red-600';
        if (index === left) return 'bg-blue-500 text-white font-bold border-blue-600';
        if (index === right) return 'bg-green-500 text-white font-bold border-green-600';
        if (i !== -1 && index > i && index < left) return 'bg-gray-300 border-gray-400';
        if (i !== -1 && index > right) return 'bg-gray-300 border-gray-400';
        return 'layout-default-bg';
    };

    const getPhaseColor = () => {
        switch (phase) {
            case 'found': return 'text-green-600';
            case 'moving': return 'text-blue-600';
            case 'complete': return 'text-purple-600';
            default: return 'text-gray-700';
        }
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Three Sum - Two Pointers Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n²) Two Pointers</h3>
                <p className="text-sm">
                    Fix one element and use two pointers to find pairs that sum to zero. 
                    Time complexity: O(n²), Space complexity: O(1)
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> For each i, use left and right pointers. 
                    If sum &lt; 0, move left right. If sum &gt; 0, move right left.
                </div>
            </div>

            {/* Input */}
            <div className="mb-4">
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

            {/* Status */}
            <div className="message-info">
                <p className={`font-medium ${getPhaseColor()}`}>{message}</p>
                <div className="text-sm opacity-80 mt-1">
                    <span>Steps: {stepCount}</span>
                    {currentSum !== null && (
                        <span className="ml-4">
                            Current Sum: <span className={currentSum === 0 ? 'text-green-400 font-bold' : 'text-gray-300'}>{currentSum}</span>
                        </span>
                    )}
                    {currentIndices.i !== -1 && (
                        <span className="ml-4">
                            Indices: i={currentIndices.i}, left={currentIndices.left}, right={currentIndices.right}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-active"></div>
                    <span>i (fixed element)</span>
                </div>
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
                    <span>excluded range</span>
                </div>
            </div>

            {/* Array Visualization */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Sorted Array:</h4>
                <div className="flex gap-2 flex-wrap">
                    {inputArray.map((num, index) => (
                        <div
                            key={index}
                            className={`
                                p-3 min-w-[50px] text-center rounded
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
                    <h4 className="font-semibold mb-2">Found Triplets (sum = 0):</h4>
                    <div className="space-y-2">
                        {result.map((triplet, index) => (
                            <div key={index} className="bg-gray-800 text-gray-300 p-2 rounded border border-gray-700 flex justify-between">
                                <span>[{triplet.join(', ')}]</span>
                                <span className="text-green-400">✓</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm opacity-80 mt-2">
                        Total unique triplets: {result.length}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ThreeSumTwoPointersVisualizer;
