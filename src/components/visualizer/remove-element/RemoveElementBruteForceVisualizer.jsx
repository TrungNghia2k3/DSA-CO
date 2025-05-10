import React, {useState, useEffect} from 'react';

const RemoveElementBruteForceVisualizer = () => {
    const [input, setInput] = useState('3,2,2,3');
    const [val, setVal] = useState('3');
    const [nums, setNums] = useState([]);
    const [tmp, setTmp] = useState([]);
    const [phase, setPhase] = useState('filter'); // 'filter' or 'copy'
    const [index, setIndex] = useState(0);
    const [status, setStatus] = useState('');
    const [running, setRunning] = useState(false);

    const run = () => {
        const parsed = input.split(',').map(n => parseInt(n.trim(), 10));
        setNums(parsed);
        setTmp([]);
        setPhase('filter');
        setIndex(0);
        setStatus('');
        setRunning(true);
    }

    const step = () => {
        const target = parseInt(val, 10);

        if (phase === 'filter') {
            if (index >= nums.length) {
                setPhase('copy');
                setIndex(0);
                setStatus('✅ Filtering done. Starting to copy back...');
                return;
            }

            const current = nums[index];
            if (current !== target) {
                setTmp(prev => [...prev, current]);
                setStatus(`✅ nums[${index}] (${current}) ≠ val (${target}) → push to tmp`);
            } else {
                setStatus(`❌ nums[${index}] (${current}) == val (${target}) → skip`);
            }
            setIndex(prev => prev + 1);
        } else if (phase === 'copy') {
            if (index >= tmp.length) {
                setStatus(`✅ Done. New length = ${tmp.length}`);
                setRunning(false);
                return;
            }

            const newNums = [...nums];
            newNums[index] = tmp[index];
            setNums(newNums);
            setStatus(`📥 nums[${index}] = tmp[${index}] (${tmp[index]})`);
            setIndex(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (!running) return;
        const timer = setTimeout(() => step(), 1500);
        return () => clearTimeout(timer);
    }, [index, running]);

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Remove Element (Brute Force)</h2>

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
                <label className="block font-medium mb-1">Value</label>
                <input
                    type="text"
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    placeholder="Enter value to remove"
                    className="border p-2 w-full mb-4"
                />
            </div>

            <button
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded"
                onClick={run}
                disabled={running}
            >
                {running ? 'Running...' : 'Run'}
            </button>

            <div className="mt-4">
                <h4 className="font-semibold mb-1">nums:</h4>
                <div className="flex gap-2 flex-wrap">
                    {nums.map((num, idx) => (
                        <div
                            key={idx}
                            className={`w-10 h-10 flex items-center justify-center rounded text-white ${
                                phase === 'filter' && idx === index
                                    ? 'bg-blue-600'
                                    : phase === 'copy' && idx === index
                                        ? 'bg-yellow-500'
                                        : idx < tmp.length && phase === 'copy'
                                            ? 'bg-green-600'
                                            : 'bg-gray-700'
                            }`}
                        >
                            {num}
                        </div>
                    ))}
                </div>

                <h4 className="font-semibold mt-4 mb-1">tmp (filtered):</h4>
                <div className="flex gap-2 flex-wrap">
                    {tmp.map((num, idx) => (
                        <div
                            key={idx}
                            className="w-10 h-10 flex items-center justify-center rounded bg-purple-600 text-white"
                        >
                            {num}
                        </div>
                    ))}
                </div>
            </div>

            <p className="mt-4">{status}</p>
        </div>
    );
};

export default RemoveElementBruteForceVisualizer;
