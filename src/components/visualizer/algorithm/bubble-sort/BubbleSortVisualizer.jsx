import React, { useState, useRef } from "react";

const BubbleSortVisualizer = () => {
    const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
    const [inputValue, setInputValue] = useState("64,34,25,12,22,11,90");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pass, setPass] = useState(0);
    const [isSorted, setIsSorted] = useState(false);
    const intervalRef = useRef(null);

    // Hàm để xử lý bước tiếp theo trong thuật toán Bubble Sort
    const currentIndexRef = useRef(0);
    const passRef = useRef(0);

    const nextStep = () => {
        let arr = [...array];
        let i = currentIndex;
        let p = pass;

        if (i < arr.length - p - 1) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                setArray(arr);
            }
            setCurrentIndex(i + 1);
        } else {
            if (p < arr.length - 1) {
                setPass(p + 1);
                setCurrentIndex(0);
            } else {
                setIsSorted(true);
                setCurrentIndex(-1);
            }
        }
    };

    // const startSorting = () => {
    //     if (intervalRef.current || isSorted) return;
    //
    //     intervalRef.current = setInterval(() => {
    //         setArray((prevArr) => {
    //             let arr = [...prevArr]; // Tạo 1 bản sao của mảng
    //             let i = currentIndexRef.current;
    //             let p = passRef.current;
    //
    //             if (i < arr.length - p - 1) {
    //                 if (arr[i] > arr[i + 1]) {
    //                     [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    //                 }
    //                 currentIndexRef.current += 1;
    //             } else {
    //                 passRef.current += 1;
    //                 currentIndexRef.current = 0;
    //
    //                 if (passRef.current >= arr.length - 1) {
    //                     clearInterval(intervalRef.current);
    //                     intervalRef.current = null;
    //                     setIsSorted(true);
    //                     currentIndexRef.current = -1;
    //                     // Thêm thông báo thành công (nếu muốn)
    //                     console.log("✅ Array is sorted!");
    //                 }
    //             }
    //
    //             // Update UI
    //             setCurrentIndex(currentIndexRef.current);
    //             setPass(passRef.current);
    //             return [...arr]; // Luôn trả về mảng mới, ngay cả khi không swap!
    //         });
    //     }, 500);
    // };

    const resetSorting = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        const inputArr = inputValue
            .split(",")
            .map((num) => parseInt(num.trim(), 10))
            .filter((num) => !isNaN(num));
        setArray(inputArr);
        currentIndexRef.current = 0;
        passRef.current = 0;
        setCurrentIndex(0);
        setPass(0);
        setIsSorted(false);
    };

    return (
        <div className="py-4 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Bubble Sort Visualization</h2>

            {/* Input Array */}
            <div className="mb-4">
                <label className="block font-medium mb-1">Array (comma-separated):</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded outline-none focus:outline-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter numbers separated by commas"
                />
            </div>

            {/* Display Array */}
            <div className="flex gap-2 mb-4">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className={`p-2 w-10 h-10 text-center rounded ${
                            idx === currentIndex || idx === currentIndex + 1
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                        }`}
                    >
                        {num}
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                    onClick={nextStep}
                    disabled={isSorted}
                >
                    Next Step
                </button>
                {/*<button*/}
                {/*    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"*/}
                {/*    onClick={startSorting}*/}
                {/*    disabled={isSorted}*/}
                {/*>*/}
                {/*    Start*/}
                {/*</button>*/}
                <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                    onClick={resetSorting}
                >
                    Reset
                </button>
            </div>

            {/* Notification */}
            {isSorted && (
                <p className="text-green-600 font-bold">🎉 Array is sorted!</p>
            )}
        </div>
    );
};

export default BubbleSortVisualizer;
