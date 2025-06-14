import React, {useState} from 'react';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const TwoSumBruteForceVisualizer = () => {
    // State variables used in the Two Sum Brute Force Visualizer component

    /**
     * State to store the input array as a comma-separated string.
     * @type {[string, Function]}
     */
    const [numsInput, setNumsInput] = useState('2,7,11,15');

    /**
     * State to store the target sum for the Two Sum problem.
     * @type {[number, Function]}
     */
    const [target, setTarget] = useState(9);

    /**
     * State to store the steps of the simulation (not currently used).
     * @type {[Array, Function]}
     */
    const [, setSteps] = useState([]);

    /**
     * State to store the current step in the simulation, represented by indices being checked.
     * @type {[{i: number, j: number} | null, Function]}
     */
    const [currentStep, setCurrentStep] = useState(null);

    /**
     * State to store the indices of the found pair that satisfies the Two Sum condition.
     * @type {[Array<number> | null, Function]}
     */
    const [foundPair, setFoundPair] = useState(null);

    /**
     * State to track whether the simulation is currently running.
     * @type {[boolean, Function]}
     */
    const [running, setRunning] = useState(false);

    /**
     * Function to run the brute force simulation for solving the Two Sum problem.
     * Iterates through all pairs of numbers in the input array to find a pair that adds up to the target.
     * Updates the state variables to reflect the current step, found pair, and running status.
     * Includes a delay of 1 second between each step for visualization purposes.
     *
     * @async
     * @returns {void}
     */
    const runSimulation = async () => {
        // Parse the input array from the comma-separated string
        const nums = numsInput.split(',').map((n) => parseInt(n.trim()));

        // Reset states before starting the simulation
        setSteps([]);
        setFoundPair(null);
        setCurrentStep(null);
        setRunning(true);

        // Iterate through all pairs of numbers in the array
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                // Update the current step state
                setCurrentStep({i, j});

                // Introduce a delay for visualization
                await delay(1000);

                // Check if the current pair satisfies the Two Sum condition
                if (nums[i] + nums[j] === parseInt(target)) {
                    // Update the state with the found pair and stop the simulation
                    setFoundPair([i, j]);
                    setRunning(false);
                    return;
                }
            }
        }

        // Mark the simulation as complete if no pair is found
        setRunning(false);
    };

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Two Sum Visualizer (Brute Force)</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    className="w-full p-2 border rounded outline-none focus:outline-none"
                    value={numsInput}
                    onChange={(e) => setNumsInput(e.target.value)}
                    disabled={running}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Target:</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded outline-none focus:outline-none"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    disabled={running}
                />
            </div>

            <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50text-white rounded "
                onClick={runSimulation}
                disabled={running}
            >
                {running ? 'Running...' : 'Run'}
            </button>

            <div className="mt-6 grid grid-cols-6 gap-2 text-center">
                {numsInput.split(',').map((n, idx) => {
                    const isCurrent =
                        currentStep && (currentStep.i === idx || currentStep.j === idx);
                    const isFound = foundPair && foundPair.includes(idx);

                    return (
                        <div
                            key={idx}
                            className={`p-3 rounded ${
                                isFound
                                    ? 'bg-green-600'
                                    : isCurrent
                                        ? 'bg-yellow-600'
                                        : 'layout-default-bg'
                            }`}
                        >
                            {n.trim()}
                            <div className="text-xs text-white">Index {idx}</div>
                        </div>
                    );
                })}
            </div>

            {foundPair && (
                <div className="mt-4 text-green-600 font-semibold">
                    ✅ Found pair at indices [{foundPair[0]}, {foundPair[1]}]
                </div>
            )}

            {!foundPair && !running && currentStep === null && (
                <div className="mt-4 text-red-500 font-semibold">No pair found.</div>
            )}
        </div>
    );
};

export default TwoSumBruteForceVisualizer;
