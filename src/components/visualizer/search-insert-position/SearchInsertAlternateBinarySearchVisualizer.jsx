import React, {useState, useEffect} from 'react';

const SearchInsertAlternateBinarySearchVisualizer = () => {
    const [arrayInput, setArrayInput] = useState('1, 3, 5, 6');
    const [targetInput, setTargetInput] = useState('4');

    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [mid, setMid] = useState(null);
    const [insertIndex, setInsertIndex] = useState(null);
    const [done, setDone] = useState(false);
    const [status, setStatus] = useState('');

    const initializeSearch = () => {
        const arr = arrayInput
            .split(',')
            .map(n => parseInt(n.trim(), 10))
            .filter(n => !isNaN(n))
            .sort((a, b) => a - b); // ensure sorted

        const t = parseInt(targetInput.trim(), 10);
        if (isNaN(t)) return;

        setArray(arr);
        setTarget(t);
        setLeft(0);
        setRight(arr.length - 1);
        setMid(null);
        setInsertIndex(null);
        setDone(false);
        setStatus('');
    };

    const stepSearch = () => {
        if (done) return;

        if (left > right) {
            // Target not found, insert position is at left
            const newArr = [...array];
            newArr.splice(left, 0, target);
            setArray(newArr);
            setInsertIndex(left);
            setStatus(`❌ Target ${target} not found. Insert at index ${left}`);
            setDone(true);
            return;
        }

        const m = Math.floor((left + right) / 2);
        setMid(m);

        if (array[m] === target) {
            setInsertIndex(m);
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
            const timer = setTimeout(stepSearch, 800);
            return () => clearTimeout(timer);
        }
    }, [left, right, done, target, stepSearch]);

    const getBoxColor = (num, idx) => {
        if (!done) {
            if (idx === mid) return 'bg-yellow-500';
            if (idx === left) return 'bg-blue-500';
            if (idx === right) return 'bg-red-500';
            return 'bg-gray-700';
        } else {
            if (num === target && idx === insertIndex) return 'bg-green-600'; // found
            if (idx === insertIndex && num === target) return 'bg-purple-600'; // inserted
            return 'bg-gray-700';
        }
    };

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Search Insert Position (Binary Search)</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    type="text"
                    className="border p-2 w-full mb-2 outline-none focus:outline-non"
                    value={arrayInput}
                    onChange={(e) => setArrayInput(e.target.value)}
                    placeholder="Enter sorted array, e.g., 1,3,5,6"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Target:</label>
                <input
                    type="number"
                    className="border p-2 w-full mb-2 outline-none focus:outline-non"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="Target"
                />
            </div>

            <button
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50  text-white px-4 py-2 rounded"
                onClick={initializeSearch}
            >
                Run
            </button>

            <div className="flex gap-2 flex-wrap my-6">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className={`w-10 h-10 rounded flex items-center justify-center text-white font-bold ${getBoxColor(num, idx)}`}
                    >
                        {num}
                    </div>
                ))}
            </div>

            {status && <p className="mt-4">{status}</p>}
        </div>
    );
};

export default SearchInsertAlternateBinarySearchVisualizer;
