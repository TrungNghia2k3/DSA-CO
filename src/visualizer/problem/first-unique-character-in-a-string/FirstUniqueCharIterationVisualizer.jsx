import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

const FirstUniqueCharIterationVisualizer = () => {
    const [input, setInput] = useState('leetcode');
    const [currentChar, setCurrentChar] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [result, setResult] = useState(null);
    const [speed, setSpeed] = useState(800);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [minIndex, setMinIndex] = useState(null);
    const [charResults, setCharResults] = useState(new Map());

    // Generate all steps for the iteration algorithm
    const generateSteps = useCallback((s) => {
        if (!s) {
            return [{
                char: '',
                action: 'No input provided',
                minIndex: s ? s.length : 0,
                charResults: new Map(),
                result: null,
                isComplete: false
            }];
        }

        const steps = [];
        let res = s.length;
        const results = new Map();
        
        steps.push({
            char: '',
            action: 'Algorithm started: Check each letter from a-z',
            minIndex: res,
            charResults: new Map(),
            result: null,
            isComplete: false
        });

        for (let ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ch++) {
            const char = String.fromCharCode(ch);
            
            steps.push({
                char: char,
                action: `Checking character '${char}'`,
                minIndex: res,
                charResults: new Map(results),
                result: null,
                isComplete: false
            });

            const firstIndex = s.indexOf(char);
            
            if (firstIndex !== -1) {
                const lastIndex = s.lastIndexOf(char);
                
                steps.push({
                    char: char,
                    action: `'${char}' found: first at ${firstIndex}, last at ${lastIndex}`,
                    minIndex: res,
                    charResults: new Map(results),
                    result: null,
                    isComplete: false
                });

                if (firstIndex === lastIndex) {
                    // Character is unique
                    res = Math.min(res, firstIndex);
                    results.set(char, { index: firstIndex, isUnique: true });
                    
                    steps.push({
                        char: char,
                        action: `'${char}' is unique! Update minimum index to ${res}`,
                        minIndex: res,
                        charResults: new Map(results),
                        result: null,
                        isComplete: false
                    });
                } else {
                    // Character is not unique
                    results.set(char, { index: firstIndex, isUnique: false });
                    
                    steps.push({
                        char: char,
                        action: `'${char}' is not unique (appears multiple times)`,
                        minIndex: res,
                        charResults: new Map(results),
                        result: null,
                        isComplete: false
                    });
                }
            } else {
                steps.push({
                    char: char,
                    action: `'${char}' not found in string`,
                    minIndex: res,
                    charResults: new Map(results),
                    result: null,
                    isComplete: false
                });
            }
        }

        const finalResult = res === s.length ? -1 : res;
        steps.push({
            char: '',
            action: finalResult >= 0 ? `Found minimum unique index: ${finalResult}` : 'No unique character found',
            minIndex: res,
            charResults: new Map(results),
            result: finalResult,
            isComplete: true
        });

        return steps;
    }, []);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setCurrentChar('');
        setIsPlaying(false);
        setResult(null);
        setMinIndex(input.length);
        setCharResults(new Map());
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
                setCurrentChar(step.char);
                setMinIndex(step.minIndex);
                setCharResults(step.charResults);
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
        const char = input[index];
        const charResult = charResults.get(char);
        
        if (charResult) {
            if (charResult.isUnique && charResult.index === index) {
                if (index === minIndex) {
                    return `${baseStyle} bg-green-500 border-green-400 text-white scale-110 animate-pulse`; // Current minimum unique
                } else {
                    return `${baseStyle} bg-green-600 border-green-500 text-white`; // Unique but not minimum
                }
            } else if (!charResult.isUnique) {
                return `${baseStyle} bg-red-600 border-red-500 text-gray-300`; // Not unique
            }
        }
        
        return `${baseStyle} bg-gray-800 border-gray-700 text-gray-300`; // Not yet processed or not found
    };

    const getAlphabetCharStyle = (char) => {
        const baseStyle = "w-8 h-8 flex items-center justify-center rounded text-sm font-mono border transition-all duration-300";
        
        if (char === currentChar) {
            return `${baseStyle} bg-blue-500 border-blue-400 text-white scale-110`; // Currently checking
        }
        
        const charResult = charResults.get(char);
        if (charResult) {
            if (charResult.isUnique) {
                return `${baseStyle} bg-green-600 border-green-500 text-white`; // Unique
            } else {
                return `${baseStyle} bg-red-600 border-red-500 text-gray-300`; // Not unique
            }
        } else if (charResults.size > 0) {
            // Character was checked but not found
            return `${baseStyle} bg-gray-600 border-gray-500 text-gray-400`;
        }
        
        return `${baseStyle} bg-gray-800 border-gray-700 text-gray-300`; // Not yet checked
    };

    const currentStepData = steps[currentStep] || steps[0] || {};

    // Generate alphabet array
    const alphabet = [];
    for (let ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ch++) {
        alphabet.push(String.fromCharCode(ch));
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">
                First Unique Character - Iteration Visualizer
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
                    <li>1. Initialize result to string length (worst case)</li>
                    <li>2. For each letter 'a' to 'z':</li>
                    <li>3. &nbsp;&nbsp;• Find first and last occurrence in string</li>
                    <li>4. &nbsp;&nbsp;• If first === last, character is unique</li>
                    <li>5. &nbsp;&nbsp;• Update minimum index if this unique character is earlier</li>
                    <li>6. Return minimum index found, or -1 if no unique character</li>
                </ol>
            </div>

            {/* Visualization Area */}
            <div className="space-y-6">
                {/* String Visualization */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">
                        String Characters
                        {minIndex < input.length && (
                            <span className="text-sm text-green-400 ml-2">
                                (Current minimum unique index: {minIndex})
                            </span>
                        )}
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

                {/* Alphabet Progress */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">
                        Alphabet Progress
                        {currentChar && (
                            <span className="text-sm text-blue-400 ml-2">
                                (Currently checking: '{currentChar}')
                            </span>
                        )}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                        {alphabet.map((char) => (
                            <div key={char} className={getAlphabetCharStyle(char)}>
                                {char}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Character Analysis */}
                {charResults.size > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Character Analysis</h3>
                        <div className="bg-gray-900 p-4 rounded-lg max-h-48 overflow-y-auto">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {Array.from(charResults.entries()).map(([char, result]) => (
                                    <div 
                                        key={char} 
                                        className={`p-2 rounded text-center transition-colors ${
                                            result.isUnique 
                                                ? result.index === minIndex
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-green-600 text-white'
                                                : 'bg-red-600 text-gray-300'
                                        }`}
                                    >
                                        <div className="font-mono text-lg">'{char}'</div>
                                        <div className="text-xs">
                                            {result.isUnique ? `Index: ${result.index}` : 'Not unique'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Current Action */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-white">Current Action</h3>
                    <div className="text-gray-300">
                        {currentStepData.action || 'Starting...'}
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-white">Legend</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 border border-blue-400 rounded"></div>
                            <span className="text-gray-300">Currently Checking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 border border-green-400 rounded"></div>
                            <span className="text-gray-300">Current Minimum Unique</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-600 border border-green-500 rounded"></div>
                            <span className="text-gray-300">Unique Character</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-600 border border-red-500 rounded"></div>
                            <span className="text-gray-300">Not Unique</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-600 border border-gray-500 rounded"></div>
                            <span className="text-gray-300">Not Found</span>
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

export default FirstUniqueCharIterationVisualizer;
