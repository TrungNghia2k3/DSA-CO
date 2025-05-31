import React, {useState, useEffect} from 'react';

const SearchInsertBruteForceVisualizer = () => {
    const [arrayInput, setArrayInput] = useState('1, 3, 5, 6');
    const [targetInput, setTargetInput] = useState('4');
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [i, setI] = useState(0);
    const [insertIndex, setInsertIndex] = useState(null);
    const [done, setDone] = useState(false);
    const [status, setStatus] = useState('');

    const run = () => {
        const arr = arrayInput.split(',').map(num => parseInt(num.trim(), 10));
        const t = parseInt(targetInput.trim(), 10);
        setArray(arr);
        setTarget(t);
        setI(0);
        setInsertIndex(null);
        setDone(false);
        setStatus('');
    };


    const step = () => {
        if (i >= array.length && target > array[array.length - 1]) {
            array.push(target);
            setArray([...array]);
            setInsertIndex(array.length - 1);
            setStatus(`📌 Target ${target} is greater than all → Insert at end`);
            setDone(true);
            return;
        }

        if (array[i] >= target) {
            if (array[i] !== target) {
                array.splice(i, 0, target); // insert target
                setArray([...array]);
                setStatus(`📌 Insert ${target} before ${array[i + 1]} at index ${i}`);
            } else {
                setStatus(`✅ Target ${target} found at index ${i}`);
            }
            setInsertIndex(i);
            setDone(true);
            return;
        }

        setI(prev => prev + 1);
    };

    useEffect(() => {
        if (done) return;
        const timer = setTimeout(() => step(), 1000);
        return () => clearTimeout(timer);
    }, [i, done, step]);

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Search Insert Position Visualizer (Brute Force)</h2>

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
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className={`w-10 h-10 rounded flex items-center justify-center text-white font-bold
                            ${idx === i && !done ? 'bg-blue-500' :
                            idx === insertIndex ? 'bg-green-600' :
                                'bg-gray-700'}`}
                    >
                        {num}
                    </div>
                ))}
            </div>

            {status && <p className="mt-4">{status}</p>}
        </div>
    );
};

export default SearchInsertBruteForceVisualizer;
