import React, {useState} from 'react';

const MAX_CAPACITY = 4;

const StackVisualizer = () => {
    const [stack, setStack] = useState([10, 20, 30, 40]);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');

    const push = () => {
        if (stack.length >= MAX_CAPACITY) {
            setMessage('❌ Stack Overflow');
            return;
        }
        if (input.trim() === '') {
            setMessage('⚠️ Please enter a value to push');
            return;
        }
        setStack([...stack, input]);
        setInput('');
        setMessage(`✅ Pushed "${input}" onto stack`);
    };

    const pop = () => {
        if (stack.length === 0) {
            setMessage('❌ Stack Underflow');
            return;
        }
        const removed = stack[stack.length - 1];
        setStack(stack.slice(0, -1));
        setMessage(`✅ Popped "${removed}" from stack`);
    };

    const top = () => {
        if (stack.length === 0) {
            setMessage('🔍 Stack is empty');
            return;
        }
        setMessage(`🔝 Top element is "${stack[stack.length - 1]}"`);
    };

    const isEmpty = () => {
        setMessage(stack.length === 0 ? '✅ Stack is empty' : '❌ Stack is not empty');
    };

    const isFull = () => {
        setMessage(stack.length === MAX_CAPACITY ? '✅ Stack is full' : '❌ Stack is not full');
    };

    return (
        <div className="p-4 my-4 max-w-md layout-default-bg text-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">📦 Stack Simulator</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 rounded text-white bg-gray-700 outline-none"
                    placeholder="Enter value"
                />

            </div>

            <div className="flex gap-2 mb-4">
                <button onClick={push} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 w-full">Push</button>
                <button onClick={pop} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 w-full">Pop</button>
                <button onClick={top} className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 w-full">Top</button>
                <button onClick={isEmpty} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-full">isEmpty</button>
                <button onClick={isFull} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 w-full">isFull</button>
            </div>

            <div className="flex flex-col-reverse items-center border border-gray-600 h-52 bg-gray-800 rounded p-2">
                {Array(MAX_CAPACITY).fill(null).map((_, idx) => {
                    const value = stack[idx];
                    return (
                        <div key={idx}
                             className={`w-24 h-10 m-1 flex items-center justify-center rounded ${
                                 value ? 'bg-teal-500 text-white' : 'bg-gray-600 text-gray-300'
                             }`}
                        >
                            {value || ''}
                        </div>
                    );
                })}
            </div>

            {message && <p className="mt-4 italic">{message}</p>}
        </div>
    );
};

export default StackVisualizer;
