import React, {useState} from 'react';

const TwoSumVisualizer = () => {
    /**
     * State to store the array of numbers for the Two Sum problem.
     * @type {[Array<number>, Function]}
     */
    const [nums, setNums] = useState([2, 7, 11, 15]);

    /**
     * State to store the target sum for the Two Sum problem.
     * @type {[number, Function]}
     */
    const [target, setTarget] = useState(9);

    /**
     * State to store the status message and its associated color.
     * @type {[{color: string, string: string}, Function]}
     */
    const [status, setStatus] = useState({color: '', string: ''});

    /**
     * State to store the currently highlighted indices during the simulation.
     * @type {[{i: number | null, j: number | null}, Function]}
     */
    const [highlighted, setHighlighted] = useState({i: null, j: null});

    /**
     * State to store the indices of the found pair that satisfies the Two Sum condition.
     * @type {[Array<number>, Function]}
     */
    const [foundPair, setFoundPair] = useState([]);

    /**
     * State to track whether the simulation is currently running.
     * @type {[boolean, Function]}
     */
    const [running, setRunning] = useState(false);

    /**
     * Utility function to introduce a delay for asynchronous operations.
     * @param {number} ms - The delay duration in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Function to run the Two Sum simulation using a hash table approach.
     * Iterates through the array to find two numbers that add up to the target sum.
     * Updates the state variables to reflect the current status, highlighted indices, and found pair.
     * Includes a delay for visualization purposes.
     *
     * @async
     * @returns {void}
     */
    const runTwoSum = async () => {
        setRunning(true); // Mark the simulation as running
        setStatus({color: '', string: ''}); // Reset the status message
        setFoundPair([]); // Clear the found pair state
        const numToIndex = {}; // Hash table to store numbers and their indices

        for (let i = 0; i < nums.length; i++) {
            const current = nums[i]; // Current number being checked
            const complement = target - current; // Complement needed to reach the target sum
            setHighlighted({i}); // Highlight the current index
            setStatus({color: 'text-yellow-500', string: `🔎 Checking ${current}, looking for ${complement}`});
            await sleep(1000); // Introduce a delay for visualization

            // Check if the complement exists in the hash table
            if (Object.prototype.hasOwnProperty.call(numToIndex, complement)) {
                setFoundPair([numToIndex[complement], i]); // Update the found pair state
                setStatus({
                    color: 'text-green-600',
                    string: `✅ Found pair at indices [${numToIndex[complement]}, ${i}]`
                });
                setRunning(false); // Stop the simulation
                return;
            }

            numToIndex[current] = i; // Add the current number to the hash table
        }

        // Update the status if no valid pair is found
        setStatus({color: 'text-red-500', string: '❌ No valid pair found.'});
        setRunning(false); // Mark the simulation as complete
    };

    const handleInputChange = (e) => {
        setNums(e.target.value.split(',').map(n => parseInt(n.trim(), 10)));
    };

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Two Sum Visualizer (Hash Table)</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    type="text"
                    value={nums.join(',')}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded outline-none focus:outline-none"
                    disabled={running}
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium">Target:</label>
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(parseInt(e.target.value, 10))}
                    className="w-full p-2 border rounded outline-none focus:outline-none"
                    disabled={running}
                />
            </div>

            <button
                onClick={runTwoSum}
                disabled={running}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {running ? 'Running...' : 'Run'}
            </button>

            <div className="mt-6 grid grid-cols-6 gap-2 text-center">
                {nums.map((num, idx) => {
                    const isFound = foundPair.includes(idx);
                    const isCurrent = highlighted.i === idx;
                    return (
                        <div
                            key={idx}
                            className={`p-3 rounded
                                    ${isFound ?
                                'bg-green-600'
                                : isCurrent
                                    ? 'bg-yellow-600'
                                    : 'layout-default-bg'}`}
                        >
                            {num}
                            <div className="text-xs text-white">Index {idx}</div>
                        </div>
                    );
                })}
            </div>

            {status.string && (
                <div className={`mt-4 font-semibold ${status.color}`}>{status.string}</div>
            )}

        </div>
    );
};

export default TwoSumVisualizer;