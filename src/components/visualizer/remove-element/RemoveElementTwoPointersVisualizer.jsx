import React, { useState, useEffect } from 'react';

const RemoveElementTwoPointersVisualizer = () => {
    const [input, setInput] = useState('3,2,2,3');
    const [val, setVal] = useState('3');
    const [array, setArray] = useState([]);
    const [i, setI] = useState(0);
    const [k, setK] = useState(0);
    const [status, setStatus] = useState('');
    const [running, setRunning] = useState(false);

    const run = () => {
        const parsed = input.split(',').map(n => parseInt(n.trim(), 10));
        setArray(parsed);
        setI(0);
        setK(0);
        setStatus('');
        setRunning(true);
    }

    const step = () => {
        if (i >= array.length) {
            setStatus(`✅ Done. New length (k): ${k}`);
            setRunning(false);
            return;
        }

        const current = array[i];
        const target = parseInt(val, 10);

        if (current !== target) {
            const updatedArray = [...array];
            updatedArray[k] = current;
            setArray(updatedArray);
            setStatus(`✅ arr[${i}] (${current}) ≠ val (${target}) → arr[${k}] = ${current}`);
            setK(prev => prev + 1);
        } else {
            setStatus(`❌ arr[${i}] (${current}) == val (${target}) → skip`);
        }

        setI(prev => prev + 1);
    };

    useEffect(() => {
        if (!running) return;
        const timer = setTimeout(() => step(), 1500);
        return () => clearTimeout(timer);
    }, [i, running]);

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Remove Element (Two Pointers)</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter array, e.g. 3,2,2,3"
                    className="border p-2 w-full mb-2"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Value:</label>
                <input
                    type="text"
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    placeholder="Enter value to remove"
                    className="border p-2 w-full mb-4"
                />
            </div>


            <button
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50  text-white px-4 py-2 rounded"
                onClick={run}
                disabled={running}
            >
                {running ? 'Running...' : 'Run'}
            </button>

            <div className="flex gap-2 my-4 flex-wrap">
                {array.map((num, index) => (
                    <div
                        key={index}
                        className={`w-10 h-10 flex items-center justify-center rounded text-white ${
                            index === i
                                ? 'bg-blue-600'
                                : index < k
                                    ? 'bg-green-600'
                                    : 'bg-gray-700'
                        }`}
                        title={
                            index === i
                                ? 'Current element (i)'
                                : index < k
                                    ? 'Valid element (k region)'
                                    : 'Unprocessed or removed'
                        }
                    >
                        {num}
                    </div>
                ))}
            </div>

            <p className="mt-2">{status}</p>
        </div>
    );
};

export default RemoveElementTwoPointersVisualizer;
