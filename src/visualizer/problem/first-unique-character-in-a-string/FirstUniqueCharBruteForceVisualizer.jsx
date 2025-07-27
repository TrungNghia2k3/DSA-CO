import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

const FirstUniqueCharBruteForceVisualizer = () => {
    const [input, setInput] = useState('leetcode');
    const [currentI, setCurrentI] = useState(0);
    const [currentJ, setCurrentJ] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [result, setResult] = useState(null);
    const [speed, setSpeed] = useState(800);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [foundDuplicate, setFoundDuplicate] = useState(false);

    // Generate all steps for the brute force algorithm
    const generateSteps = useCallback((s) => {
        if (!s) {
            return [{
                i: -1,
                j: -1,
                action: 'No input provided',
                foundDuplicate: false,
                isComplete: false,
                result: -1
            }];
        }

        const steps = [];
        
        steps.push({
            i: -1,
            j: -1,
            action: 'Algorithm started: Check each character for uniqueness',
            foundDuplicate: false,
            isComplete: false,
            result: null
        });

        for (let i = 0; i < s.length; i++) {
            let flag = true;
            
            steps.push({
                i: i,
                j: -1,
                action: `Checking character '${s[i]}' at index ${i}`,
                foundDuplicate: false,
                isComplete: false,
                result: null
            });

            for (let j = 0; j < s.length; j++) {
                if (i === j) {
                    steps.push({
                        i: i,
                        j: j,
                        action: `Skip comparing '${s[i]}' with itself`,
                        foundDuplicate: false,
                        isComplete: false,
                        result: null
                    });
                    continue;
                }

                steps.push({
                    i: i,
                    j: j,
                    action: `Compare '${s[i]}' at index ${i} with '${s[j]}' at index ${j}`,
                    foundDuplicate: false,
                    isComplete: false,
                    result: null
                });

                if (s[i] === s[j]) {
                    flag = false;
                    steps.push({
                        i: i,
                        j: j,
                        action: `Found duplicate! '${s[i]}' appears again. Not unique.`,
                        foundDuplicate: true,
                        isComplete: false,
                        result: null
                    });
                    break;
                }
            }

            if (flag) {
                steps.push({
                    i: i,
                    j: -1,
                    action: `'${s[i]}' is unique! Found first unique character at index ${i}`,
                    foundDuplicate: false,
                    isComplete: true,
                    result: i
                });
                return steps;
            }
        }

        steps.push({
            i: -1,
            j: -1,
            action: 'No unique character found',
            foundDuplicate: false,
            isComplete: true,
            result: -1
        });

        return steps;
    }, []);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setCurrentI(0);
        setCurrentJ(-1);
        setIsPlaying(false);
        setResult(null);
        setFoundDuplicate(false);
        const newSteps = generateSteps(input);
        setSteps(newSteps);
    }, [input, generateSteps]);

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                const step = steps[currentStep + 1];
                setCurrentI(step.i);
                setCurrentJ(step.j);
                setFoundDuplicate(step.foundDuplicate);
                if (step.isComplete) {
                    setResult(step.result);
                    setIsPlaying(false);
                }
            }, speed);
            return () => clearTimeout(timer);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStep, steps, speed]);

    const togglePlay = () => {
        if (currentStep >= steps.length - 1) {
            reset();
        }
        setIsPlaying(!isPlaying);
    };

    const getCharacterStyle = (index) => {
        const baseStyle = "w-12 h-12 flex items-center justify-center rounded-lg text-lg font-mono border-2 transition-all duration-300";
        
        if (index === currentI && index === currentJ) {
            return `${baseStyle} bg-yellow-500 border-yellow-400 text-black scale-110`; // Self comparison
        } else if (index === currentI) {
            return `${baseStyle} bg-blue-500 border-blue-400 text-white scale-110`; // Current character being checked
        } else if (index === currentJ) {
            if (foundDuplicate) {
                return `${baseStyle} bg-red-500 border-red-400 text-white scale-110 animate-pulse`; // Found duplicate
            }
            return `${baseStyle} bg-orange-500 border-orange-400 text-white scale-110`; // Comparing character
        } else if (index < currentI) {
            return `${baseStyle} bg-gray-600 border-gray-500 text-gray-300`; // Already checked
        } else {
            return `${baseStyle} bg-gray-800 border-gray-700 text-gray-300`; // Not yet checked
        }
    };

    const currentStepData = steps[currentStep] || steps[0] || {};

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">
                First Unique Character - Brute Force Visualizer
            </h2>

            {/* Input Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                    Enter string:
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none bg-gray-900 text-white border-gray-600 focus:border-blue-500"
                    placeholder="Example: leetcode"
                />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                    <FontAwesomeIcon icon={faUndo} />
                    Reset
                </button>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-white">Speed:</label>
                    <select
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="px-2 py-1 border rounded text-sm bg-gray-900 text-white border-gray-600"
                    >
                        <option value={1200}>Slow</option>
                        <option value={800}>Normal</option>
                        <option value={400}>Fast</option>
                    </select>
                </div>
            </div>

            {/* Algorithm Description */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Algorithm Steps:</h3>
                <ol className="text-sm text-gray-300 space-y-1">
                    <li>1. For each character at index i, check if it's unique</li>
                    <li>2. Compare s[i] with every other character s[j] where j ≠ i</li>
                    <li>3. If any duplicate is found, move to next character</li>
                    <li>4. If no duplicate found, return index i</li>
                    <li>5. If no unique character exists, return -1</li>
                </ol>
            </div>

            {/* Visualization Area */}
            <div className="space-y-6">
                {/* String Visualization */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">String Characters</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {input.split('').map((char, index) => (
                            <div key={index} className="text-center">
                                <div className={getCharacterStyle(index)}>
                                    {char}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">{index}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Action */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-white">Current Action</h3>
                    <div className="text-gray-300">
                        {currentStepData.action || 'Starting...'}
                    </div>
                    {currentI >= 0 && currentJ >= 0 && currentI !== currentJ && (
                        <div className="mt-2 text-sm text-gray-400">
                            Comparing: '{input[currentI]}' (index {currentI}) with '{input[currentJ]}' (index {currentJ})
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-white">Legend</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 border border-blue-400 rounded"></div>
                            <span className="text-gray-300">Current Character (i)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 border border-orange-400 rounded"></div>
                            <span className="text-gray-300">Comparing With (j)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 border border-red-400 rounded"></div>
                            <span className="text-gray-300">Duplicate Found</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 border border-yellow-400 rounded"></div>
                            <span className="text-gray-300">Self Comparison</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-600 border border-gray-500 rounded"></div>
                            <span className="text-gray-300">Already Checked</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-800 border border-gray-700 rounded"></div>
                            <span className="text-gray-300">Not Yet Checked</span>
                        </div>
                    </div>
                </div>

                {/* Result */}
                {result !== null && (
                    <div className={`p-4 rounded-lg text-center ${result >= 0 ? 'bg-green-800' : 'bg-red-800'}`}>
                        <div className="text-xl font-bold text-white">
                            {result >= 0 ? `✅ First unique character found at index ${result}` : '❌ No unique character found'}
                        </div>
                        {result >= 0 && (
                            <div className="text-sm text-gray-300 mt-2">
                                Character: '{input[result]}'
                            </div>
                        )}
                    </div>
                )}

                {/* Progress */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{currentStep + 1} / {steps.length || 1}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstUniqueCharBruteForceVisualizer;
