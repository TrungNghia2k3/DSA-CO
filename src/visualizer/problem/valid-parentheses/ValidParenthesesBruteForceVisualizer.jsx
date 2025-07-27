import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ValidParenthesesBruteForceVisualizer = () => {
    const [input, setInput] = useState('{([])}');
    const [isPlaying, setIsPlaying] = useState(false);
    const [result, setResult] = useState(null);
    const [speed, setSpeed] = useState(1000);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    // Generate all steps for the brute force algorithm
    const generateSteps = (s) => {
        if (!s) {
            return [{
                iteration: 0,
                string: '',
                action: 'No input provided',
                removedPair: null,
                status: 'processing'
            }];
        }

        const steps = [];
        let current = s;
        let iteration = 0;

        steps.push({
            iteration: 0,
            string: current,
            action: 'Initial string',
            removedPair: null,
            status: 'processing'
        });

        while (current.includes("()") || current.includes("{}") || current.includes("[]")) {
            iteration++;
            let previousString = current;
            let removedPair = null;

            // Check which pair was removed (for visualization)
            if (current.includes("()")) {
                current = current.replace("()", "");
                removedPair = "()";
            } else if (current.includes("{}")) {
                current = current.replace("{}", "");
                removedPair = "{}";
            } else if (current.includes("[]")) {
                current = current.replace("[]", "");
                removedPair = "[]";
            }

            steps.push({
                iteration: iteration,
                string: current,
                previousString: previousString,
                action: `Remove matching pair '${removedPair}'`,
                removedPair: removedPair,
                status: 'processing'
            });
        }

        // Final result
        const isValid = current === "";
        steps.push({
            iteration: iteration + 1,
            string: current,
            action: isValid ? 'String is empty - Valid!' : 'String not empty - Invalid!',
            removedPair: null,
            status: isValid ? 'success' : 'error'
        });

        return steps;
    };

    const reset = useCallback(() => {
        setCurrentStep(0);
        setIsPlaying(false);
        setResult(null);
        const newSteps = generateSteps(input);
        setSteps(newSteps);
    }, [input]);

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                const step = steps[currentStep + 1];
                if (step.status === 'success' || step.status === 'error') {
                    setResult(step.status === 'success');
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

    const getBracketColor = (bracket) => {
        const colors = {
            '(': 'text-blue-200',
            ')': 'text-blue-200',
            '[': 'text-green-200',
            ']': 'text-green-200',
            '{': 'text-purple-200',
            '}': 'text-purple-200'
        };
        return colors[bracket] || 'text-gray-200';
    };

    const getHighlightedString = (str, removedPair) => {
        if (!removedPair) return str;
        
        // Find the first occurrence of the removed pair to highlight
        const index = str.indexOf(removedPair);
        if (index === -1) return str;

        return {
            before: str.substring(0, index),
            highlighted: removedPair,
            after: str.substring(index + removedPair.length)
        };
    };

    const currentStepData = steps[currentStep] || steps[0] || {};

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">
                Valid Parentheses Brute Force Visualizer
            </h2>

            {/* Input Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                    Enter parentheses string:
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none bg-gray-800 text-white border-gray-600"
                    placeholder="Example: {([])}"
                />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                    Reset
                </button>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-white">Speed:</label>
                    <select
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="px-2 py-1 border rounded text-sm bg-gray-800 text-white border-gray-600"
                    >
                        <option value={2000}>Slow</option>
                        <option value={1000}>Normal</option>
                        <option value={500}>Fast</option>
                    </select>
                </div>
            </div>

            {/* Algorithm Description */}
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Algorithm Steps:</h3>
                <ol className="text-sm text-gray-300 space-y-1">
                    <li>1. Check if string contains any matching pairs: "()", "{}", "[]"</li>
                    <li>2. If found, remove the first matching pair</li>
                    <li>3. Repeat until no more pairs can be removed</li>
                    <li>4. If string is empty, it's valid; otherwise, it's invalid</li>
                </ol>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Current Step Information */}
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-white">
                        Iteration {currentStepData.iteration || 0}
                    </h3>
                    <div className="text-sm text-gray-300 mb-3">
                        Action: {currentStepData.action || 'Starting...'}
                    </div>

                    {/* String Transformation */}
                    <div className="space-y-4">
                        {currentStepData.previousString && (
                            <div>
                                <div className="text-sm text-gray-400 mb-2">Previous:</div>
                                <div className="flex items-center gap-2 text-2xl font-mono">
                                    {(() => {
                                        if (!currentStepData.previousString) return null;
                                        
                                        const highlighted = getHighlightedString(currentStepData.previousString, currentStepData.removedPair);
                                        if (typeof highlighted === 'string') {
                                            return highlighted.split('').map((char, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-md bg-gray-700 ${getBracketColor(char)}`}
                                                >
                                                    {char}
                                                </div>
                                            ));
                                        } else {
                                            return (
                                                <>
                                                    {highlighted.before && highlighted.before.split('').map((char, index) => (
                                                        <div
                                                            key={`before-${index}`}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-md bg-gray-700 ${getBracketColor(char)}`}
                                                        >
                                                            {char}
                                                        </div>
                                                    ))}
                                                    {highlighted.highlighted && highlighted.highlighted.split('').map((char, index) => (
                                                        <div
                                                            key={`highlight-${index}`}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-md bg-red-500 animate-pulse ${getBracketColor(char)}`}
                                                        >
                                                            {char}
                                                        </div>
                                                    ))}
                                                    {highlighted.after && highlighted.after.split('').map((char, index) => (
                                                        <div
                                                            key={`after-${index}`}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-md bg-gray-700 ${getBracketColor(char)}`}
                                                        >
                                                            {char}
                                                        </div>
                                                    ))}
                                                </>
                                            );
                                        }
                                    })()}
                                </div>
                            </div>
                        )}

                        {currentStepData.previousString && (
                            <div className="flex justify-center">
                                <FontAwesomeIcon icon={faArrowRight} className="text-2xl text-yellow-500" />
                            </div>
                        )}

                        <div>
                            <div className="text-sm text-gray-400 mb-2">Current:</div>
                            <div className="flex items-center gap-2 text-2xl font-mono">
                                {(currentStepData.string === '' || currentStepData.string === undefined) ? (
                                    <div className="text-green-400 italic">Empty string</div>
                                ) : (
                                    currentStepData.string && currentStepData.string.split('').map((char, index) => (
                                        <div
                                            key={index}
                                            className={`w-10 h-10 flex items-center justify-center rounded-md transition-all ${
                                                currentStepData.status === 'success' 
                                                    ? 'bg-green-500' 
                                                    : currentStepData.status === 'error' 
                                                        ? 'bg-red-500' 
                                                        : 'bg-gray-700'
                                            } ${getBracketColor(char)}`}
                                        >
                                            {char}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result */}
                {result !== null && (
                    <div className={`p-4 rounded-lg text-center ${result ? 'bg-green-800' : 'bg-red-800'}`}>
                        <div className="text-xl font-bold text-white">
                            {result ? '✅ Valid Parentheses' : '❌ Invalid Parentheses'}
                        </div>
                        <div className="text-sm text-gray-300 mt-2">
                            {result 
                                ? 'All brackets were successfully matched and removed' 
                                : 'Some brackets remain unmatched'
                            }
                        </div>
                    </div>
                )}
            </div>

            {/* Step Progress */}
            <div className="bg-gray-800 p-4 rounded-lg">
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
    );
};

export default ValidParenthesesBruteForceVisualizer;
