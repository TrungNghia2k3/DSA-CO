import React, { useState } from 'react';

const BaseballGameVisualizer = () => {
    /**
     * State to store the operations array for the Baseball Game problem.
     * @type {[Array<string>, Function]}
     */
    const [operations, setOperations] = useState(["5", "2", "C", "D", "+"]);

    /**
     * State to store the status message and its associated color.
     * @type {[{color: string, string: string}, Function]}
     */
    const [status, setStatus] = useState({ color: '', string: '' });

    /**
     * State to store the current stack state.
     * @type {[Array<number>, Function]}
     */
    const [stack, setStack] = useState([]);

    /**
     * State to store the current sum.
     * @type {[number, Function]}
     */
    const [currentSum, setCurrentSum] = useState(0);

    /**
     * State to store the currently highlighted operation index.
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
     * State to store the history of operations for replay.
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
     * Function to run the Baseball Game simulation.
     * Processes each operation and updates the stack and sum accordingly.
     * 
     * @async
     * @returns {void}
     */
    const runBaseballGame = async () => {
        setRunning(true);
        setStatus({ color: '', string: '' });
        setStack([]);
        setCurrentSum(0);
        setHighlightedIndex(null);
        setHistory([]);

        let sum = 0;
        const gameStack = [];
        const operationHistory = [];

        setCurrentStep('Starting with empty record');
        setStatus({ color: 'text-blue-500', string: '🏁 Starting Baseball Game with empty record...' });
        await sleep(1000);

        for (let i = 0; i < operations.length; i++) {
            const operation = operations[i];
            setHighlightedIndex(i);
            setCurrentStep(`Processing operation: "${operation}"`);

            if (operation === 'C') {
                if (gameStack.length > 0) {
                    const removed = gameStack.pop();
                    sum -= removed;
                    setStatus({ 
                        color: 'text-red-500', 
                        string: `🗑️ Cancel: Removed score ${removed}, new sum: ${sum}` 
                    });
                    operationHistory.push({
                        operation: 'C',
                        action: `Removed ${removed}`,
                        stack: [...gameStack],
                        sum: sum
                    });
                }
            } else if (operation === 'D') {
                if (gameStack.length > 0) {
                    const lastScore = gameStack[gameStack.length - 1];
                    const doubled = lastScore * 2;
                    gameStack.push(doubled);
                    sum += doubled;
                    setStatus({ 
                        color: 'text-purple-500', 
                        string: `⚡ Double: ${lastScore} × 2 = ${doubled}, new sum: ${sum}` 
                    });
                    operationHistory.push({
                        operation: 'D',
                        action: `Added ${doubled} (${lastScore} × 2)`,
                        stack: [...gameStack],
                        sum: sum
                    });
                }
            } else if (operation === '+') {
                if (gameStack.length >= 2) {
                    const last = gameStack[gameStack.length - 1];
                    const secondLast = gameStack[gameStack.length - 2];
                    const sumOfTwo = last + secondLast;
                    gameStack.push(sumOfTwo);
                    sum += sumOfTwo;
                    setStatus({ 
                        color: 'text-green-500', 
                        string: `➕ Add: ${secondLast} + ${last} = ${sumOfTwo}, new sum: ${sum}` 
                    });
                    operationHistory.push({
                        operation: '+',
                        action: `Added ${sumOfTwo} (${secondLast} + ${last})`,
                        stack: [...gameStack],
                        sum: sum
                    });
                }
            } else {
                // It's a number
                const score = parseInt(operation);
                gameStack.push(score);
                sum += score;
                setStatus({ 
                    color: 'text-blue-500', 
                    string: `📝 Record: Added score ${score}, new sum: ${sum}` 
                });
                operationHistory.push({
                    operation: operation,
                    action: `Added ${score}`,
                    stack: [...gameStack],
                    sum: sum
                });
            }

            setStack([...gameStack]);
            setCurrentSum(sum);
            setHistory([...operationHistory]);
            await sleep(1500);
        }

        setCurrentStep('Game completed');
        setStatus({ 
            color: 'text-green-600', 
            string: `🎯 Final Result: Total sum = ${sum}` 
        });
        setHighlightedIndex(null);
        setRunning(false);
    };

    /**
     * Handles input change for operations array.
     * @param {Event} e - Input change event
     */
    const handleInputChange = (e) => {
        const input = e.target.value;
        const ops = input.split(',').map(op => op.trim()).filter(op => op !== '');
        setOperations(ops);
    };

    /**
     * Renders the operations array with highlighting.
     * @returns {JSX.Element} Rendered operations
     */
    const renderOperations = () => {
        return (
            <div className="flex flex-wrap gap-2 mb-4">
                {operations.map((op, index) => (
                    <div
                        key={index}
                        className={`px-3 py-2 rounded border font-mono text-lg ${
                            index === highlightedIndex 
                                ? 'bg-yellow-600 text-white border-yellow-400 transform scale-110' 
                                : 'bg-gray-700 text-gray-300 border-gray-600'
                        } transition-all duration-300`}
                    >
                        {op}
                    </div>
                ))}
            </div>
        );
    };

    /**
     * Renders the stack visualization.
     * @returns {JSX.Element} Rendered stack
     */
    const renderStack = () => {
        return (
            <div className="text-center">
                <h4 className="font-semibold mb-2 text-white">Score Record (Stack)</h4>
                <div className="min-h-[250px] w-32 bg-gray-800 border-2 border-gray-600 rounded relative mx-auto">
                    {stack.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                            Empty
                        </div>
                    ) : (
                        <div className="absolute bottom-0 left-0 right-0">
                            {stack.map((score, index) => (
                                <div
                                    key={index}
                                    className="h-10 flex items-center justify-center text-white font-mono text-lg border-t border-gray-600 bg-blue-600"
                                    style={{ bottom: `${index * 40}px` }}
                                >
                                    {score}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-3 text-sm text-gray-400">
                    Scores: [{stack.join(', ')}]
                </div>
            </div>
        );
    };

    /**
     * Renders the operation history.
     * @returns {JSX.Element} Rendered history
     */
    const renderHistory = () => {
        if (history.length === 0) return null;

        return (
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Operation History</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {history.map((entry, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-yellow-400">"{entry.operation}"</span>
                                <span className="text-gray-400">Step {index + 1}</span>
                            </div>
                            <div className="text-gray-300 mt-1">{entry.action}</div>
                            <div className="text-blue-400 mt-1">
                                Stack: [{entry.stack.join(', ')}] | Sum: {entry.sum}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="py-4">
            <h2 className="text-xl font-bold mb-4 text-white">Baseball Game Visualizer</h2>
            <p className="text-gray-300 mb-4">
                Watch how the stack changes with each operation and see the running sum calculation.
            </p>

            <div className="mb-4">
                <label className="block font-medium mb-1 text-white">
                    Operations (comma-separated):
                </label>
                <input
                    type="text"
                    value={operations.join(',')}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white font-mono"
                    disabled={running}
                    placeholder="e.g., 5,2,C,D,+"
                />
                <div className="text-sm text-gray-400 mt-1">
                    Use: numbers (5, -2), C (cancel), D (double), + (sum of last two)
                </div>
            </div>

            <button
                onClick={runBaseballGame}
                disabled={running || operations.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 mb-4"
            >
                {running ? 'Running...' : 'Start Game Simulation'}
            </button>

            {/* Current Step */}
            {currentStep && (
                <div className="mb-4 p-3 bg-gray-800 rounded">
                    <h3 className="text-lg font-semibold text-blue-400">Current Step: {currentStep}</h3>
                </div>
            )}

            {/* Operations Display */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Operations Sequence</h3>
                {renderOperations()}
            </div>

            {/* Game State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Stack Visualization */}
                <div className="flex justify-center">
                    {renderStack()}
                </div>

                {/* Current Sum */}
                <div className="text-center">
                    <h4 className="font-semibold mb-2 text-white">Total Sum</h4>
                    <div className="bg-gray-800 border-2 border-gray-600 rounded p-8">
                        <div className="text-4xl font-bold text-green-400 font-mono">
                            {currentSum}
                        </div>
                        <div className="text-gray-400 mt-2">
                            Sum of all scores in record
                        </div>
                    </div>
                </div>
            </div>

            {/* Status */}
            {status.string && (
                <div className={`p-3 bg-gray-800 rounded ${status.color} mb-4`}>
                    <p className="font-medium">{status.string}</p>
                </div>
            )}

            {/* Operation History */}
            {renderHistory()}

            {/* Algorithm Explanation */}
            <div className="mt-6 p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold mb-2 text-white">Algorithm Explanation</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Use a stack to keep track of valid scores and maintain a running sum</li>
                    <li>For each operation:
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li><strong className="text-yellow-400">Number</strong>: Push to stack and add to sum</li>
                            <li><strong className="text-red-400">"C" (Cancel)</strong>: Pop from stack and subtract from sum</li>
                            <li><strong className="text-purple-400">"D" (Double)</strong>: Double the last score, push result, add to sum</li>
                            <li><strong className="text-green-400">"+" (Add)</strong>: Sum last two scores, push result, add to sum</li>
                        </ul>
                    </li>
                    <li>Return the final sum after processing all operations</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-900 rounded">
                    <h4 className="font-semibold text-blue-300">Key Insight</h4>
                    <p className="text-gray-300 mt-1">
                        We maintain the sum incrementally instead of calculating it at the end, 
                        which gives us O(1) time complexity for the final result.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BaseballGameVisualizer;
