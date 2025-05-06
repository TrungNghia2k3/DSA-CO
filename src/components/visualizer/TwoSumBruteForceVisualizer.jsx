import React, { useState } from 'react';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const TwoSumBruteForceVisualizer = () => {
    const [numsInput, setNumsInput] = useState('2,7,11,15');
    const [target, setTarget] = useState(9);
    const [, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(null);
    const [foundPair, setFoundPair] = useState(null);
    const [running, setRunning] = useState(false);

    const runSimulation = async () => {
        const nums = numsInput.split(',').map((n) => parseInt(n.trim()));
        setSteps([]);
        setFoundPair(null);
        setCurrentStep(null);
        setRunning(true);

        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                setCurrentStep({ i, j });
                await delay(1000); // 1 second delay
                if (nums[i] + nums[j] === parseInt(target)) {
                    setFoundPair([i, j]);
                    setRunning(false);
                    return;
                }
            }
        }

        setRunning(false);
    };

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Two Sum Visualizer (Brute Force)</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    className="w-full p-2 border rounded"
                    value={numsInput}
                    onChange={(e) => setNumsInput(e.target.value)}
                    disabled={running}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Target:</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    disabled={running}
                />
            </div>

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={runSimulation}
                disabled={running}
            >
                Run
            </button>

            <div className="mt-6 grid grid-cols-6 gap-2 text-center">
                {numsInput.split(',').map((n, idx) => {
                    const isCurrent =
                        currentStep && (currentStep.i === idx || currentStep.j === idx);
                    const isFound = foundPair && foundPair.includes(idx);

                    return (
                        <div
                            key={idx}
                            className={`p-3 border rounded ${
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
