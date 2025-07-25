import React, { useState, useRef } from 'react';

const ThreeSumBruteForceVisualizer = () => {
    const [inputArray, setInputArray] = useState([-1, 0, 1, 2, -1, -4]);
    const [inputValue, setInputValue] = useState('-1,0,1,2,-1,-4');
    const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1, k: -1 });
    const [result, setResult] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(null);
    const [message, setMessage] = useState('Click "Start" to begin Three Sum visualization');
    const [stepCount, setStepCount] = useState(0);

    const intervalRef = useRef(null);
    const stepRef = useRef({ i: 0, j: 1, k: 2 });
    const resultSetRef = useRef(new Set());
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
        stepRef.current = { i: 0, j: 1, k: 2 };
        resultSetRef.current = new Set();
        setResult([]);
        setIsRunning(true);
        setStepCount(0);
        setMessage('Starting Three Sum Brute Force visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm();
        }, 1000);
    };

    const stepThroughAlgorithm = () => {
        const nums = sortedArrayRef.current;
        const { i, j, k } = stepRef.current;

        if (i >= nums.length - 2) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndices({ i: -1, j: -1, k: -1 });
            setCurrentSum(null);
            setMessage(`Algorithm complete! Found ${resultSetRef.current.size} unique triplets.`);
            return;
        }

        // Update current indices for visualization
        setCurrentIndices({ i, j, k });
        setStepCount(prev => prev + 1);

        // Calculate current sum
        const sum = nums[i] + nums[j] + nums[k];
        setCurrentSum(sum);

        if (sum === 0) {
            const triplet = [nums[i], nums[j], nums[k]];
            const tripletStr = JSON.stringify(triplet);
            
            if (!resultSetRef.current.has(tripletStr)) {
                resultSetRef.current.add(tripletStr);
                setResult(prev => [...prev, triplet]);
                setMessage(`Found triplet: [${triplet.join(', ')}] = ${sum}`);
            } else {
                setMessage(`Duplicate triplet: [${triplet.join(', ')}] = ${sum}`);
            }
        } else {
            setMessage(`Checking: [${nums[i]}, ${nums[j]}, ${nums[k]}] = ${sum}`);
        }

        // Move to next combination
        stepRef.current.k++;
        if (stepRef.current.k >= nums.length) {
            stepRef.current.j++;
            stepRef.current.k = stepRef.current.j + 1;
            
            if (stepRef.current.k >= nums.length) {
                stepRef.current.i++;
                stepRef.current.j = stepRef.current.i + 1;
                stepRef.current.k = stepRef.current.j + 1;
            }
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
        setMessage('Click "Start" to begin Three Sum visualization');
        setStepCount(0);
        resultSetRef.current = new Set();
    };

    const getCellStyle = (index) => {
        const { i, j, k } = currentIndices;
        if (index === i) return 'bg-red-400 text-white font-bold';
        if (index === j) return 'bg-blue-400 text-white font-bold';
        if (index === k) return 'bg-green-400 text-white font-bold';
        return 'layout-default-bg';
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Three Sum - Brute Force Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation mb-4">
                <h3 className="font-semibold mb-2">Algorithm: O(n³) Brute Force</h3>
                <p className="text-sm">
                    Uses three nested loops to check every possible triplet combination. 
                    Time complexity: O(n³), Space complexity: O(1)
                </p>
            </div>

            {/* Input */}
            <div className="mb-4">
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

            {/* Status */}
            <div className="message-info mb-4">
                <p className="font-medium">{message}</p>
                <div className="text-sm mt-1 opacity-80">
                    <span>Steps: {stepCount}</span>
                    {currentSum !== null && (
                        <span className="ml-4">
                            Current Sum: <span className={currentSum === 0 ? 'text-green-400 font-bold' : 'text-gray-300'}>{currentSum}</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-tertiary rounded"></div>
                    <span className="text-gray-300">i (first pointer)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-secondary rounded"></div>
                    <span className="text-gray-300">j (second pointer)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-active rounded"></div>
                    <span className="text-gray-300">k (third pointer)</span>
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
                                p-3 min-w-[50px] text-center rounded
                                ${getCellStyle(index)}
                                transition-colors duration-300
                            `}
                        >
                            <div className="font-bold">{num}</div>
                            <div className="text-xs">{index}</div>
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
                            <div key={index} className="bg-gray-800 text-gray-300 p-2 rounded border border-gray-700">
                                [{triplet.join(', ')}]
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

export default ThreeSumBruteForceVisualizer;
