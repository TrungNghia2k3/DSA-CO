import React, {useState, useRef} from "react";

const RemoveDuplicatesHashSetVisualizer = () => {
    const [array, setArray] = useState([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
    const [current, setCurrent] = useState(0);
    const [writeIndex, setWriteIndex] = useState(0);
    const [setSeen, setSetSeen] = useState(new Set());
    const [status, setStatus] = useState({color: '', string: ''});
    const [running, setRunning] = useState(false);
    const runningRef = useRef(false); // track current running state

    const reset = () => {
        setArray([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
        setCurrent(0);
        setWriteIndex(0);
        setSetSeen(new Set());
        setStatus({color: '', string: ''});
        setRunning(false);
        runningRef.current = false;
    };

    const step = () => {
        if (current >= array.length) {
            setStatus({
                color: 'text-green-500',
                string: `✅ Completed! New length: ${writeIndex}`
            });
            setRunning(false);
            runningRef.current = false;
            return;
        }

        const val = array[current];
        const seen = new Set(setSeen);

        if (!seen.has(val)) {
            seen.add(val);
            const newArr = [...array];
            newArr[writeIndex] = val;
            setArray(newArr);
            setWriteIndex(prev => prev + 1);
            setStatus({
                color: 'text-green-500',
                string: `🟢 arr[${current}] = ${val} → Not in set → Writing to arr[${writeIndex}]`
            });
        } else {
            setStatus({
                color: 'text-red-500',
                string: `🔴 arr[${current}] = ${val} → Already in set → Skipping`
            });
        }

        setSetSeen(seen);
        setCurrent(prev => prev + 1);
    };

    const run = async () => {
        setRunning(true);
        runningRef.current = true;

        let curr = current;
        let write = writeIndex;
        let seen = new Set(setSeen);
        let newArr = [...array];

        while (curr < newArr.length && runningRef.current) {
            const val = newArr[curr];

            if (!seen.has(val)) {
                seen.add(val);
                newArr[write] = val;
                setStatus({
                    color: 'text-green-500',
                    string: `🟢 arr[${curr}] = ${val} → Not in set → Writing to arr[${write}]`
                });
                write++;
            } else {
                setStatus({
                    color: 'text-red-500',
                    string: `🔴 arr[${curr}] = ${val} → Already in set → Skipping`
                });
            }

            curr++;
            setArray([...newArr]);
            setSetSeen(new Set(seen));
            setCurrent(curr);
            setWriteIndex(write);

            await new Promise(res => setTimeout(res, 1000));
        }

        setRunning(false);
        runningRef.current = false;
        setStatus({
            color: 'text-green-500',
            string: `✅ Done. Unique length: ${write}`
        });
    };

    return (
        <div className="py-4 text-white">
            <h2 className="text-xl font-bold mb-4">Remove Duplicates Visualizer (Hash Set)</h2>

            <div className="flex gap-2 mb-4">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className={`p-2 w-10 h-10 text-center rounded ${
                            idx === current
                                ? "bg-yellow-400 text-black"
                                : idx === writeIndex
                                    ? "bg-green-500"
                                    : "bg-gray-700"
                        }`}
                    >
                        {num}
                    </div>
                ))}
            </div>

            <p className="mb-2">Seen Set: {`{ ${Array.from(setSeen).join(", ")} }`}</p>
            <p className={`mb-4 ${status.color}`}>{status.string}</p>

            <button className="mr-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded" onClick={step} disabled={running}>
                Step
            </button>
            <button className="mr-2 px-4 py-2 bg-green-600 hover:bg-green-700  disabled:opacity-50 rounded"
                    onClick={run} disabled={running}>
                {running ? 'Running' : 'Run'}
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded" onClick={reset}>
                Reset
            </button>
        </div>
    );
};

export default RemoveDuplicatesHashSetVisualizer;
