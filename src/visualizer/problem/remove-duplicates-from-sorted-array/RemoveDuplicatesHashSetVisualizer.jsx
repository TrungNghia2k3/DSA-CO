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

    /**
     * Executes a single step in the process of removing duplicates from a sorted array.
     * This function checks the current element in the array and determines whether it has already been seen.
     * If the element is unique, it writes it to the next position in the array and updates the state variables.
     * If the element is a duplicate, it skips it and moves to the next element.
     *
     * State updates:
     * - Updates the `array` state with the modified array after writing a unique element.
     * - Updates the `writeIndex` state to track the position for writing the next unique element.
     * - Updates the `setSeen` state to include the current element.
     * - Updates the `current` state to move to the next element.
     * - Updates the `status` state to reflect the current operation.
     */
    const step = () => {
        // Check if the current index has reached the end of the array
        if (current >= array.length) {
            setStatus({
                color: 'text-green-500',
                string: `✅ Completed! New length: ${writeIndex}`
            });
            setRunning(false); // Mark the process as not running
            runningRef.current = false; // Update the running reference
            return;
        }

        const val = array[current]; // Get the current element
        const seen = new Set(setSeen); // Create a copy of the seen set

        // If the current element is not in the seen set
        if (!seen.has(val)) {
            seen.add(val); // Add the element to the seen set
            const newArr = [...array]; // Create a copy of the array
            newArr[writeIndex] = val; // Write the unique element to the write index
            setArray(newArr); // Update the array state
            setWriteIndex(prev => prev + 1); // Increment the write index
            setStatus({
                color: 'text-green-500',
                string: `🟢 arr[${current}] = ${val} → Not in set → Writing to arr[${writeIndex}]`
            });
        } else {
            // If the current element is already in the seen set
            setStatus({
                color: 'text-red-500',
                string: `🔴 arr[${current}] = ${val} → Already in set → Skipping`
            });
        }

        setSetSeen(seen); // Update the seen set state
        setCurrent(prev => prev + 1); // Move to the next element
    };

    /**
     * Executes the process of removing duplicates from a sorted array in an automated manner.
     * This function iterates through the array, checking each element to determine if it has already been seen.
     * If the element is unique, it writes it to the next position in the array and updates the state variables.
     * If the element is a duplicate, it skips it and moves to the next element.
     * The process includes a delay for visualization purposes and stops when the end of the array is reached.
     *
     * State updates:
     * - Updates the `array` state with the modified array after writing a unique element.
     * - Updates the `writeIndex` state to track the position for writing the next unique element.
     * - Updates the `setSeen` state to include the current element.
     * - Updates the `current` state to move to the next element.
     * - Updates the `status` state to reflect the current operation.
     * - Updates the `running` state to indicate whether the process is active.
     *
     * @async
     * @returns {void}
     */
    const run = async () => {
        setRunning(true); // Mark the process as running
        runningRef.current = true; // Update the running reference

        let curr = current; // Current index in the array
        let write = writeIndex; // Index for writing the next unique element
        let seen = new Set(setSeen); // Create a copy of the seen set
        let newArr = [...array]; // Create a copy of the array

        // Iterate through the array while the process is running
        while (curr < newArr.length && runningRef.current) {
            const val = newArr[curr]; // Get the current element

            // If the current element is not in the seen set
            if (!seen.has(val)) {
                seen.add(val); // Add the element to the seen set
                newArr[write] = val; // Write the unique element to the write index
                setStatus({
                    color: 'text-green-500',
                    string: `🟢 arr[${curr}] = ${val} → Not in set → Writing to arr[${write}]`
                });
                write++; // Increment the write index
            } else {
                // If the current element is already in the seen set
                setStatus({
                    color: 'text-red-500',
                    string: `🔴 arr[${curr}] = ${val} → Already in set → Skipping`
                });
            }

            curr++; // Move to the next element
            setArray([...newArr]); // Update the array state
            setSetSeen(new Set(seen)); // Update the seen set state
            setCurrent(curr); // Update the current index state
            setWriteIndex(write); // Update the write index state

            // Introduce a delay for visualization
            await new Promise(res => setTimeout(res, 1000));
        }

        setRunning(false); // Mark the process as not running
        runningRef.current = false; // Update the running reference
        setStatus({
            color: 'text-green-500',
            string: `✅ Done. Unique length: ${write}`
        }); // Update the status state to indicate completion
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
