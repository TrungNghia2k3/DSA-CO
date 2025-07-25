import React, { useState } from 'react';

const NumberOfRecentCallsVisualizer = () => {
    /**
     * State to store the ping requests (time values).
     * @type {[Array<number>, Function]}
     */
    const [pings, setPings] = useState([1, 100, 3001, 3002]);

    /**
     * State to store the status message and its associated color.
     * @type {[{color: string, string: string}, Function]}
     */
    const [status, setStatus] = useState({ color: '', string: '' });

    /**
     * State to store the current queue state.
     * @type {[Array<number>, Function]}
     */
    const [queue, setQueue] = useState([]);

    /**
     * State to store the current time range being considered.
     * @type {[{start: number, end: number} | null, Function]}
     */
    const [timeRange, setTimeRange] = useState(null);

    /**
     * State to store the currently processing ping index.
     * @type {[number | null, Function]}
     */
    const [currentPingIndex, setCurrentPingIndex] = useState(null);

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
     * State to store processing history.
     * @type {[Array<Object>, Function]}
     */
    const [history, setHistory] = useState([]);

    /**
     * State to store the current result count.
     * @type {[number | null, Function]}
     */
    const [currentResult, setCurrentResult] = useState(null);

    /**
     * Utility function to introduce a delay for asynchronous operations.
     * @param {number} ms - The delay duration in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Function to run the Recent Counter simulation.
     * Processes each ping request and shows how the queue changes.
     * 
     * @async
     * @returns {void}
     */
    const runRecentCounter = async () => {
        setRunning(true);
        setStatus({ color: '', string: '' });
        setQueue([]);
        setTimeRange(null);
        setCurrentPingIndex(null);
        setCurrentResult(null);
        setHistory([]);

        const recentQueue = [];
        const stepHistory = [];

        setCurrentStep('Initializing RecentCounter');
        setStatus({ color: 'text-blue-500', string: '🚀 Initializing RecentCounter with empty queue...' });
        await sleep(1000);

        for (let i = 0; i < pings.length; i++) {
            const t = pings[i];
            setCurrentPingIndex(i);
            setCurrentStep(`Processing ping(${t})`);

            // Set the time range for this ping
            const rangeStart = t - 3000;
            const rangeEnd = t;
            setTimeRange({ start: rangeStart, end: rangeEnd });

            setStatus({ 
                color: 'text-blue-500', 
                string: `📞 New ping at time ${t}. Looking for requests in range [${rangeStart}, ${rangeEnd}]` 
            });
            await sleep(1500);

            // Add the new request to queue
            recentQueue.push(t);
            setQueue([...recentQueue]);

            setStatus({ 
                color: 'text-green-500', 
                string: `➕ Added request at time ${t} to queue` 
            });
            await sleep(1200);

            // Remove outdated requests
            let removedCount = 0;
            const removedRequests = [];
            
            while (recentQueue.length > 0 && recentQueue[0] < rangeStart) {
                const removed = recentQueue.shift();
                removedRequests.push(removed);
                removedCount++;
                setQueue([...recentQueue]);
                
                setStatus({ 
                    color: 'text-red-500', 
                    string: `🗑️ Removed outdated request at time ${removed} (< ${rangeStart})` 
                });
                await sleep(1000);
            }

            if (removedCount === 0) {
                setStatus({ 
                    color: 'text-gray-500', 
                    string: `✅ No outdated requests to remove` 
                });
                await sleep(800);
            }

            // Show current result
            const result = recentQueue.length;
            setCurrentResult(result);

            setStatus({ 
                color: 'text-green-600', 
                string: `🎯 Result: ${result} recent requests in the past 3000ms` 
            });

            // Record step in history
            stepHistory.push({
                pingIndex: i,
                time: t,
                rangeStart,
                rangeEnd,
                queueBefore: i === 0 ? [] : [...stepHistory[i-1].queueAfter],
                queueAfter: [...recentQueue],
                removedRequests: [...removedRequests],
                result
            });
            setHistory([...stepHistory]);

            await sleep(1500);
        }

        setCurrentStep('All pings processed');
        setCurrentPingIndex(null);
        setStatus({ 
            color: 'text-green-600', 
            string: `✅ All ping requests have been processed successfully!` 
        });

        setRunning(false);
    };

    /**
     * Handles input change for ping requests.
     * @param {Event} e - Input change event
     */
    const handleInputChange = (e) => {
        const input = e.target.value;
        const pingValues = input.split(',')
            .map(val => val.trim())
            .filter(val => val !== '' && !isNaN(val))
            .map(val => parseInt(val))
            .filter(val => val > 0);
        setPings(pingValues);
    };

    /**
     * Renders the ping requests with highlighting.
     * @returns {JSX.Element} Rendered ping requests
     */
    const renderPings = () => {
        return (
            <div className="mb-6">
                <h4 className="font-semibold mb-2 text-white">Ping Requests (Time Values)</h4>
                <div className="flex gap-2 flex-wrap">
                    {pings.map((ping, index) => (
                        <div
                            key={index}
                            className={`px-3 py-2 rounded border font-mono text-lg ${
                                index === currentPingIndex 
                                    ? 'bg-yellow-600 text-white border-yellow-400 transform scale-110' 
                                    : index < currentPingIndex
                                    ? 'bg-green-800 text-green-300 border-green-600'
                                    : 'bg-gray-700 text-gray-300 border-gray-600'
                            } transition-all duration-300`}
                        >
                            {ping}
                            {index === currentPingIndex && (
                                <div className="text-xs mt-1 text-yellow-200">← Current</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    /**
     * Renders the time range visualization.
     * @returns {JSX.Element} Rendered time range
     */
    const renderTimeRange = () => {
        if (!timeRange) return null;

        return (
            <div className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded">
                <h4 className="font-semibold mb-2 text-white">Current Time Range (Past 3000ms)</h4>
                <div className="flex items-center justify-center gap-4 text-lg">
                    <div className="text-center">
                        <div className="text-red-400 font-mono text-xl">{timeRange.start}</div>
                        <div className="text-sm text-gray-400">Start (t - 3000)</div>
                    </div>
                    <div className="text-white font-bold text-2xl">≤ time ≤</div>
                    <div className="text-center">
                        <div className="text-green-400 font-mono text-xl">{timeRange.end}</div>
                        <div className="text-sm text-gray-400">End (current t)</div>
                    </div>
                </div>
                <div className="text-center mt-2 text-blue-400">
                    Range: [{timeRange.start}, {timeRange.end}]
                </div>
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
                <h4 className="font-semibold mb-2 text-white">RecentCounter Queue</h4>
                <div className="bg-gray-800 border-2 border-gray-600 rounded p-4 min-h-[120px]">
                    {queue.length === 0 ? (
                        <div className="text-gray-500 text-center">
                            Queue is empty
                        </div>
                    ) : (
                        <div>
                            <div className="flex gap-2 flex-wrap mb-3">
                                {queue.map((time, index) => {
                                    const isInRange = timeRange && time >= timeRange.start && time <= timeRange.end;
                                    return (
                                        <div
                                            key={`${time}-${index}`}
                                            className={`px-3 py-2 rounded border font-mono ${
                                                isInRange 
                                                    ? 'bg-green-600 text-white border-green-400' 
                                                    : 'bg-red-600 text-white border-red-400'
                                            }`}
                                        >
                                            {time}
                                            {index === 0 && (
                                                <div className="text-xs mt-1">← Front</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-sm text-gray-400">
                                Queue size: {queue.length} requests
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    /**
     * Renders the current result.
     * @returns {JSX.Element} Rendered result
     */
    const renderResult = () => {
        if (currentResult === null) return null;

        return (
            <div className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded text-center">
                <h4 className="font-semibold mb-2 text-white">Current Result</h4>
                <div className="text-4xl font-bold text-green-400 font-mono mb-2">
                    {currentResult}
                </div>
                <div className="text-gray-400">
                    requests in the past 3000 milliseconds
                </div>
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
                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {history.map((entry, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded border border-gray-600">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-mono text-yellow-400 text-lg">
                                    ping({entry.time})
                                </span>
                                <span className="text-green-400 font-bold">
                                    Result: {entry.result}
                                </span>
                            </div>
                            
                            <div className="text-sm space-y-1">
                                <div className="text-blue-400">
                                    Range: [{entry.rangeStart}, {entry.rangeEnd}]
                                </div>
                                
                                <div className="text-gray-300">
                                    Queue before: [{entry.queueBefore.join(', ')}]
                                </div>
                                
                                {entry.removedRequests.length > 0 && (
                                    <div className="text-red-400">
                                        Removed: [{entry.removedRequests.join(', ')}]
                                    </div>
                                )}
                                
                                <div className="text-green-400">
                                    Queue after: [{entry.queueAfter.join(', ')}]
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="py-4">
            <h2 className="text-xl font-bold mb-4 text-white">Number of Recent Calls Visualizer</h2>
            <p className="text-gray-300 mb-4">
                Watch how the RecentCounter queue manages requests within a 3000ms sliding window.
            </p>

            <div className="mb-4">
                <label className="block font-medium mb-1 text-white">
                    Ping Requests (comma-separated time values):
                </label>
                <input
                    type="text"
                    value={pings.join(',')}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white font-mono"
                    disabled={running}
                    placeholder="e.g., 1,100,3001,3002"
                />
                <div className="text-sm text-gray-400 mt-1">
                    Note: Values should be strictly increasing (as guaranteed in the problem)
                </div>
            </div>

            <button
                onClick={runRecentCounter}
                disabled={running || pings.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 mb-4"
            >
                {running ? 'Running...' : 'Start Simulation'}
            </button>

            {/* Current Step */}
            {currentStep && (
                <div className="mb-4 p-3 bg-gray-800 rounded">
                    <h3 className="text-lg font-semibold text-blue-400">Current Step: {currentStep}</h3>
                </div>
            )}

            {/* Ping Requests Display */}
            {renderPings()}

            {/* Time Range */}
            {renderTimeRange()}

            {/* Queue State */}
            {renderQueue()}

            {/* Current Result */}
            {renderResult()}

            {/* Status */}
            {status.string && (
                <div className={`p-3 bg-gray-800 rounded ${status.color} mb-4`}>
                    <p className="font-medium">{status.string}</p>
                </div>
            )}

            {/* Legend */}
            <div className="mb-6 p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold mb-2 text-white">Legend</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                        <span className="text-gray-300">Valid requests (within range)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded"></div>
                        <span className="text-gray-300">Outdated requests (will be removed)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                        <span className="text-gray-300">Currently processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-800 rounded"></div>
                        <span className="text-gray-300">Already processed</span>
                    </div>
                </div>
            </div>

            {/* Processing History */}
            {renderHistory()}

            {/* Algorithm Explanation */}
            <div className="mt-6 p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold mb-2 text-white">Algorithm Explanation</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Use a queue to store ping request timestamps</li>
                    <li>For each new ping request at time t:
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li>Add the new timestamp t to the end of the queue</li>
                            <li>Remove all timestamps from the front of the queue that are older than (t - 3000)</li>
                            <li>Return the current size of the queue</li>
                        </ul>
                    </li>
                    <li>The queue maintains only requests within the sliding window [t-3000, t]</li>
                    <li>Queue size represents the number of recent calls within the time frame</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-900 rounded">
                    <h4 className="font-semibold text-blue-300">Key Insight</h4>
                    <p className="text-gray-300 mt-1">
                        Since ping times are strictly increasing, we only need to remove from the front of the queue. 
                        This gives us an efficient O(1) amortized solution since each request is added and removed at most once.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NumberOfRecentCallsVisualizer;
