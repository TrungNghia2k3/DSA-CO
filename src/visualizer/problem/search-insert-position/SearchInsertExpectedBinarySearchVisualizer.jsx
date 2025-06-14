import React, {useState, useEffect} from 'react';

const SearchInsertExpectedBinarySearchVisualizer = () => {
    const [arrayInput, setArrayInput] = useState('1, 3, 5, 6');
    const [targetInput, setTargetInput] = useState('4');
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [mid, setMid] = useState(null);
    const [status, setStatus] = useState('');
    const [done, setDone] = useState(false);
    const [inserted, setInserted] = useState(false);

    const run = () => {
        const arr = arrayInput.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
        const t = parseInt(targetInput.trim(), 10);
        setArray(arr);
        setTarget(t);
        setLeft(0);
        setRight(arr.length - 1);
        setMid(null);
        setStatus('');
        setDone(false);
        setInserted(false);
    };

    const step = () => {
        if (done) return;

        if (left > right) {
            // Insert the target when not found
            if (!inserted) {
                const newArr = [...array];
                newArr.splice(left, 0, target);
                setArray(newArr);
                setInserted(true);
                setStatus(`📌 Target ${target} not found. Inserted at index ${left}`);
            }
            setDone(true);
            return;
        }

        const m = left + Math.floor((right - left) / 2);
        setMid(m);

        if (array[m] === target) {
            setStatus(`✅ Target ${target} found at index ${m}`);
            setDone(true);
        } else if (array[m] > target) {
            setStatus(`🔍 ${target} < ${array[m]} → search left`);
            setRight(m - 1);
        } else {
            setStatus(`🔍 ${target} > ${array[m]} → search right`);
            setLeft(m + 1);
        }
    };

    useEffect(() => {
        if (!done && target !== null) {
            const timer = setTimeout(() => step(), 1000);
            return () => clearTimeout(timer);
        }
    }, [done, left, right, step, target]);

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Search Insert Position (Binary Search + Insert)</h2>
            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    type="text"
                    className="border p-2 w-full mb-2 outline-none focus:outline-none"
                    value={arrayInput}
                    onChange={(e) => setArrayInput(e.target.value)}
                    placeholder="Enter sorted array, e.g., 1,3,5,6"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Target:</label>
                <input
                    type="number"
                    className="border p-2 w-full mb-2 outline-none focus:outline-none"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="Target"
                />
            </div>

            <button
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded"
                onClick={run}
            >
                Run
            </button>

            <div className="flex gap-2 flex-wrap my-6">
                {array.map((num, idx) => {
                    let bgColor = 'bg-gray-700';

                    if (!done) {
                        if (idx === mid) bgColor = 'bg-yellow-500';
                        else if (idx === left) bgColor = 'bg-blue-500';
                        else if (idx === right) bgColor = 'bg-red-500';
                    } else {
                        if (num === target) bgColor = 'bg-green-600'; // ✅ Highlight target after completion
                    }

                    return (
                        <div
                            key={idx}
                            className={`w-10 h-10 rounded flex items-center justify-center text-white font-bold ${bgColor}`}
                        >
                            {num}
                        </div>
                    );
                })}
            </div>

            {status && <p className="mt-4">{status}</p>}
        </div>
    );
};

export default SearchInsertExpectedBinarySearchVisualizer;
