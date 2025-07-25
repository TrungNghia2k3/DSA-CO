import React, { useState } from 'react';

const BackspaceTwoPointerVisualizer = () => {
    /**
     * State to store the first string for comparison.
     * @type {[string, Function]}
     */
    const [stringS, setStringS] = useState("ab#c");

    /**
     * State to store the second string for comparison.
     * @type {[string, Function]}
     */
    const [stringT, setStringT] = useState("ad#c");

    /**
     * State to store the status message and its associated color.
     * @type {[{color: string, string: string}, Function]}
     */
    const [status, setStatus] = useState({ color: '', string: '' });

    /**
     * State to store the current pointer positions.
     * @type {[{i: number, j: number}, Function]}
     */
    const [pointers, setPointers] = useState({ i: -1, j: -1 });

    /**
     * State to store the characters being compared.
     * @type {[{charS: string | null, charT: string | null}, Function]}
     */
    const [currentChars, setCurrentChars] = useState({ charS: null, charT: null });

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
     * State to track skipped characters due to backspaces.
     * @type {[{sSkipped: Array<number>, tSkipped: Array<number>}, Function]}
     */
    const [skippedChars, setSkippedChars] = useState({ sSkipped: [], tSkipped: [] });

    /**
     * Utility function to introduce a delay for asynchronous operations.
     * @param {number} ms - The delay duration in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Helper function to find the next valid character in a string, processing backspaces.
     * @param {string} str - The string to process
     * @param {number} index - Starting index
     * @param {Function} onUpdate - Callback for updates during processing
     * @returns {Promise<{index: number, char: string | null}>} Object with final index and character
     */
    const findNextValidChar = async (str, index, onUpdate) => {
        let backspaceCount = 0;
        let currentIndex = index;
        const skipped = [];

        while (currentIndex >= 0) {
            if (str[currentIndex] === '#') {
                backspaceCount++;
                skipped.push(currentIndex);
                await onUpdate(currentIndex, `Found backspace at position ${currentIndex}`, 'text-orange-500');
            } else if (backspaceCount > 0) {
                backspaceCount--;
                skipped.push(currentIndex);
                await onUpdate(currentIndex, `Skipping character '${str[currentIndex]}' due to backspace`, 'text-red-500');
            } else {
                // Found valid character
                return { index: currentIndex, char: str[currentIndex], skipped };
            }
            currentIndex--;
        }

        return { index: -1, char: null, skipped };
    };

    /**
     * Function to run the Backspace String Compare simulation using two pointers approach.
     * Processes both strings from right to left, handling backspaces correctly.
     * 
     * @async
     * @returns {void}
     */
    const runBackspaceCompare = async () => {
        setRunning(true);
        setStatus({ color: '', string: '' });
        setPointers({ i: stringS.length - 1, j: stringT.length - 1 });
        setCurrentChars({ charS: null, charT: null });
        setSkippedChars({ sSkipped: [], tSkipped: [] });

        let i = stringS.length - 1;
        let j = stringT.length - 1;
        let allSkippedS = [];
        let allSkippedT = [];

        setCurrentStep('Starting from the end of both strings');
        setStatus({ color: 'text-blue-500', string: '🚀 Starting two-pointer comparison from the end...' });
        await sleep(1000);

        while (i >= 0 || j >= 0) {
            // Process string S to find next valid character
            setCurrentStep('Finding next valid character in string S');
            setPointers({ i, j });
            
            const resultS = await findNextValidChar(stringS, i, async (index, message, color) => {
                setPointers({ i: index, j });
                setStatus({ color, string: message });
                await sleep(800);
            });

            i = resultS.index;
            allSkippedS.push(...resultS.skipped);

            // Process string T to find next valid character
            setCurrentStep('Finding next valid character in string T');
            
            const resultT = await findNextValidChar(stringT, j, async (index, message, color) => {
                setPointers({ i, j: index });
                setStatus({ color, string: message });
                await sleep(800);
            });

            j = resultT.index;
            allSkippedT.push(...resultT.skipped);

            setSkippedChars({ sSkipped: allSkippedS, tSkipped: allSkippedT });

            // Compare the found characters
            setCurrentStep('Comparing valid characters');
            setPointers({ i, j });
            setCurrentChars({ charS: resultS.char, charT: resultT.char });

            if (i < 0 && j < 0) {
                // Both strings processed completely
                setStatus({ 
                    color: 'text-green-600', 
                    string: '✅ Both strings processed completely and are equal!' 
                });
                break;
            } else if (i < 0 || j < 0) {
                // One string processed, other still has characters
                setStatus({ 
                    color: 'text-red-500', 
                    string: '❌ Strings have different lengths after processing backspaces!' 
                });
                break;
            } else if (resultS.char !== resultT.char) {
                // Characters don't match
                setStatus({ 
                    color: 'text-red-500', 
                    string: `❌ Characters don't match: '${resultS.char}' ≠ '${resultT.char}'` 
                });
                break;
            } else {
                // Characters match, continue
                setStatus({ 
                    color: 'text-green-500', 
                    string: `✅ Characters match: '${resultS.char}' = '${resultT.char}'` 
                });
            }

            await sleep(1000);

            // Move to next characters
            i--;
            j--;
        }

        setRunning(false);
    };

    /**
     * Renders a string with highlighted characters and pointer positions.
     * @param {string} str - The string to render
     * @param {number} pointerIndex - Current pointer position
     * @param {Array<number>} skipped - Indices of skipped characters
     * @param {string} pointerColor - Color for the pointer
     * @param {string} label - Label for the string
     * @returns {JSX.Element} Rendered string with highlighting
     */
    const renderString = (str, pointerIndex, skipped, pointerColor, label) => {
        return (
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-white">{label}</h4>
                <div className="flex gap-1 text-lg font-mono">
                    {str.split('').map((char, index) => {
                        let bgColor = 'bg-gray-700';
                        let textColor = 'text-gray-300';
                        let borderColor = 'border-gray-600';

                        if (index === pointerIndex) {
                            bgColor = pointerColor;
                            textColor = 'text-white';
                            borderColor = 'border-white';
                        } else if (skipped.includes(index)) {
                            bgColor = 'bg-red-800';
                            textColor = 'text-red-300';
                            borderColor = 'border-red-600';
                        }

                        return (
                            <div key={index} className="text-center">
                                <div className="text-xs text-gray-500 mb-1">{index}</div>
                                <span
                                    className={`px-2 py-1 border rounded ${bgColor} ${textColor} ${borderColor} relative`}
                                >
                                    {char === '#' ? '⌫' : char}
                                    {index === pointerIndex && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xl">
                                            ↓
                                        </div>
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="py-4">
            <h2 className="text-xl font-bold mb-4 text-white">Backspace String Compare - Two Pointer Approach</h2>
            <p className="text-gray-300 mb-4">
                Time Complexity: O(n), Space Complexity: O(1) - Processes strings from right to left without extra space
            </p>

            <div className="mb-4 space-y-3">
                <div>
                    <label className="block font-medium mb-1 text-white">String S:</label>
                    <input
                        type="text"
                        value={stringS}
                        onChange={(e) => setStringS(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                        disabled={running}
                        placeholder="Enter string with # for backspace"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-white">String T:</label>
                    <input
                        type="text"
                        value={stringT}
                        onChange={(e) => setStringT(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                        disabled={running}
                        placeholder="Enter string with # for backspace"
                    />
                </div>
            </div>

            <button
                onClick={runBackspaceCompare}
                disabled={running}
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
            <div className="mb-6">
                {renderString(stringS, pointers.i, skippedChars.sSkipped, 'bg-blue-600', `String S: "${stringS}" (Pointer at ${pointers.i})`)}
                {renderString(stringT, pointers.j, skippedChars.tSkipped, 'bg-green-600', `String T: "${stringT}" (Pointer at ${pointers.j})`)}
            </div>

            {/* Current Characters Comparison */}
            {(currentChars.charS !== null || currentChars.charT !== null) && (
                <div className="mb-6 p-4 bg-gray-800 rounded">
                    <h3 className="text-lg font-semibold mb-2 text-white">Current Comparison</h3>
                    <div className="flex items-center justify-center gap-4 text-xl">
                        <div className="text-center">
                            <div className="text-blue-400 font-mono">String S</div>
                            <div className="bg-blue-600 text-white px-4 py-2 rounded font-mono">
                                {currentChars.charS || 'null'}
                            </div>
                        </div>
                        <div className="text-white font-bold text-2xl">
                            {currentChars.charS === currentChars.charT ? '=' : '≠'}
                        </div>
                        <div className="text-center">
                            <div className="text-green-400 font-mono">String T</div>
                            <div className="bg-green-600 text-white px-4 py-2 rounded font-mono">
                                {currentChars.charT || 'null'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="mb-6 p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold mb-2 text-white">Legend</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span className="text-gray-300">Current pointer in String S</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                        <span className="text-gray-300">Current pointer in String T</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-800 rounded"></div>
                        <span className="text-gray-300">Skipped due to backspace</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-xl">↓</span>
                        <span className="text-gray-300">Current pointer position</span>
                    </div>
                </div>
            </div>

            {/* Status */}
            {status.string && (
                <div className={`p-3 bg-gray-800 rounded ${status.color}`}>
                    <p className="font-medium">{status.string}</p>
                </div>
            )}

            {/* Algorithm Explanation */}
            <div className="mt-6 p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold mb-2 text-white">Algorithm Explanation</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Start with two pointers at the end of both strings</li>
                    <li>For each string, find the next valid character by:
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li>If current character is '#', increment backspace counter</li>
                            <li>If current character is not '#' and backspace counter &gt; 0, skip this character and decrement counter</li>
                            <li>If current character is not '#' and backspace counter = 0, this is a valid character</li>
                        </ul>
                    </li>
                    <li>Compare the valid characters from both strings</li>
                    <li>If characters don't match, strings are not equal</li>
                    <li>Continue until both strings are completely processed</li>
                    <li>If we reach the end of both strings simultaneously, they are equal</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-900 rounded">
                    <h4 className="font-semibold text-blue-300">Why process from right to left?</h4>
                    <p className="text-gray-300 mt-1">
                        Processing from right to left allows us to handle backspaces naturally, as we can immediately determine 
                        which characters are "deleted" without needing extra space to store intermediate results.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BackspaceTwoPointerVisualizer;
