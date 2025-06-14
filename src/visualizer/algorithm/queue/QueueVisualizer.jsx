import React, { useState } from 'react';

const MAX_CAPACITY = 5;

const QueueVisualizer = () => {
    const [queue, setQueue] = useState([1, 8, 3, 6, 2]);
    const [input, setInput] = useState('');

    const isFull = queue.length >= MAX_CAPACITY;

    const enqueue = () => {
        if (input.trim() && !isFull) {
            setQueue((prev) => [...prev, input.trim()]);
            setInput('');
        }
    };

    const dequeue = () => {
        if (queue.length > 0) {
            setQueue((prev) => prev.slice(1));
        }
    };

    const peek = () => (queue.length > 0 ? queue[0] : 'Queue is empty');

    return (
        <div className="p-4 my-4 max-w-xl layout-default-bg text-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">Queue Simulator</h2>

            <div className="flex gap-2 mb-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter value"
                    className="flex-1 p-2 rounded text-white bg-gray-700 outline-none"
                />
            </div>

            {/* Full warning */}
            {isFull && (
                <div className="text-red-400 font-semibold text-sm mb-4">
                    ⚠️ Queue is full. Please dequeue to add more.
                </div>
            )}

            <div className="flex gap-2 mb-4">
                <button onClick={enqueue} className={`px-4 py-2 rounded ${isFull ? 'bg-green-600 opacity-50' : 'bg-green-600 hover:bg-green-700'} w-full`} disabled={isFull}>Enqueue</button>
                <button onClick={dequeue} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full" disabled={queue.length === 0}>Dequeue</button>
                <button disabled className="bg-gray-700 px-4 py-2 rounded text-nowrap w-full">Front: {peek()}</button>
                <button disabled className="bg-blue-600 px-4 py-2 rounded text-nowrap w-full">Size: {queue.length}/{MAX_CAPACITY}</button>
            </div>

            <div className="flex items-center justify-center space-x-4">
                {/* OUT Sign - LEFT */}
                <div className="text-red-400 font-bold text-lg w-12 text-center">OUT</div>

                {/* Queue display */}
                <div className="flex gap-2">
                    {queue.map((item, idx) => (
                        <div
                            key={idx}
                            className={`bg-purple-600 w-16 h-16 flex items-center justify-center rounded ${
                                idx === 0 ? 'rounded border-3 border-yellow-400' : ''
                            }`}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* IN Sign - RIGHT */}
                <div className="text-green-400 font-bold text-lg w-12 text-center">IN</div>
            </div>
        </div>
    );
};

export default QueueVisualizer;
