import React, { useState, useRef } from 'react';

const TwoSumIIHashMapVisualizer = () => {
    const [inputValue, setInputValue] = useState('2,7,11,15');
    const [target, setTarget] = useState(9);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentElement, setCurrentElement] = useState(null);
    const [complement, setComplement] = useState(null);
    const [hashMap, setHashMap] = useState(new Map());
    const [result, setResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Click "Start" to begin Two Sum II Hash Map visualization');
    const [stepCount, setStepCount] = useState(0);
    const [inputArray, setInputArray] = useState([2, 7, 11, 15]);
    const [currentStep, setCurrentStep] = useState('init');

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({ index: 0, map: new Map() });

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
        algorithmStateRef.current = { index: 0, map: new Map() };
        setResult(null);
        setIsRunning(true);
        setStepCount(0);
        setCurrentIndex(-1);
        setCurrentElement(null);
        setComplement(null);
        setHashMap(new Map());
        setCurrentStep('init');
        setMessage('Starting Two Sum II Hash Map visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm(parsedArray);
        }, 1500);
    };

    const stepThroughAlgorithm = (nums) => {
        const state = algorithmStateRef.current;

        if (state.index >= nums.length) {
            // Algorithm complete - no solution found
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentIndex(-1);
            setCurrentElement(null);
            setComplement(null);
            setCurrentStep('complete');
            setMessage('Algorithm complete! No solution found.');
            return;
        }

        const currentNum = nums[state.index];
        const comp = target - currentNum;
        
        setCurrentIndex(state.index);
        setCurrentElement(currentNum);
        setComplement(comp);
        setStepCount(prev => prev + 1);

        if (state.map.has(comp)) {
            // Found the solution
            const complementIndex = state.map.get(comp);
            const solution = [complementIndex, state.index + 1]; // 1-indexed
            setResult(solution);
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentStep('found');
            setMessage(`Found solution: complement ${comp} exists at index ${complementIndex - 1} (1-based: ${complementIndex})`);
            return;
        }

        // Add current element to hash map
        state.map.set(currentNum, state.index + 1); // Store 1-indexed
        setHashMap(new Map(state.map));
        setCurrentStep('storing');
        setMessage(`Step ${state.index + 1}: Looking for complement ${comp}, not found. Storing ${currentNum} → ${state.index + 1} in hash map.`);
        
        // Move to next element
        state.index++;
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIndex(-1);
        setCurrentElement(null);
        setComplement(null);
        setHashMap(new Map());
        setResult(null);
        setCurrentStep('init');
        setMessage('Click "Start" to begin Two Sum II Hash Map visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        if (index === currentIndex) {
            return 'element-active'; // Current element being processed
        }
        if (index < currentIndex) {
            return 'element-secondary'; // Already processed
        }
        return 'element-inactive'; // Not processed yet
    };

    const getStepColor = () => {
        switch (currentStep) {
            case 'storing': return 'text-blue-400';
            case 'found': return 'text-green-400';
            case 'complete': return 'text-purple-400';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Two Sum II - Hash Map Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation">
                <h3 className="font-semibold mb-2">Algorithm: O(n) Hash Map</h3>
                <p className="text-sm">
                    Use a hash map to store seen elements. For each element, check if its complement exists in the map.
                    Time complexity: O(n), Space complexity: O(n)
                </p>
                <div className="mt-2 text-sm">
                    <strong>Strategy:</strong> One pass through array, storing elements and checking for complements.
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
                <p className={`font-medium ${getStepColor()}`}>{message}</p>
                <div className="text-sm opacity-80 mt-1">
                    <span>Steps: {stepCount}</span>
                    <span className="ml-4">Target: {target}</span>
                    {currentElement !== null && (
                        <>
                            <span className="ml-4">Current: {currentElement}</span>
                            <span className="ml-4">Complement: {complement}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="my-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-active"></div>
                    <span>current element</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-secondary"></div>
                    <span>processed</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded element-inactive"></div>
                    <span>not processed</span>
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

            {/* Current Operation */}
            {currentElement !== null && (
                <div className="message-warning">
                    <h4 className="font-semibold mb-2">Current Operation:</h4>
                    <div className="space-y-2">
                        <div>
                            <strong>Current Element:</strong> {currentElement} (index {currentIndex})
                        </div>
                        <div>
                            <strong>Complement Needed:</strong> {target} - {currentElement} = {complement}
                        </div>
                        <div>
                            <strong>Hash Map Lookup:</strong> {hashMap.has(complement) ? `Found ${complement} at index ${hashMap.get(complement) - 1}!` : `${complement} not found in hash map`}
                        </div>
                    </div>
                </div>
            )}

            {/* Hash Map Visualization */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Hash Map (value → 1-based index):</h4>
                <div className="min-h-[60px] p-3 bg-gray-800/30 border border-gray-700 rounded">
                    {hashMap.size === 0 ? (
                        <span className="text-gray-500 italic">Empty</span>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {Array.from(hashMap.entries()).map(([value, index]) => (
                                <div
                                    key={value}
                                    className={`p-2 rounded border transition-all duration-300 ${
                                        value === complement && currentStep !== 'storing'
                                            ? 'bg-yellow-600 border-yellow-500 text-white'
                                            : 'bg-gray-700 border-gray-600 text-gray-300'
                                    }`}
                                >
                                    {value} → {index}
                                </div>
                            ))}
                        </div>
                    )}
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

export default TwoSumIIHashMapVisualizer;
