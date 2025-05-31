import React, {useState} from 'react';

const TwoSumVisualizer = () => {
    const [nums, setNums] = useState([2, 7, 11, 15]);
    const [target, setTarget] = useState(9);
    const [status, setStatus] = useState({color: '', string: ''});
    const [highlighted, setHighlighted] = useState({i: null, j: null});
    const [foundPair, setFoundPair] = useState([]);
    const [running, setRunning] = useState(false);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const runTwoSum = async () => {
        setRunning(true);
        setStatus({color: '', string: ''});
        setFoundPair([]);
        const numToIndex = {};

        for (let i = 0; i < nums.length; i++) {
            const current = nums[i];
            const complement = target - current;
            setHighlighted({i});
            setStatus({color: 'text-yellow-500', string: `🔎 Checking ${current}, looking for ${complement}`});
            await sleep(1000);

            if (Object.prototype.hasOwnProperty.call(numToIndex, complement)) {
                setFoundPair([numToIndex[complement], i]);
                setStatus({
                    color: 'text-green-600',
                    string: `✅ Found pair at indices [${numToIndex[complement]}, ${i}]`
                });
                setRunning(false);
                return;
            }

            numToIndex[current] = i;
        }

        setStatus({color: 'text-red-500', string: '❌ No valid pair found.'});
        setRunning(false);
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