import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ValidParenthesesStackVisualizer = () => {
    const [input, setInput] = useState('{([])}');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stack, setStack] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [result, setResult] = useState(null);
    const [speed, setSpeed] = useState(1000);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    // Generate all steps for the algorithm
    const generateSteps = (s) => {
        const steps = [];
        let tempStack = [];
        let valid = true;

        steps.push({
            index: -1,
            char: '',
            stack: [...tempStack],
            action: 'Algorithm started',
            status: 'processing'
        });

        for (let i = 0; i < s.length; i++) {
            const char = s[i];

            if (char === '(' || char === '{' || char === '[') {
                tempStack.push(char);
                steps.push({
                    index: i,
                    char: char,
                    stack: [...tempStack],
                    action: `Push '${char}' to stack`,
                    status: 'processing'
                });
            } else {
                if (tempStack.length > 0 &&
                    ((tempStack[tempStack.length - 1] === '(' && char === ')') ||
                        (tempStack[tempStack.length - 1] === '{' && char === '}') ||
                        (tempStack[tempStack.length - 1] === '[' && char === ']'))) {

                    const popped = tempStack.pop();
                    steps.push({
                        index: i,
                        char: char,
                        stack: [...tempStack],
                        action: `Found matching pair: '${popped}' and '${char}', pop from stack`,
                        status: 'processing'
                    });
                } else {
                    valid = false;
                    steps.push({
                        index: i,
                        char: char,
                        stack: [...tempStack],
                        action: `No matching opening bracket found for '${char}'`,
                        status: 'error'
                    });
                    break;
                }
            }
        }

        if (valid) {
            steps.push({
                index: s.length,
                char: '',
                stack: [...tempStack],
                action: tempStack.length === 0 ? 'Stack is empty - String is balanced!' : 'Stack is not empty - String is not balanced!',
                status: tempStack.length === 0 ? 'success' : 'error'
            });
        }

        return steps;
    };

    // Reset animation
    const reset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setCurrentIndex(0);
        setStack([]);
        setResult(null);
        const newSteps = generateSteps(input);
        setSteps(newSteps);
    };

    // Update steps when input changes
    useEffect(() => {
        reset();
    }, [input]);

    // Auto-play animation
    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                const step = steps[currentStep + 1];
                setCurrentIndex(step.index);
                setStack(step.stack);
                if (step.status === 'success' || step.status === 'error') {
                    setResult(step.status === 'success');
                    setIsPlaying(false);
                }
            }, speed);
            return () => clearTimeout(timer);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStep, steps, speed]);

    const togglePlay = () => {
        if (currentStep >= steps.length - 1) {
            reset();
        }
        setIsPlaying(!isPlaying);
    };

    const getBracketColor = (bracket) => {
        const colors = {
            '(': 'text-blue-200',
            ')': 'text-blue-200',
            '[': 'text-green-200',
            ']': 'text-green-200',
            '{': 'text-purple-200',
            '}': 'text-purple-200'
        };
        return colors[bracket] || 'text-gray-200';
    };

    const getStackItemColor = (bracket) => {
        const colors = {
            '(': 'bg-blue-500',
            '[': 'bg-green-500',
            '{': 'bg-purple-500'
        };
        return colors[bracket] || 'bg-gray-500';
    };

    const currentStepData = steps[currentStep] || steps[0] || {};

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">
                Valid Parentheses Stack Visualizer
            </h2>

            {/* Input Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                    Enter parentheses string:
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Example: {([])}"
                />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                    Reset
                </button>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-white">Speed:</label>
                    <select
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="px-2 py-1 border rounded text-sm bg-black"
                    >
                        <option value={2000}>Slow</option>
                        <option value={1000}>Normal</option>
                        <option value={500}>Fast</option>
                    </select>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* Input String Visualization */}
                <div className=" p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-white">Input String</h3>
                    <div className="flex flex-wrap gap-2 text-2xl font-mono">
                        {input.split('').map((char, index) => (
                            <div
                                key={index}
                                className={`
                  w-10 h-10 flex items-center justify-center rounded-md transition-all
                  ${index === currentIndex
                                        ? 'bg-yellow-500 scale-110'
                                        : index < currentIndex
                                            ? 'bg-green-500'
                                            : 'bg-gray-700'}
                  ${getBracketColor(char)}
                `}
                            >
                                {char}
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                        Current position: {currentIndex >= 0 && currentIndex < input.length ? currentIndex : 'Complete'}
                    </div>
                </div>

                {/* Stack Visualization */}
                <div className=" p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-white">Stack</h3>
                    <div className="min-h-32 relative">
                        {stack.length === 0 ? (
                            <div className="text-gray-500 text-center italic py-8">Empty stack</div>
                        ) : (
                            <div className="flex flex-col-reverse gap-2">
                                {stack.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`
                      w-12 h-12 flex items-center justify-center rounded-md text-xl font-mono
                      transition-all duration-300 transform
                      ${getStackItemColor(item)}
                      ${index === stack.length - 1 ? 'ring-blue-400' : ''}
                    `}
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                        Elements count: {stack.length}
                    </div>
                </div>
            </div>

            {/* Current Action */}
            <div className="p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Current Step</h3>
                <div className="flex items-center gap-3">
                    <div className="text-2xl">
                        {currentStep + 1}/{steps.length}
                    </div>
                    <div className="text-blue-600 text-xl">
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className=" text-gray-400"
                        />
                    </div>
                    <div className={`
            px-3 py-1 rounded-md text-sm font-medium
            ${currentStepData.status === 'success' ? 'bg-green-500 text-green-800' :
                            currentStepData.status === 'error' ? 'bg-red-500 text-red-800' :
                                'bg-gray-500 text-white'}
          `}>
                        {currentStepData.action || 'Not started yet'}
                    </div>
                </div>
            </div>

            {/* Result */}
            {result !== null && (
                <div className={`
          p-4 rounded-lg text-center text-lg font-semibold
          ${result ? 'bg-green-500 text-green-800' : 'bg-red-500 text-red-800'}
        `}>
                    {result
                        ? '✅ Valid parentheses string!'
                        : '❌ Invalid parentheses string!'}
                </div>
            )}
        </div>
    );
};

export default ValidParenthesesStackVisualizer;