import React, { useState, useRef } from 'react';

const PermutationsRecursionVisualizer = () => {
    const [inputValue, setInputValue] = useState('1,2,3');
    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentPermutations, setCurrentPermutations] = useState([]);
    const [allLevels, setAllLevels] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Click "Start" to begin Permutations Recursion visualization');
    const [stepCount, setStepCount] = useState(0);
    const [currentStep, setCurrentStep] = useState('init');

    const intervalRef = useRef(null);
    const algorithmStateRef = useRef({
        levels: [],
        currentLevel: 0,
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

        // Initialize the recursion levels
        const levels = [];
        for (let i = 0; i <= parsedArray.length; i++) {
            levels.push({
                level: i,
                remaining: parsedArray.slice(i),
                permutations: i === parsedArray.length ? [[]] : [],
                processing: false,
                completed: i === parsedArray.length
            });
        }
        
        algorithmStateRef.current = {
            levels: levels,
            currentLevel: parsedArray.length,
            processing: false
        };
        
        setAllLevels([...levels]);
        setCurrentLevel(parsedArray.length);
        setCurrentPermutations([[]]);
        setIsRunning(true);
        setStepCount(0);
        setCurrentStep('init');
        setMessage('Starting Permutations Recursion visualization from base case...');

        // Start the step-by-step visualization
        intervalRef.current = setInterval(() => {
            stepThroughAlgorithm();
        }, 1500);
    };

    const stepThroughAlgorithm = () => {
        const state = algorithmStateRef.current;

        if (state.currentLevel < 0) {
            // Algorithm complete
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setCurrentStep('complete');
            setMessage(`Algorithm complete! Generated ${state.levels[0]?.permutations?.length || 0} permutations.`);
            return;
        }

        const currentLevelData = state.levels[state.currentLevel];
        
        if (currentLevelData.completed) {
            // Move to previous level
            state.currentLevel--;
            setCurrentLevel(state.currentLevel);
            setStepCount(prev => prev + 1);
            
            if (state.currentLevel >= 0) {
                setMessage(`Moving to level ${state.currentLevel}, processing array [${state.levels[state.currentLevel].remaining.join(', ')}]`);
                setCurrentStep('moving');
            }
            return;
        }

        // Process current level
        if (!currentLevelData.processing) {
            currentLevelData.processing = true;
            setCurrentStep('processing');
            setMessage(`Level ${state.currentLevel}: Getting permutations from level ${state.currentLevel + 1} for array [${currentLevelData.remaining.join(', ')}]`);
            setAllLevels([...state.levels]);
            return;
        }

        // Generate permutations for current level
        const currentNum = currentLevelData.remaining[0];
        const nextLevelPerms = state.levels[state.currentLevel + 1].permutations;
        const newPerms = [];

        for (let perm of nextLevelPerms) {
            for (let i = 0; i <= perm.length; i++) {
                const newPerm = [...perm];
                newPerm.splice(i, 0, currentNum);
                newPerms.push(newPerm);
            }
        }

        currentLevelData.permutations = newPerms;
        currentLevelData.completed = true;
        currentLevelData.processing = false;

        setCurrentPermutations([...newPerms]);
        setCurrentStep('generated');
        setMessage(`Level ${state.currentLevel}: Generated ${newPerms.length} permutations by inserting ${currentNum} at all positions`);
        setStepCount(prev => prev + 1);
        setAllLevels([...state.levels]);
    };

    const resetVisualization = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setCurrentLevel(0);
        setCurrentPermutations([]);
        setAllLevels([]);
        setCurrentStep('init');
        setMessage('Click "Start" to begin Permutations Recursion visualization');
        setStepCount(0);
    };

    const getStepColor = () => {
        switch (currentStep) {
            case 'processing': return 'text-blue-400';
            case 'generated': return 'text-green-400';
            case 'moving': return 'text-orange-400';
            case 'complete': return 'text-purple-400';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="visualizer-container">
            <h2 className="text-xl font-bold mb-4">Permutations - Recursion Visualization</h2>
            
            {/* Algorithm Info */}
            <div className="algorithm-explanation mb-4">
                <h3 className="font-semibold mb-2">Algorithm: Recursion</h3>
                <p className="text-sm">
                    Base case: permutations of empty array is [[]]. For each level, take the first element 
                    and insert it at every position in all permutations from the recursive call.
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
                    <span className="ml-4">Current Level: {currentLevel}</span>
                    <span className="ml-4">Current Permutations: {currentPermutations.length}</span>
                </div>
            </div>

            {/* Recursion Levels */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-300">Recursion Levels:</h4>
                <div className="space-y-3">
                    {allLevels.map((levelData, index) => (
                        <div 
                            key={index}
                            className={`p-3 rounded border-2 transition-all duration-300 ${
                                index === currentLevel 
                                    ? 'border-yellow-500 bg-yellow-900/20' 
                                    : levelData.completed 
                                        ? 'border-green-600 bg-green-900/20'
                                        : 'border-gray-600 bg-gray-800/30'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-300">
                                    Level {index}: permute([{levelData.remaining.join(', ')}])
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                    levelData.processing 
                                        ? 'bg-blue-600 text-white' 
                                        : levelData.completed 
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-600 text-gray-300'
                                }`}>
                                    {levelData.processing ? 'Processing' : levelData.completed ? 'Completed' : 'Waiting'}
                                </span>
                            </div>
                            
                            {levelData.permutations.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 max-h-32 overflow-y-auto">
                                    {levelData.permutations.map((perm, permIndex) => (
                                        <div key={permIndex} className="bg-gray-700 text-gray-300 p-1 rounded text-xs text-center">
                                            [{perm.join(', ')}]
                                        </div>
                                    ))}
                                </div>
                            )}
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
                    className="btn-danger px-4 py-2"
                    onClick={resetVisualization}
                >
                    Reset
                </button>
            </div>

            {/* Final Result */}
            {allLevels[0]?.completed && (
                <div className="message-success">
                    <h4 className="font-semibold mb-2">Final Permutations:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                        {allLevels[0].permutations.map((perm, index) => (
                            <div key={index} className="bg-gray-800 text-gray-300 p-2 rounded border border-gray-700 text-center">
                                [{perm.join(', ')}]
                            </div>
                        ))}
                    </div>
                    <p className="text-sm opacity-80 mt-2">
                        Total: {allLevels[0].permutations.length} permutations
                    </p>
                </div>
            )}
        </div>
    );
};

export default PermutationsRecursionVisualizer;
