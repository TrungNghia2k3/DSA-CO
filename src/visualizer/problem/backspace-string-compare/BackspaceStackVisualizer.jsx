import React, { useState } from 'react';

const BackspaceStackVisualizer = () => {
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
     * State to store the current stacks for both strings.
     * @type {[{stackS: Array<string>, stackT: Array<string>}, Function]}
     */
    const [stacks, setStacks] = useState({ stackS: [], stackT: [] });

    /**
     * State to store the currently highlighted character indices.
     * @type {[{sIndex: number | null, tIndex: number | null}, Function]}
     */
    const [highlighted, setHighlighted] = useState({ sIndex: null, tIndex: null });

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
     * Utility function to introduce a delay for asynchronous operations.
     * @param {number} ms - The delay duration in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Function to run the Backspace String Compare simulation using a stack approach.
     * Processes both strings character by character, building stacks and comparing them.
     * Updates the state variables to reflect the current status and visualization state.
     * 
     * @async
     * @returns {void}
     */
    const runBackspaceCompare = async () => {
        setRunning(true);
        setStatus({ color: '', string: '' });
        setStacks({ stackS: [], stackT: [] });
        setHighlighted({ sIndex: null, tIndex: null });

        const stackS = [];
        const stackT = [];

        // Process string S
        setCurrentStep('Processing string S');
        setStatus({ color: 'text-blue-500', string: '🔄 Processing string S...' });
        await sleep(800);

        for (let i = 0; i < stringS.length; i++) {
            setHighlighted({ sIndex: i, tIndex: null });
            
            if (stringS[i] === '#') {
                if (stackS.length > 0) {
                    const removed = stackS.pop();
                    setStatus({ 
                        color: 'text-orange-500', 
                        string: `🔙 Backspace: removed '${removed}' from stack S` 
                    });
                } else {
                    setStatus({ 
                        color: 'text-gray-500', 
                        string: `🔙 Backspace: stack S is empty, nothing to remove` 
                    });
                }
            } else {
                stackS.push(stringS[i]);
                setStatus({ 
                    color: 'text-green-500', 
                    string: `➕ Added '${stringS[i]}' to stack S` 
                });
            }
            
            setStacks({ stackS: [...stackS], stackT: [...stackT] });
            await sleep(1000);
        }

        // Process string T
        setCurrentStep('Processing string T');
        setStatus({ color: 'text-blue-500', string: '🔄 Processing string T...' });
        await sleep(800);

        for (let i = 0; i < stringT.length; i++) {
            setHighlighted({ sIndex: null, tIndex: i });
            
            if (stringT[i] === '#') {
                if (stackT.length > 0) {
                    const removed = stackT.pop();
                    setStatus({ 
                        color: 'text-orange-500', 
                        string: `🔙 Backspace: removed '${removed}' from stack T` 
                    });
                } else {
                    setStatus({ 
                        color: 'text-gray-500', 
                        string: `🔙 Backspace: stack T is empty, nothing to remove` 
                    });
                }
            } else {
                stackT.push(stringT[i]);
                setStatus({ 
                    color: 'text-green-500', 
                    string: `➕ Added '${stringT[i]}' to stack T` 
                });
            }
            
            setStacks({ stackS: [...stackS], stackT: [...stackT] });
            await sleep(1000);
        }

        // Compare stacks
        setCurrentStep('Comparing stacks');
        setHighlighted({ sIndex: null, tIndex: null });
        setStatus({ color: 'text-purple-500', string: '🔍 Comparing final stacks...' });
        await sleep(1000);

        // Check if stacks are equal
        if (stackS.length !== stackT.length) {
            setStatus({ 
                color: 'text-red-500', 
                string: `❌ Different lengths: Stack S has ${stackS.length} characters, Stack T has ${stackT.length} characters` 
            });
        } else {
            let isEqual = true;
            for (let i = 0; i < stackS.length; i++) {
                if (stackS[i] !== stackT[i]) {
                    isEqual = false;
                    break;
                }
            }
            
            if (isEqual) {
                setStatus({ 
                    color: 'text-green-600', 
                    string: `✅ Strings are equal! Both result in: "${stackS.join('')}"` 
                });
            } else {
                setStatus({ 
                    color: 'text-red-500', 
                    string: `❌ Strings are different: "${stackS.join('')}" ≠ "${stackT.join('')}"` 
                });
            }
        }

        setRunning(false);
    };

    /**
     * Renders a string with highlighted characters.
     * @param {string} str - The string to render
     * @param {number|null} highlightIndex - The index to highlight
     * @param {string} bgColor - Background color for highlighted character
     * @returns {JSX.Element} Rendered string with highlighting
     */
    const renderString = (str, highlightIndex, bgColor) => {
        return (
            <div className="flex gap-1 text-lg font-mono">
                {str.split('').map((char, index) => (
                    <span
                        key={index}
                        className={`px-2 py-1 border rounded ${
                            index === highlightIndex 
                                ? `${bgColor} text-white border-white` 
                                : 'bg-gray-700 text-gray-300 border-gray-600'
                        }`}
                    >
                        {char === '#' ? '⌫' : char}
                    </span>
                ))}
            </div>
        );
    };

    /**
     * Renders a stack visualization.
     * @param {Array<string>} stack - The stack to render
     * @param {string} label - Label for the stack
     * @param {string} color - Color theme for the stack
     * @returns {JSX.Element} Rendered stack visualization
     */
    const renderStack = (stack, label, color) => {
        return (
            <div className="text-center">
                <h4 className="font-semibold mb-2 text-white">{label}</h4>
                <div className="min-h-[200px] w-20 bg-gray-800 border-2 border-gray-600 rounded relative mx-auto">
                    {stack.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                            Empty
                        </div>
                    ) : (
                        <div className="absolute bottom-0 left-0 right-0">
                            {stack.map((char, index) => (
                                <div
                                    key={index}
                                    className={`h-8 flex items-center justify-center text-white font-mono text-lg border-t border-gray-600 ${color}`}
                                    style={{ bottom: `${index * 32}px` }}
                                >
                                    {char}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-2 text-sm text-gray-400">
                    Result: "{stack.join('')}"
                </div>
            </div>
        );
    };

    return (
        <div className="py-4">
            <h2 className="text-xl font-bold mb-4 text-white">Backspace String Compare - Stack Approach</h2>
            <p className="text-gray-300 mb-4">
                Time Complexity: O(n), Space Complexity: O(n) - Uses two stacks to process the strings
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
            <div className="mb-6 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">String S: "{stringS}"</h3>
                    {renderString(stringS, highlighted.sIndex, 'bg-blue-600')}
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">String T: "{stringT}"</h3>
                    {renderString(stringT, highlighted.tIndex, 'bg-green-600')}
                </div>
            </div>

            {/* Stack Visualization */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Stack States</h3>
                <div className="flex justify-center gap-8">
                    {renderStack(stacks.stackS, 'Stack S', 'bg-blue-600')}
                    {renderStack(stacks.stackT, 'Stack T', 'bg-green-600')}
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
                    <li>Create two empty stacks for both strings</li>
                    <li>Process each character in string S:
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li>If character is '#', pop from stack (if not empty)</li>
                            <li>Otherwise, push character to stack</li>
                        </ul>
                    </li>
                    <li>Process each character in string T the same way</li>
                    <li>Compare the final stacks:
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li>If lengths differ, strings are not equal</li>
                            <li>If all corresponding characters match, strings are equal</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default BackspaceStackVisualizer;
