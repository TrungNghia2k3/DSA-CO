import React, { useState, useEffect } from 'react';

const RemoveDuplicatesTwoPointersVisualizer = () => {
    const [arrayInput, setArrayInput] = useState('0,0,1,1,1,2,2,3,3,4');
    const [array, setArray] = useState([]);
    const [i, setI] = useState(1);
    const [idx, setIdx] = useState(1);
    const [status, setStatus] = useState({ message: '', color: '' });
    const [isRunning, setIsRunning] = useState(false);

    const run = () => {
        const parsed = arrayInput.split(',').map(num => parseInt(num.trim(), 10));
        setArray(parsed);
        setI(1);
        setIdx(1);
        setStatus({ message: '', color: '' });
        setIsRunning(true);
    };

    const step = () => {
        if (i >= array.length) {
            setStatus({ message: `✅ Done. Unique length: ${idx}`, color: 'text-green-500' });
            setIsRunning(false);
            return;
        }

        if (array[i] !== array[i - 1]) {
            array[idx] = array[i];
            setArray([...array]);
            setStatus({ message: `✅ arr[${i}] (${array[i]}) ≠ arr[${i - 1}] (${array[i - 1]}) → arr[${idx}] = ${array[i]}`, color: 'text-green-500' });
            setIdx(prev => prev + 1);
        } else {
            setStatus({ message: `⚠️ arr[${i}] (${array[i]}) == arr[${i - 1}] (${array[i - 1]}) → skip`, color: 'text-yellow-500' });
        }

        setI(prev => prev + 1);
    };

    useEffect(() => {
        if (!isRunning) return;
        const timer = setTimeout(() => step(), 1000);
        return () => clearTimeout(timer);
    }, [i, isRunning]);

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Remove Duplicates Visualizer (Two Pointers)</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    type="text"
                    className="w-full border p-2 mb-4 outline-none focus:outline-none"
                    value={arrayInput}
                    onChange={(e) => setArrayInput(e.target.value)}
                    placeholder="Enter sorted numbers, e.g., 1,1,2,2,3"
                />
            </div>

            <button
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded"
                onClick={run}
                disabled={isRunning}
            >
                {isRunning ? 'Running' : 'Run'}
            </button>

            <div className="flex gap-2 my-4 flex-wrap">
                {array.map((num, mapIndex) => (
                    <div
                        key={mapIndex}
                        className={`p-2 w-10 h-10 text-center rounded ${
                            mapIndex === i
                                ? 'bg-blue-600'
                                : mapIndex < idx
                                    ? 'bg-green-600'
                                    : 'bg-gray-700'
                        }`}
                    >
                        {num}
                    </div>
                ))}
            </div>
            <p className={`mt-2 ${status.color}`}>{status.message}</p>
        </div>
    );
};

export default RemoveDuplicatesTwoPointersVisualizer;
