import React, { useState, useRef } from 'react';

const PermutationsIterationVisualizer = () => {
    const [inputValue, setInputValue] = useState('1,2,3');
    const [currentIteration, setCurrentIteration] = useState(0);
    const [currentElement, setCurrentElement] = useState(null);
    const [currentPermutations, setCurrentPermutations] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Click "Start" to begin Permutations Iteration visualization');
    const [stepCount, setStepCount] = useState(0);
    const [currentStep, setCurrentStep] = useState('init');

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({
        nums: [],
        currentIndex: 0,
        perms: [[]],
        processing: false
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

        // Reset state
        algorithmStateRef.current = {
            nums: parsedArray,
            currentIndex: 0,
            perms: [[]],
            processing: false
        };
        
        setCurrentIteration(0);
        setCurrentElement(null);
        setCurrentPermutations([[]]);
        setIsRunning(true);
        setStepCount(0);
        setCurrentStep('init');
        setMessage('Starting Permutations Iteration visualization with empty permutation...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm();
        }, 1500);
    };

    const stepThroughAlgorithm = () => {
        const state = algorithmStateRef.current;

        if (state.currentIndex >= state.nums.length) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentStep('complete');
            setMessage(`Algorithm complete! Generated ${state.perms.length} permutations.`);
            return;
        }

        if (!state.processing) {
            // Start processing current element
            state.processing = true;
            const currentNum = state.nums[state.currentIndex];
            
            setCurrentIteration(state.currentIndex + 1);
            setCurrentElement(currentNum);
            setCurrentStep('selecting');
            setMessage(`Iteration ${state.currentIndex + 1}: Processing element ${currentNum}`);
            setStepCount(prev => prev + 1);
            return;
        }

        // Generate new permutations by inserting current element at all positions
        const currentNum = state.nums[state.currentIndex];
        const newPerms = [];

        for (let perm of state.perms) {
            for (let i = 0; i <= perm.length; i++) {
                const newPerm = [...perm];
                newPerm.splice(i, 0, currentNum);
                newPerms.push(newPerm);
            }
        }

        state.perms = newPerms;
        state.currentIndex++;
        state.processing = false;

        setCurrentPermutations([...newPerms]);
        setCurrentStep('generated');
        setMessage(`Generated ${newPerms.length} new permutations by inserting ${currentNum} at all positions`);
        setStepCount(prev => prev + 1);
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentIteration(0);
        setCurrentElement(null);
        setCurrentPermutations([]);
        setCurrentStep('init');
        setMessage('Click "Start" to begin Permutations Iteration visualization');
        setStepCount(0);
    };

    const getStepColor = () => {
        switch (currentStep) {
            case 'selecting': return 'text-blue-400';
            case 'generated': return 'text-green-400';
            case 'complete': return 'text-purple-400';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Permutations - Iteration Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation mb-4">
                <h3 className="font-semibold mb-2">Algorithm: Iteration</h3>
                <p className="text-sm">
                    Start with empty permutation [[]]. For each element in the array, insert it at every 
                    position in all existing permutations to create new permutations.
                </p>
                <div className="mt-2 text-sm">
                    <strong>Time Complexity:</strong> O(n! × n) - generate n! permutations, each taking O(n) to construct<br/>
                    <strong>Space Complexity:</strong> O(n! × n) - store all permutations
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
                    <span className="ml-4">Iteration: {currentIteration}</span>
                    {currentElement !== null && (
                        <span className="ml-4">Current Element: {currentElement}</span>
                    )}
                    <span className="ml-4">Permutations: {currentPermutations.length}</span>
                </div>
            </div>

            {/* Current Element */}
            {currentElement !== null && (
                <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-300">Current Element:</h4>
                    <div className="flex items-center gap-2">
                        <div className="p-3 bg-yellow-600 text-white border border-yellow-500 rounded font-bold min-w-[50px] text-center">
                            {currentElement}
                        </div>
                        <span className="text-gray-400">← Inserting at all positions in existing permutations</span>
                    </div>
                </div>
            )}

            {/* Current Permutations */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-300">
                    Current Permutations ({currentPermutations.length}):
                </h4>
                <div className="min-h-[100px] p-3 bg-gray-800/30 border border-gray-700 rounded">
                    {currentPermutations.length === 0 ? (
                        <span className="text-gray-500 italic">No permutations yet</span>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                            {currentPermutations.map((perm, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-300 p-2 rounded border border-gray-600 text-center transition-all duration-300"
                                >
                                    [{perm.join(', ')}]
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Visualization */}
            {algorithmStateRef.current.nums.length > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-300">Progress:</h4>
                    <div className="flex gap-2">
                        {algorithmStateRef.current.nums.map((num, index) => (
                            <div
                                key={index}
                                className={`p-3 min-w-[50px] text-center rounded border-2 transition-all duration-300 ${
                                    index < currentIteration - 1
                                        ? 'element-tertiary' // processed
                                        : index === currentIteration - 1
                                            ? 'element-active' // current
                                            : 'element-inactive' // not processed
                                }`}
                            >
                                <div className="font-bold">{num}</div>
                                <div className="text-xs opacity-70">
                                    {index < currentIteration - 1 ? 'Done' : 
                                     index === currentIteration - 1 ? 'Current' : 'Waiting'}
                                </div>
                            </div>
                        ))}
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
                    className="btn-danger px-4 py-2"
                    onClick={resetVisualization}
                >
                    Reset
                </button>
            </div>

            {/* Final Result */}
            {currentStep === 'complete' && (
                <div className="message-success">
                    <h4 className="font-semibold mb-2">Final Permutations:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                        {currentPermutations.map((perm, index) => (
                            <div key={index} className="bg-gray-800 text-gray-300 p-2 rounded border border-gray-700 text-center">
                                [{perm.join(', ')}]
                            </div>
                        ))}
                    </div>
                    <p className="text-sm opacity-80 mt-2">
                        Total: {currentPermutations.length} permutations
                    </p>
                </div>
            )}
        </div>
    );
};

export default PermutationsIterationVisualizer;
