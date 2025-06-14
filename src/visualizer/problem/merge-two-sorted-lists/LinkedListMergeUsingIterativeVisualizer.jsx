import React, {useState} from "react";
import NodeComponent from "../../../components/NodeComponent.jsx";

const LinkedListMergeUsingIterativeVisualizer = () => {
    const [list1Input, setList1Input] = useState("1,2,4");
    const [list2Input, setList2Input] = useState("1,3,4");

    const [list1, setList1] = useState([1, 2, 4]);
    const [list2, setList2] = useState([1, 3, 4]);

    // State to hold the merged list and current heads for both lists
    const [merged, setMerged] = useState([]);

    // Current heads for both lists
    const [currHead1, setCurrHead1] = useState(0);
    const [currHead2, setCurrHead2] = useState(0);


    const [step, setStep] = useState(0);
    const [autoMerging, setAutoMerging] = useState(false);

    const parseInput = (input) =>
        input
            .split(",")
            .map((s) => parseInt(s.trim()))
            .filter((n) => !isNaN(n));

    const updateLists = () => {
        const l1 = parseInput(list1Input);
        const l2 = parseInput(list2Input);
        setList1(l1);
        setList2(l2);
        setMerged([]);
        setCurrHead1(0);
        setCurrHead2(0);
        setStep(0);
        setAutoMerging(false);
    };

    /**
     * Performs a single step in merging two sorted linked lists.
     * Updates the `merged` list by adding the next smallest element from `list1` or `list2`.
     * Adjusts the current head pointers (`currHead1` and `currHead2`) accordingly.
     * Increments the `step` counter to track the number of merge steps performed.
     * Stops merging if both lists are fully traversed.
     */
    const mergeStep = () => {
        // Check if both lists are fully traversed
        if (currHead1 >= list1.length && currHead2 >= list2.length) {
            setAutoMerging(false); // Stop auto-merging if active
            return;
        }

        // If `list1` is fully traversed, add the next element from `list2`
        if (currHead1 >= list1.length) {
            setMerged((m) => [...m, list2[currHead2]]);
            setCurrHead2((c) => c + 1);
        }
        // If `list2` is fully traversed, add the next element from `list1`
        else if (currHead2 >= list2.length) {
            setMerged((m) => [...m, list1[currHead1]]);
            setCurrHead1((c) => c + 1);
        }
        // Compare the current elements of both lists and add the smaller one
        else {
            if (list1[currHead1] <= list2[currHead2]) {
                setMerged((m) => [...m, list1[currHead1]]);
                setCurrHead1((c) => c + 1);
            } else {
                setMerged((m) => [...m, list2[currHead2]]);
                setCurrHead2((c) => c + 1);
            }
        }

        // Increment the step counter
        setStep((s) => s + 1);
    };

    /**
             * Automatically merges two sorted linked lists step by step.
             * This function initiates the auto-merging process and recursively merges elements
             * from `list1` and `list2` into the `merged` list until both lists are fully traversed.
             *
             * - Updates the `merged` list with the next smallest element from `list1` or `list2`.
             * - Adjusts the current head pointers (`currHead1` and `currHead2`) accordingly.
             * - Increments the `step` counter to track the number of merge steps performed.
             * - Stops merging when both lists are fully traversed.
             *
             * The merging process is executed with a delay of 500ms between steps using `setTimeout`.
             */
            const autoMerge = () => {
                setAutoMerging(true); // Enable auto-merging

                /**
                 * Recursively merges the next element from `list1` or `list2` into the `merged` list.
                 *
                 * @param {number} h1 - Current head index of `list1`.
                 * @param {number} h2 - Current head index of `list2`.
                 * @param {Array<number>} m - Current state of the merged list.
                 */
                const mergeNext = (h1, h2, m) => {
                    // Stop merging if both lists are fully traversed
                    if (h1 >= list1.length && h2 >= list2.length) {
                        setAutoMerging(false); // Disable auto-merging
                        return;
                    }

                    let nextMerged = [...m]; // Create a copy of the merged list
                    let nextH1 = h1; // Next head index for `list1`
                    let nextH2 = h2; // Next head index for `list2`

                    // Add the next element from `list2` if `list1` is fully traversed
                    if (h1 >= list1.length) {
                        nextMerged.push(list2[nextH2]);
                        nextH2++;
                    }
                    // Add the next element from `list1` if `list2` is fully traversed
                    else if (h2 >= list2.length) {
                        nextMerged.push(list1[nextH1]);
                        nextH1++;
                    }
                    // Compare elements from both lists and add the smaller one
                    else if (list1[nextH1] <= list2[nextH2]) {
                        nextMerged.push(list1[nextH1]);
                        nextH1++;
                    } else {
                        nextMerged.push(list2[nextH2]);
                        nextH2++;
                    }

                    // Update states with the new merged list and head indices
                    setMerged(nextMerged);
                    setCurrHead1(nextH1);
                    setCurrHead2(nextH2);
                    setStep((s) => s + 1); // Increment the step counter

                    // Schedule the next merge step after 500ms
                    setTimeout(() => mergeNext(nextH1, nextH2, nextMerged), 500);
                };

                // Start the recursive merging process
                mergeNext(currHead1, currHead2, merged);
            };

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Iterative Linked List Merge Visualizer</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">List 1 (comma-separated): </label>
                <input
                    value={list1Input}
                    onChange={(e) => setList1Input(e.target.value)}
                    className="w-full p-2 border rounded outline-none focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">List 2 (comma-separated): </label>
                <input
                    value={list2Input}
                    onChange={(e) => setList2Input(e.target.value)}
                    className="w-full p-2 border rounded outline-none focus:outline-none"
                />
            </div>

            {list1.slice(currHead1).length > 0 && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">List 1:</h3>
                    <div className="flex gap-2">
                        {list1.slice(currHead1).map((num, idx) => (
                            <NodeComponent key={`l1-${idx}`} value={num} highlight={idx === 0}/>
                        ))}
                    </div>
                </div>
            )}

            {list2.slice(currHead2).length > 0 && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">List 2:</h3>
                    <div className="flex gap-2">
                        {list2.slice(currHead2).map((num, idx) => (
                            <NodeComponent key={`l2-${idx}`} value={num} highlight={idx === 0}/>
                        ))}
                    </div>
                </div>
            )}

            {merged.length !== 0 && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Merged List:</h3>
                    <div className="flex gap-2">
                        {merged.map((num, idx) => (
                            <NodeComponent key={`m-${idx}`} value={num}/>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-4">
                <button
                    onClick={mergeStep}
                    disabled={autoMerging}
                    className="mr-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                    Next Merge Step
                </button>
                <button
                    onClick={autoMerge}
                    disabled={autoMerging}
                    className="mr-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                >
                    Start
                </button>
                <button
                    onClick={updateLists}
                    className="mr-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                    Update Lists
                </button>
            </div>

            <h3 className="font-bold mt-3">Step: {step}</h3>
        </div>
    );
};

export default LinkedListMergeUsingIterativeVisualizer;
