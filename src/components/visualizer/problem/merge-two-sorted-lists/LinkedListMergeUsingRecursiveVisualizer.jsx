import React, {useState} from "react";

const NodeComponent = ({value, highlight}) => (

    <div
        className={`p-2 w-10 h-10 text-center rounded ${
            highlight ? "bg-green-500" : "bg-gray-500"
        }`}
    >
        {value}
    </div>

);

const LinkedListMergeUsingRecursiveVisualizer = () => {
    const [list1Input, setList1Input] = useState("1,2,4");
    const [list2Input, setList2Input] = useState("1,3,4");

    const [list1, setList1] = useState([1, 2, 4]);
    const [list2, setList2] = useState([1, 3, 4]);
    const [merged, setMerged] = useState([]);
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
        setStep(0);
    };

    const mergeStep = () => {
        if (list1.length === 0 && list2.length === 0) {
            setAutoMerging(false); // Stop auto merging
            return;
        }

        if (list1.length === 0) {
            setMerged((m) => [...m, list2[0]]);
            setList2((l) => l.slice(1));
        } else if (list2.length === 0) {
            setMerged((m) => [...m, list1[0]]);
            setList1((l) => l.slice(1));
        } else {
            if (list1[0] <= list2[0]) {
                setMerged((m) => [...m, list1[0]]);
                setList1((l) => l.slice(1));
            } else {
                setMerged((m) => [...m, list2[0]]);
                setList2((l) => l.slice(1));
            }
        }

        setStep((s) => s + 1);
    };

    const autoMerge = () => {
        setAutoMerging(true);

        const mergeNext = (l1, l2, m) => {
            // Base case: dừng khi hết 2 list
            if (l1.length === 0 && l2.length === 0) {
                setAutoMerging(false);
                setList1([]);
                setList2([]);
                setMerged(m);
                return;
            }

            let nextMerged = [...m];
            let nextL1 = [...l1];
            let nextL2 = [...l2];

            // Merge logic
            if (nextL1.length === 0) {
                nextMerged.push(nextL2.shift());
            } else if (nextL2.length === 0) {
                nextMerged.push(nextL1.shift());
            } else if (nextL1[0] <= nextL2[0]) {
                nextMerged.push(nextL1.shift());
            } else {
                nextMerged.push(nextL2.shift());
            }

            // Update UI
            setList1(nextL1);
            setList2(nextL2);
            setMerged(nextMerged);
            setStep((s) => s + 1);

            setTimeout(() => mergeNext(nextL1, nextL2, nextMerged), 500);
        };

        mergeNext(list1, list2, merged);
    };

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Recursive Linked List Merge Visualizer</h2>

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

            {list1.length !== 0 && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-4">List 1:</h3>
                    <div className="flex gap-2">
                        {list1.map((num, idx) => (
                            <NodeComponent key={`l1-${idx}`} value={num} highlight={idx === 0}/>
                        ))}
                    </div>
                </div>
            )}


            {list2.length !== 0 && (
                <div className="mb-4">
                    {list2.length !== 0 ? <h3 className="text-xl font-bold mb-4">List 2:</h3> : null}

                    <div className="flex gap-2">
                        {list2.map((num, idx) => (
                            <NodeComponent key={`l2-${idx}`} value={num} highlight={idx === 0}/>
                        ))}
                    </div>
                </div>
            )}

            {merged.length !== 0 && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-4">Merged List:</h3>

                    <div className="flex gap-2">
                        {merged.map((num, idx) => (
                            <NodeComponent key={`m-${idx}`} value={num}/>
                        ))}
                    </div>
                </div>
            )}

            <button onClick={mergeStep} disabled={autoMerging}
                    className="mr-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                Next Merge Step
            </button>
            <button onClick={autoMerge} disabled={autoMerging}
                    className="mr-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
                Start
            </button>
            <button onClick={updateLists} className="mr-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                Update Lists
            </button>


            <h3 className="font-bold mt-3">Step: {step}</h3>
        </div>
    );
};

export default LinkedListMergeUsingRecursiveVisualizer;
