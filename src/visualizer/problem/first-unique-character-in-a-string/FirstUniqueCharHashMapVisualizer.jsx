import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

const FirstUniqueCharHashMapVisualizer = () => {
    const [input, setInput] = useState('leetcode');
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [result, setResult] = useState(null);
    const [speed, setSpeed] = useState(800);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [charCount, setCharCount] = useState(new Map());
    const [phase, setPhase] = useState('counting'); // 'counting' or 'finding'

    // Generate all steps for the hash map algorithm
    const generateSteps = useCallback((s) => {
        if (!s) {
            return [{
                index: -1,
                phase: 'counting',
                action: 'No input provided',
                charCount: new Map(),
                result: null,
                isComplete: false
            }];
        }

        const steps = [];
        const count = new Map();
        
        steps.push({
            index: -1,
            phase: 'counting',
            action: 'Phase 1: Count frequency of each character',
            charCount: new Map(),
            result: null,
            isComplete: false
        });

        // Phase 1: Count frequencies
        for (let i = 0; i < s.length; i++) {
            const char = s[i];
            const prevCount = count.get(char) || 0;
            count.set(char, prevCount + 1);
            
            steps.push({
                index: i,
                phase: 'counting',
                action: `Count '${char}': ${count.get(char)} occurrence${count.get(char) > 1 ? 's' : ''}`,
                charCount: new Map(count),
                result: null,
                isComplete: false
            });
        }

        steps.push({
            index: -1,
            phase: 'finding',
            action: 'Phase 2: Find first character with count = 1',
            charCount: new Map(count),
            result: null,
            isComplete: false
        });

        // Phase 2: Find first unique character
        for (let i = 0; i < s.length; i++) {
            const char = s[i];
            steps.push({
                index: i,
                phase: 'finding',
                action: `Check '${char}' at index ${i}: count = ${count.get(char)}`,
                charCount: new Map(count),
                result: null,
                isComplete: false
            });

            if (count.get(char) === 1) {
                steps.push({
                    index: i,
                    phase: 'finding',
                    action: `Found! '${char}' has count = 1. Return index ${i}`,
                    charCount: new Map(count),
                    result: i,
                    isComplete: true
                });
                return steps;
            }
        }

        steps.push({
            index: -1,
            phase: 'finding',
            action: 'No unique character found. Return -1',
            charCount: new Map(count),
            result: -1,
            isComplete: true
        });

        return steps;
    }, []);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setCurrentIndex(-1);
        setIsPlaying(false);
        setResult(null);
        setCharCount(new Map());
        setPhase('counting');
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
                setCurrentIndex(step.index);
                setPhase(step.phase);
                setCharCount(step.charCount);
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
        
        if (index === currentIndex) {
            if (phase === 'counting') {
                return `${baseStyle} bg-blue-500 border-blue-400 text-white scale-110`; // Currently counting
            } else {
                const char = input[index];
                const count = charCount.get(char) || 0;
                if (count === 1) {
                    return `${baseStyle} bg-green-500 border-green-400 text-white scale-110`; // Unique character
                } else {
                    return `${baseStyle} bg-orange-500 border-orange-400 text-white scale-110`; // Not unique
                }
            }
        } else if (phase === 'counting' && index < currentIndex) {
            return `${baseStyle} bg-gray-600 border-gray-500 text-gray-300`; // Already counted
        } else if (phase === 'finding' && index < currentIndex) {
            const char = input[index];
            const count = charCount.get(char) || 0;
            if (count === 1) {
                return `${baseStyle} bg-gray-600 border-gray-500 text-gray-300`; // Already checked unique
            } else {
                return `${baseStyle} bg-red-600 border-red-500 text-gray-300`; // Already checked not unique
            }
        } else {
            return `${baseStyle} bg-gray-800 border-gray-700 text-gray-300`; // Not yet processed
        }
    };

    const currentStepData = steps[currentStep] || steps[0] || {};

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">
                First Unique Character - Hash Map Visualizer
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
                    <li>1. <strong>Phase 1:</strong> Count frequency of each character using HashMap</li>
                    <li>2. <strong>Phase 2:</strong> Iterate through string again</li>
                    <li>3. For each character, check if count = 1 in HashMap</li>
                    <li>4. Return index of first character with count = 1</li>
                    <li>5. If no unique character found, return -1</li>
                </ol>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* String Visualization */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">
                        String Characters 
                        <span className="text-sm text-gray-400 ml-2">
                            ({phase === 'counting' ? 'Counting Phase' : 'Finding Phase'})
                        </span>
                    </h3>
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

                {/* Hash Map Visualization */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">Character Count HashMap</h3>
                    <div className="bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto">
                        {charCount.size === 0 ? (
                            <div className="text-gray-400 italic">Empty HashMap</div>
                        ) : (
                            <div className="space-y-2">
                                {Array.from(charCount.entries()).map(([char, count]) => (
                                    <div 
                                        key={char} 
                                        className={`flex justify-between items-center p-2 rounded transition-colors ${
                                            input[currentIndex] === char && phase === 'counting' 
                                                ? 'bg-blue-600 text-white' 
                                                : input[currentIndex] === char && phase === 'finding'
                                                    ? count === 1 
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-orange-600 text-white'
                                                    : count === 1 
                                                        ? 'bg-green-800 text-green-200' 
                                                        : 'bg-gray-700 text-gray-300'
                                        }`}
                                    >
                                        <span className="font-mono text-lg">'{char}'</span>
                                        <span className="text-sm font-bold">{count}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Current Action */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Current Action</h3>
                <div className="text-gray-300">
                    {currentStepData.action || 'Starting...'}
                </div>
            </div>

            {/* Legend */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Legend</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 border border-blue-400 rounded"></div>
                        <span className="text-gray-300">Currently Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 border border-green-400 rounded"></div>
                        <span className="text-gray-300">Unique Character</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 border border-orange-400 rounded"></div>
                        <span className="text-gray-300">Not Unique</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 border border-red-500 rounded"></div>
                        <span className="text-gray-300">Checked (Not Unique)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-600 border border-gray-500 rounded"></div>
                        <span className="text-gray-300">Already Processed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-800 border border-gray-700 rounded"></div>
                        <span className="text-gray-300">Not Yet Processed</span>
                    </div>
                </div>
            </div>

            {/* Result */}
            {result !== null && (
                <div className={`p-4 rounded-lg text-center mb-6 ${result >= 0 ? 'bg-green-800' : 'bg-red-800'}`}>
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
    );
};

export default FirstUniqueCharHashMapVisualizer;
