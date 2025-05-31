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

const LinkedListMergeUsingIterativeVisualizer = () => {
    const [list1Input, setList1Input] = useState("1,2,4");
    const [list2Input, setList2Input] = useState("1,3,4");

    const [list1, setList1] = useState([1, 2, 4]);
    const [list2, setList2] = useState([1, 3, 4]);
    const [merged, setMerged] = useState([]);
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

    const mergeStep = () => {
        if (currHead1 >= list1.length && currHead2 >= list2.length) {
            setAutoMerging(false);
            return;
        }

        if (currHead1 >= list1.length) {
            setMerged((m) => [...m, list2[currHead2]]);
            setCurrHead2((c) => c + 1);
        } else if (currHead2 >= list2.length) {
            setMerged((m) => [...m, list1[currHead1]]);
            setCurrHead1((c) => c + 1);
        } else {
            if (list1[currHead1] <= list2[currHead2]) {
                setMerged((m) => [...m, list1[currHead1]]);
                setCurrHead1((c) => c + 1);
            } else {
                setMerged((m) => [...m, list2[currHead2]]);
                setCurrHead2((c) => c + 1);
            }
        }
        setStep((s) => s + 1);
    };

    const autoMerge = () => {
        setAutoMerging(true);

        const mergeNext = (h1, h2, m) => {
            if (h1 >= list1.length && h2 >= list2.length) {
                setAutoMerging(false);
                return;
            }

            let nextMerged = [...m];
            let nextH1 = h1;
            let nextH2 = h2;

            if (h1 >= list1.length) {
                nextMerged.push(list2[nextH2]);
                nextH2++;
            } else if (h2 >= list2.length) {
                nextMerged.push(list1[nextH1]);
                nextH1++;
            } else if (list1[nextH1] <= list2[nextH2]) {
                nextMerged.push(list1[nextH1]);
                nextH1++;
            } else {
                nextMerged.push(list2[nextH2]);
                nextH2++;
            }

            setMerged(nextMerged);
            setCurrHead1(nextH1);
            setCurrHead2(nextH2);
            setStep((s) => s + 1);

            setTimeout(() => mergeNext(nextH1, nextH2, nextMerged), 500);
        };

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
