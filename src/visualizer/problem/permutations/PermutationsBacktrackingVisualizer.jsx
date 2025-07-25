import React, { useState, useRef } from 'react';

const PermutationsBacktrackingVisualizer = () => {
    const [inputArray, setInputArray] = useState([1, 2, 3]);
    const [inputValue, setInputValue] = useState('1,2,3');
    const [currentPerm, setCurrentPerm] = useState([]);
    const [usedIndices, setUsedIndices] = useState([]);
    const [allPermutations, setAllPermutations] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Click "Start" to begin Permutations Backtracking visualization');
    const [stepCount, setStepCount] = useState(0);
    const [currentStep, setCurrentStep] = useState('init');

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({
        permutation: [],
        used: [],
        results: [],
        callStack: [],
        permutationIndices: [] // Track which indices are used in the current permutation
    });

    const startVisualization = () => {
        if (isRunning) return;
        
        // Parse the input array
        const parsedArray = inputValue
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num));
        
        if (parsedArray.length === 0) {
            setMessage('Array cannot be empty');
            return;
        }

        if (parsedArray.length > 4) {
            setMessage('Array size limited to 4 elements for visualization');
            return;
        }

        setInputArray(parsedArray);
        
        // Reset state
        algorithmStateRef.current = {
            permutation: [],
            used: new Array(parsedArray.length).fill(false),
            results: [],
            callStack: [{ depth: 0, action: 'start' }],
            permutationIndices: []
        };
        
        setCurrentPerm([]);
        setUsedIndices([]);
        setAllPermutations([]);
        setIsRunning(true);
        setStepCount(0);
        setCurrentStep('init');
        setMessage('Starting Permutations Backtracking visualization...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm(parsedArray);
        }, 1500);
    };

    const stepThroughAlgorithm = (nums) => {
        const state = algorithmStateRef.current;

        if (state.callStack.length === 0) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentStep('complete');
            setMessage(`Algorithm complete! Generated ${state.results.length} permutations.`);
            return;
        }

        const currentCall = state.callStack.pop();
        setStepCount(prev => prev + 1);

        if (currentCall.action === 'start') {
            // Starting a new level of recursion
            if (state.permutation.length === nums.length) {
                // Base case: found a complete permutation
                const newPerm = [...state.permutation];
                state.results.push(newPerm);
                setAllPermutations([...state.results]);
                setCurrentStep('found');
                setMessage(`Found permutation: [${newPerm.join(', ')}]`);
                return;
            }

            setCurrentStep('exploring');
            setMessage(`Exploring level ${state.permutation.length}, trying each unused element...`);

            // Add all possible choices in reverse order, each followed by backtrack
            for (let i = nums.length - 1; i >= 0; i--) {
                if (!state.used[i]) {
                    // Add backtrack action first (executed after the choice)
                    state.callStack.push({ 
                        action: 'backtrack',
                        index: i
                    });
                    // Add recursive call
                    state.callStack.push({ 
                        action: 'start' 
                    });
                    // Add choose action (executed first)
                    state.callStack.push({ 
                        action: 'choose', 
                        index: i 
                    });
                }
            }
        } else if (currentCall.action === 'choose') {
            // Choose an element
            const index = currentCall.index;
            state.permutation.push(nums[index]);
            state.permutationIndices.push(index);
            state.used[index] = true;
            
            setCurrentPerm([...state.permutation]);
            setUsedIndices(state.used.map((used, i) => used ? i : -1).filter(i => i !== -1));
            setCurrentStep('choosing');
            setMessage(`Choosing nums[${index}] = ${nums[index]}, permutation: [${state.permutation.join(', ')}]`);
        } else if (currentCall.action === 'backtrack') {
            // Backtrack: remove the last element
            if (state.permutation.length > 0) {
                const lastElement = state.permutation.pop();
                const lastIndex = state.permutationIndices.pop();
                
                // Unmark the specific index that was used
                state.used[lastIndex] = false;
                
                setCurrentPerm([...state.permutation]);
                setUsedIndices(state.used.map((used, i) => used ? i : -1).filter(i => i !== -1));
                setCurrentStep('backtracking');
                setMessage(`Backtracking: removed ${lastElement} from index ${lastIndex}, permutation: [${state.permutation.join(', ')}]`);
            }
        }
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentPerm([]);
        setUsedIndices([]);
        setAllPermutations([]);
        setCurrentStep('init');
        setMessage('Click "Start" to begin Permutations Backtracking visualization');
        setStepCount(0);
    };

    const getCellStyle = (index) => {
        if (usedIndices.includes(index)) {
            return 'element-secondary';
        }
        return 'element-inactive';
    };

    const getStepColor = () => {
        switch (currentStep) {
            case 'choosing': return 'text-blue-400';
            case 'backtracking': return 'text-orange-400';
            case 'found': return 'text-green-400';
            case 'complete': return 'text-purple-400';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Permutations - Backtracking Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation mb-4">
                <h3 className="font-semibold mb-2">Algorithm: Backtracking</h3>
                <p className="text-sm">
                    Uses backtracking to generate all permutations. At each level, try each unused element,
                    recurse, then backtrack by removing the element.
                </p>
                <div className="mt-2 text-sm">
                    <strong>Time Complexity:</strong> O(n! × n) - generate n! permutations, each taking O(n) to construct<br/>
                    <strong>Space Complexity:</strong> O(n) - recursion stack depth
                </div>
            </div>

            {/* Input */}
            <div className="mb-4">
                <label className="block font-medium mb-1 text-gray-300">Array (comma-separated, max 4 elements):</label>
                <input
                    type="text"
                    className="input-default w-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isRunning}
                    placeholder="Enter numbers separated by commas"
                />
            </div>

            {/* Status */}
            <div className="message-info mb-4">
                <p className={`font-medium ${getStepColor()}`}>{message}</p>
                <div className="text-sm mt-1 opacity-80">
                    <span>Steps: {stepCount}</span>
                    <span className="ml-4">Permutations found: {allPermutations.length}</span>
                    <span className="ml-4">Current depth: {currentPerm.length}</span>
                </div>
            </div>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-secondary rounded"></div>
                    <span className="text-gray-300">used element</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 element-inactive rounded"></div>
                    <span className="text-gray-300">available element</span>
                </div>
            </div>

            {/* Array Visualization */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-300">Original Array:</h4>
                <div className="flex gap-2">
                    {inputArray.map((num, index) => (
                        <div
                            key={index}
                            className={`
                                p-3 min-w-[60px] text-center rounded border-2
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

            {/* Current Permutation */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-300">Current Permutation:</h4>
                <div className="min-h-[60px] p-3 bg-gray-800/30 border border-gray-700 rounded flex items-center gap-2">
                    {currentPerm.length === 0 ? (
                        <span className="text-gray-500 italic">Empty</span>
                    ) : (
                        currentPerm.map((num, index) => (
                            <div
                                key={index}
                                className="p-2 bg-yellow-600 text-white border border-yellow-500 rounded font-bold min-w-[40px] text-center"
                            >
                                {num}
                            </div>
                        ))
                    )}
                    {currentPerm.length < inputArray.length && (
                        <div className="p-2 border-2 border-dashed border-gray-600 rounded min-w-[40px] text-center text-gray-400">
                            ?
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
                    className="btn-danger px-4 py-2"
                    onClick={resetVisualization}
                >
                    Reset
                </button>
            </div>

            {/* All Permutations */}
            {allPermutations.length > 0 && (
                <div className="message-success">
                    <h4 className="font-semibold mb-2">Generated Permutations:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                        {allPermutations.map((perm, index) => (
                            <div key={index} className="bg-gray-800 text-gray-300 p-2 rounded border border-gray-700 text-center">
                                [{perm.join(', ')}]
                            </div>
                        ))}
                    </div>
                    <p className="text-sm opacity-80 mt-2">
                        Total: {allPermutations.length} permutations
                    </p>
                </div>
            )}
        </div>
    );
};

export default PermutationsBacktrackingVisualizer;
