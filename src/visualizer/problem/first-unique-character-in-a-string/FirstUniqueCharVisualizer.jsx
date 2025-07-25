import React, { useState } from 'react';

const FirstUniqueCharVisualizer = () => {
    /**
     * State to store the input string.
     * @type {[string, Function]}
     */
    const [inputString, setInputString] = useState("leetcode");

    /**
     * State to store the status message and its associated color.
     * @type {[{color: string, string: string}, Function]}
     */
    const [status, setStatus] = useState({ color: '', string: '' });

    /**
     * State to store the frequency array (26 lowercase letters).
     * @type {[Array<number>, Function]}
     */
    const [frequencyArray, setFrequencyArray] = useState(new Array(26).fill(0));

    /**
     * State to store the queue containing [character, index] pairs.
     * @type {[Array<Array>, Function]}
     */
    const [queue, setQueue] = useState([]);

    /**
     * State to store the currently highlighted character index.
     * @type {[number | null, Function]}
     */
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    /**
     * State to track whether the simulation is currently running.
     * @type {[boolean, Function]}
     */
    const [running, setRunning] = useState(false);

    /**
     * State to track the current step in the visualization.
     * @type {[string, Function]}
     */
    const [currentStep, setCurrentStep] = useState('');

    /**
     * State to store the current result.
     * @type {[number | null, Function]}
     */
    const [result, setResult] = useState(null);

    /**
     * State to store processing history.
     * @type {[Array<Object>, Function]}
     */
    const [history, setHistory] = useState([]);

    /**
     * Utility function to introduce a delay for asynchronous operations.
     * @param {number} ms - The delay duration in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Function to run the First Unique Character simulation.
     * Processes each character and updates the frequency array and queue.
     * 
     * @async
     * @returns {void}
     */
    const runFirstUniqueChar = async () => {
        setRunning(true);
        setStatus({ color: '', string: '' });
        setFrequencyArray(new Array(26).fill(0));
        setQueue([]);
        setHighlightedIndex(null);
        setResult(null);
        setHistory([]);

        const MAX_CHAR = 26;
        const count = new Array(MAX_CHAR).fill(0);
        const charQueue = [];
        const stepHistory = [];

        setCurrentStep('Starting algorithm');
        setStatus({ color: 'text-blue-500', string: '🚀 Starting to find first unique character...' });
        await sleep(1000);

        for (let i = 0; i < inputString.length; i++) {
            const ch = inputString[i];
            const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            
            setHighlightedIndex(i);
            setCurrentStep(`Processing character '${ch}' at index ${i}`);

            // Increment frequency count
            count[idx]++;
            setFrequencyArray([...count]);

            setStatus({ 
                color: 'text-blue-500', 
                string: `📝 Processing '${ch}' at index ${i}, frequency: ${count[idx]}` 
            });
            await sleep(1200);

            // Add to queue
            charQueue.push([ch, i]);
            setQueue([...charQueue]);

            setStatus({ 
                color: 'text-green-500', 
                string: `➕ Added ['${ch}', ${i}] to queue` 
            });
            await sleep(1000);

            // Clean queue: remove repeated characters from front
            let removedCount = 0;
            while (charQueue.length > 0) {
                const [frontChar] = charQueue[0];
                const frontIdx = frontChar.charCodeAt(0) - 'a'.charCodeAt(0);
                
                if (count[frontIdx] > 1) {
                    const removed = charQueue.shift();
                    removedCount++;
                    setQueue([...charQueue]);
                    
                    setStatus({ 
                        color: 'text-red-500', 
                        string: `🗑️ Removed ['${removed[0]}', ${removed[1]}] from queue (repeated character)` 
                    });
                    await sleep(800);
                } else {
                    break;
                }
            }

            if (removedCount === 0) {
                setStatus({ 
                    color: 'text-gray-500', 
                    string: `✅ No repeated characters to remove from queue` 
                });
                await sleep(500);
            }

            // Record current state
            stepHistory.push({
                index: i,
                character: ch,
                frequency: count[idx],
                queueState: [...charQueue],
                currentUnique: charQueue.length > 0 ? charQueue[0] : null
            });
            setHistory([...stepHistory]);

            // Show current first unique character
            if (charQueue.length > 0) {
                const [uniqueChar, uniqueIndex] = charQueue[0];
                setStatus({ 
                    color: 'text-green-600', 
                    string: `🎯 Current first unique character: '${uniqueChar}' at index ${uniqueIndex}` 
                });
            } else {
                setStatus({ 
                    color: 'text-orange-500', 
                    string: `⚠️ No unique characters found so far` 
                });
            }
            await sleep(1200);
        }

        // Final result
        const finalResult = charQueue.length === 0 ? -1 : charQueue[0][1];
        setResult(finalResult);
        setHighlightedIndex(null);
        setCurrentStep('Algorithm completed');

        if (finalResult === -1) {
            setStatus({ 
                color: 'text-red-600', 
                string: `❌ No unique characters found. Result: -1` 
            });
        } else {
            const uniqueChar = charQueue[0][0];
            setStatus({ 
                color: 'text-green-600', 
                string: `✅ First unique character: '${uniqueChar}' at index ${finalResult}` 
            });
        }

        setRunning(false);
    };

    /**
     * Renders the input string with character highlighting.
     * @returns {JSX.Element} Rendered string
     */
    const renderString = () => {
        return (
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-white">Input String</h4>
                <div className="flex gap-1 text-lg font-mono flex-wrap">
                    {inputString.split('').map((char, index) => (
                        <div key={index} className="text-center">
                            <div className="text-xs text-gray-500 mb-1">{index}</div>
                            <span
                                className={`px-2 py-1 border rounded ${
                                    index === highlightedIndex 
                                        ? 'bg-yellow-600 text-white border-yellow-400' 
                                        : result === index
                                        ? 'bg-green-600 text-white border-green-400'
                                        : 'bg-gray-700 text-gray-300 border-gray-600'
                                } transition-all duration-300`}
                            >
                                {char}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    /**
     * Renders the frequency array visualization.
     * @returns {JSX.Element} Rendered frequency array
     */
    const renderFrequencyArray = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const nonZeroFreqs = frequencyArray.map((freq, index) => ({
            char: alphabet[index],
            freq,
            index
        })).filter(item => item.freq > 0);

        return (
            <div className="mb-6">
                <h4 className="font-semibold mb-2 text-white">Character Frequency Count</h4>
                {nonZeroFreqs.length === 0 ? (
                    <div className="text-gray-500 text-center p-4 bg-gray-800 rounded">
                        No characters processed yet
                    </div>
                ) : (
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                        {nonZeroFreqs.map(({ char, freq }) => (
                            <div key={char} className="text-center">
                                <div className="bg-gray-800 border border-gray-600 rounded p-2">
                                    <div className="text-white font-mono text-lg">{char}</div>
                                    <div className={`text-sm font-bold ${
                                        freq > 1 ? 'text-red-400' : 'text-green-400'
                                    }`}>
                                        {freq}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    /**
     * Renders the queue visualization.
     * @returns {JSX.Element} Rendered queue
     */
    const renderQueue = () => {
        return (
            <div className="mb-6">
                <h4 className="font-semibold mb-2 text-white">Queue (First Unique Candidates)</h4>
                <div className="bg-gray-800 border-2 border-gray-600 rounded p-4 min-h-[100px]">
                    {queue.length === 0 ? (
                        <div className="text-gray-500 text-center">
                            Queue is empty
                        </div>
                    ) : (
                        <div className="flex gap-2 flex-wrap">
                            {queue.map((item, index) => {
                                const [char, charIndex] = item;
                                return (
                                    <div
                                        key={`${char}-${charIndex}`}
                                        className={`px-3 py-2 rounded border font-mono ${
                                            index === 0 
                                                ? 'bg-green-600 text-white border-green-400' 
                                                : 'bg-blue-600 text-white border-blue-400'
                                        }`}
                                    >
                                        ['{char}', {charIndex}]
                                        {index === 0 && (
                                            <div className="text-xs mt-1 text-green-200">← Front</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {queue.length > 0 && (
                    <div className="text-sm text-gray-400 mt-2">
                        Front of queue contains the current first unique character candidate
                    </div>
                )}
            </div>
        );
    };

    /**
     * Renders the processing history.
     * @returns {JSX.Element} Rendered history
     */
    const renderHistory = () => {
        if (history.length === 0) return null;

        return (
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Processing History</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {history.map((entry, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-yellow-400">
                                    Step {index + 1}: '{entry.character}' at index {entry.index}
                                </span>
                                <span className="text-gray-400">Freq: {entry.frequency}</span>
                            </div>
                            <div className="text-blue-400 mt-1">
                                Queue: {entry.queueState.length === 0 ? '[]' : 
                                    `[${entry.queueState.map(([c, i]) => `['${c}',${i}]`).join(', ')}]`}
                            </div>
                            {entry.currentUnique && (
                                <div className="text-green-400 mt-1">
                                    Current unique: '{entry.currentUnique[0]}' at index {entry.currentUnique[1]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="py-4">
            <h2 className="text-xl font-bold mb-4 text-white">First Unique Character Visualizer</h2>
            <p className="text-gray-300 mb-4">
                Uses a queue and frequency array to efficiently track the first non-repeating character.
            </p>

            <div className="mb-4">
                <label className="block font-medium mb-1 text-white">
                    Input String (lowercase letters only):
                </label>
                <input
                    type="text"
                    value={inputString}
                    onChange={(e) => setInputString(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white font-mono"
                    disabled={running}
                    placeholder="e.g., leetcode"
                />
            </div>

            <button
                onClick={runFirstUniqueChar}
                disabled={running || inputString.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 mb-4"
            >
                {running ? 'Running...' : 'Start Visualization'}
            </button>

            {/* Current Step */}
            {currentStep && (
                <div className="mb-4 p-3 bg-gray-800 rounded">
                    <h3 className="text-lg font-semibold text-blue-400">Current Step: {currentStep}</h3>
                </div>
            )}

            {/* String Visualization */}
            {renderString()}

            {/* Algorithm State */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                {/* Frequency Array */}
                {renderFrequencyArray()}

                {/* Queue */}
                {renderQueue()}
            </div>

            {/* Result */}
            {result !== null && (
                <div className="mb-6 p-4 bg-gray-800 rounded">
                    <h3 className="text-lg font-semibold mb-2 text-white">Final Result</h3>
                    <div className="text-2xl font-bold font-mono">
                        {result === -1 ? (
                            <span className="text-red-400">-1 (No unique character found)</span>
                        ) : (
                            <span className="text-green-400">
                                Index {result} (Character: '{inputString[result]}')
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Status */}
            {status.string && (
                <div className={`p-3 bg-gray-800 rounded ${status.color} mb-4`}>
                    <p className="font-medium">{status.string}</p>
                </div>
            )}

            {/* Processing History */}
            {renderHistory()}

            {/* Algorithm Explanation */}
            <div className="mt-6 p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold mb-2 text-white">Algorithm Explanation</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Use a frequency array to count occurrences of each character (26 lowercase letters)</li>
                    <li>Use a queue to store [character, index] pairs of potential unique characters</li>
                    <li>For each character in the string:
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li>Increment its frequency count</li>
                            <li>Add [character, index] to the queue</li>
                            <li>Remove repeated characters from the front of the queue</li>
                        </ul>
                    </li>
                    <li>The front of the queue always contains the first unique character (if any)</li>
                    <li>Return the index from the front of the queue, or -1 if queue is empty</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-900 rounded">
                    <h4 className="font-semibold text-blue-300">Key Insight</h4>
                    <p className="text-gray-300 mt-1">
                        By maintaining a queue and cleaning it as we go, we can find the first unique character 
                        in O(n) time while processing the string only once. The queue ensures we maintain the 
                        order of characters as they appear in the string.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FirstUniqueCharVisualizer;
