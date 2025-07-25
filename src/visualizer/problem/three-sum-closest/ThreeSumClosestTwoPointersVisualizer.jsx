import React, { useState, useRef } from 'react';

const ThreeSumClosestTwoPointersVisualizer = () => {
    const [array, setArray] = useState([-1, 2, 1, -4]);
    const [target, setTarget] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [result, setResult] = useState(null);
    const timeoutRef = useRef(null);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const generateSteps = (nums, target) => {
        const steps = [];
        let sortedNums = [...nums];
        sortedNums.sort((a, b) => a - b);
        
        steps.push({
            type: 'start',
            array: [...sortedNums],
            message: `Starting 3Sum Closest with target ${target}. Array sorted: [${sortedNums.join(', ')}]`,
            i: -1,
            left: -1,
            right: -1,
            currentSum: null,
            closestSum: null,
            distance: null
        });

        let closestSum = sortedNums[0] + sortedNums[1] + sortedNums[2];
        let minDistance = Math.abs(closestSum - target);

        steps.push({
            type: 'initialize',
            array: [...sortedNums],
            message: `Initialize closest sum to first triplet: ${sortedNums[0]} + ${sortedNums[1]} + ${sortedNums[2]} = ${closestSum}`,
            i: 0,
            left: 1,
            right: 2,
            currentSum: closestSum,
            closestSum: closestSum,
            distance: minDistance
        });

        for (let i = 0; i < sortedNums.length - 2; i++) {
            let left = i + 1;
            let right = sortedNums.length - 1;

            steps.push({
                type: 'fix_first',
                array: [...sortedNums],
                message: `Fix first element at index ${i}: nums[${i}] = ${sortedNums[i]}`,
                i: i,
                left: left,
                right: right,
                currentSum: null,
                closestSum: closestSum,
                distance: minDistance
            });

            while (left < right) {
                const currentSum = sortedNums[i] + sortedNums[left] + sortedNums[right];
                const currentDistance = Math.abs(currentSum - target);

                steps.push({
                    type: 'calculate',
                    array: [...sortedNums],
                    message: `Calculate sum: ${sortedNums[i]} + ${sortedNums[left]} + ${sortedNums[right]} = ${currentSum}, distance = ${currentDistance}`,
                    i: i,
                    left: left,
                    right: right,
                    currentSum: currentSum,
                    closestSum: closestSum,
                    distance: currentDistance
                });

                if (currentDistance < minDistance) {
                    minDistance = currentDistance;
                    closestSum = currentSum;
                    
                    steps.push({
                        type: 'update_closest',
                        array: [...sortedNums],
                        message: `New closest sum found! ${currentSum} is closer to target ${target}`,
                        i: i,
                        left: left,
                        right: right,
                        currentSum: currentSum,
                        closestSum: closestSum,
                        distance: currentDistance
                    });
                }

                if (currentSum === target) {
                    steps.push({
                        type: 'exact_match',
                        array: [...sortedNums],
                        message: `Exact match found! Sum ${currentSum} equals target ${target}`,
                        i: i,
                        left: left,
                        right: right,
                        currentSum: currentSum,
                        closestSum: closestSum,
                        distance: 0
                    });
                    return { steps, result: closestSum };
                } else if (currentSum < target) {
                    steps.push({
                        type: 'move_left',
                        array: [...sortedNums],
                        message: `Sum ${currentSum} < target ${target}, move left pointer right to increase sum`,
                        i: i,
                        left: left,
                        right: right,
                        currentSum: currentSum,
                        closestSum: closestSum,
                        distance: currentDistance
                    });
                    left++;
                } else {
                    steps.push({
                        type: 'move_right',
                        array: [...sortedNums],
                        message: `Sum ${currentSum} > target ${target}, move right pointer left to decrease sum`,
                        i: i,
                        left: left,
                        right: right,
                        currentSum: currentSum,
                        closestSum: closestSum,
                        distance: currentDistance
                    });
                    right--;
                }
            }
        }

        steps.push({
            type: 'complete',
            array: [...sortedNums],
            message: `Algorithm complete! Closest sum to target ${target} is ${closestSum}`,
            i: -1,
            left: -1,
            right: -1,
            currentSum: null,
            closestSum: closestSum,
            distance: minDistance
        });

        return { steps, result: closestSum };
    };

    const runVisualization = async () => {
        if (isRunning) return;
        
        setIsRunning(true);
        setCurrentStep(0);
        setResult(null);

        const { steps: newSteps, result: finalResult } = generateSteps(array, target);
        setSteps(newSteps);

        for (let i = 0; i < newSteps.length; i++) {
            setCurrentStep(i);
            await sleep(1500);
            if (!isRunning) break;
        }

        setResult(finalResult);
        setIsRunning(false);
    };

    const stopVisualization = () => {
        setIsRunning(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const resetVisualization = () => {
        stopVisualization();
        setCurrentStep(0);
        setSteps([]);
        setResult(null);
    };

    const handleArrayChange = (index, value) => {
        const newArray = [...array];
        newArray[index] = parseInt(value) || 0;
        setArray(newArray);
        resetVisualization();
    };

    const addElement = () => {
        setArray([...array, 0]);
        resetVisualization();
    };

    const removeElement = () => {
        if (array.length > 3) {
            setArray(array.slice(0, -1));
            resetVisualization();
        }
    };

    const handleTargetChange = (value) => {
        setTarget(parseInt(value) || 0);
        resetVisualization();
    };

    const currentStepData = steps[currentStep];

    const getElementColor = (index) => {
        if (!currentStepData) return 'element-inactive';
        
        if (index === currentStepData.i) return 'element-tertiary';
        if (index === currentStepData.left) return 'element-active';
        if (index === currentStepData.right) return 'element-secondary';
        return 'element-inactive';
    };

    const getElementLabel = (index) => {
        if (!currentStepData) return '';
        
        if (index === currentStepData.i) return 'First';
        if (index === currentStepData.left) return 'Left';
        if (index === currentStepData.right) return 'Right';
        return '';
    };

    return (
        <div className="visualizer-container">
            <h3 className="text-xl font-bold mb-4">3Sum Closest - Two Pointers Visualizer</h3>
            
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Array Elements:
                    </label>
                    <div className="flex gap-2 mb-2">
                        {array.map((val, index) => (
                            <input
                                key={index}
                                type="number"
                                value={val}
                                onChange={(e) => handleArrayChange(index, e.target.value)}
                                className="input-default w-16"
                                disabled={isRunning}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={addElement}
                            disabled={isRunning || array.length >= 8}
                            className={`px-3 py-1 text-sm ${(isRunning || array.length >= 8) ? 'btn-disabled' : 'btn-primary'}`}
                        >
                            Add Element
                        </button>
                        <button
                            onClick={removeElement}
                            disabled={isRunning || array.length <= 3}
                            className={`px-3 py-1 text-sm ${(isRunning || array.length <= 3) ? 'btn-disabled' : 'btn-danger'}`}
                        >
                            Remove Element
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Target:
                    </label>
                    <input
                        type="number"
                        value={target}
                        onChange={(e) => handleTargetChange(e.target.value)}
                        className="input-default w-20"
                        disabled={isRunning}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={runVisualization}
                        disabled={isRunning}
                        className={`px-4 py-2 ${isRunning ? 'btn-disabled' : 'btn-primary'}`}
                    >
                        {isRunning ? 'Running...' : 'Start Visualization'}
                    </button>
                    <button
                        onClick={stopVisualization}
                        disabled={!isRunning}
                        className={`px-4 py-2 ${!isRunning ? 'btn-disabled' : 'btn-danger'}`}
                    >
                        Stop
                    </button>
                    <button
                        onClick={resetVisualization}
                        className="px-4 py-2 btn-secondary"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Visualization */}
            <div className="mb-6">
                <div className="flex justify-center items-center space-x-2 mb-4">
                    {(currentStepData?.array || array).map((val, index) => (
                        <div key={index} className="text-center">
                            <div className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold text-lg ${getElementColor(index)}`}>
                                {val}
                            </div>
                            <div className="text-xs mt-1 h-4 text-gray-400">
                                {getElementLabel(index)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-4 text-sm mb-4">
                    <div className="flex items-center">
                        <div className="w-4 h-4 element-tertiary rounded mr-1"></div>
                        <span className="text-gray-300">First Element</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 element-active rounded mr-1"></div>
                        <span className="text-gray-300">Left Pointer</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 element-secondary rounded mr-1"></div>
                        <span className="text-gray-300">Right Pointer</span>
                    </div>
                </div>

                {/* Current Status */}
                {currentStepData && (
                    <div className="step-indicator p-4">
                        <p className="text-sm"><strong>Step:</strong> {currentStep + 1} / {steps.length}</p>
                        <p className="text-sm"><strong>Action:</strong> {currentStepData.message}</p>
                        {currentStepData.currentSum !== null && (
                            <p className="text-sm"><strong>Current Sum:</strong> {currentStepData.currentSum}</p>
                        )}
                        {currentStepData.closestSum !== null && (
                            <p className="text-sm"><strong>Closest Sum:</strong> {currentStepData.closestSum}</p>
                        )}
                        {currentStepData.distance !== null && (
                            <p className="text-sm"><strong>Distance from Target:</strong> {currentStepData.distance}</p>
                        )}
                    </div>
                )}

                {result !== null && (
                    <div className="message-success mt-4">
                        <p className="text-lg font-bold">
                            Result: The closest sum to target {target} is {result}
                        </p>
                        <p className="text-sm mt-1 opacity-80">
                            Distance from target: {Math.abs(result - target)}
                        </p>
                    </div>
                )}
            </div>

            {/* Algorithm Explanation */}
            <div className="algorithm-explanation">
                <h4 className="font-bold mb-2">Algorithm Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Sort the array to enable two pointers technique</li>
                    <li>Initialize closest sum with first triplet</li>
                    <li>For each element as first element:</li>
                    <li className="ml-4">• Use two pointers for remaining elements</li>
                    <li className="ml-4">• Calculate current sum and distance from target</li>
                    <li className="ml-4">• Update closest sum if current is closer</li>
                    <li className="ml-4">• Move pointers based on sum vs target comparison</li>
                    <li>Return the closest sum found</li>
                </ol>
                <p className="mt-2 text-sm"><strong>Time Complexity:</strong> O(n²), <strong>Space Complexity:</strong> O(1)</p>
            </div>
        </div>
    );
};

export default ThreeSumClosestTwoPointersVisualizer;
