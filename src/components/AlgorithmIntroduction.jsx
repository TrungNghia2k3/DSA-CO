import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCode, faChartLine, faBrain } from '@fortawesome/free-solid-svg-icons';

const AlgorithmIntroduction = () => {
    return (
        <div className="text-white">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Algorithm Theory & Data Structures</h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                    Welcome to the comprehensive guide to algorithms and data structures. 
                    Explore fundamental concepts, learn implementation techniques, and master 
                    the art of efficient problem-solving.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="layout-default-bg p-6 rounded-lg">
                    <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 text-2xl mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Conceptual Understanding</h3>
                    <p className="text-gray-300">
                        Deep dive into the theoretical foundations of algorithms and data structures 
                        with clear explanations and visual examples.
                    </p>
                </div>

                <div className="layout-default-bg p-6 rounded-lg">
                    <FontAwesomeIcon icon={faCode} className="text-blue-500 text-2xl mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Implementation Details</h3>
                    <p className="text-gray-300">
                        Learn how to implement algorithms and data structures efficiently 
                        with code examples in multiple programming languages.
                    </p>
                </div>

                <div className="layout-default-bg p-6 rounded-lg">
                    <FontAwesomeIcon icon={faChartLine} className="text-green-500 text-2xl mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Complexity Analysis</h3>
                    <p className="text-gray-300">
                        Understand time and space complexity, Big O notation, and learn 
                        to analyze the efficiency of different algorithmic approaches.
                    </p>
                </div>

                <div className="layout-default-bg p-6 rounded-lg">
                    <FontAwesomeIcon icon={faBrain} className="text-purple-500 text-2xl mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Problem-Solving Skills</h3>
                    <p className="text-gray-300">
                        Develop critical thinking skills and learn systematic approaches 
                        to tackle complex computational problems.
                    </p>
                </div>
            </div>

            {/* Getting Started Section */}
            <div className="layout-default-bg p-8 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                        <div>
                            <h4 className="font-semibold">Choose a Category</h4>
                            <p className="text-gray-300">Select from the sidebar to explore sorting, searching, trees, graphs, and more.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                        <div>
                            <h4 className="font-semibold">Study the Theory</h4>
                            <p className="text-gray-300">Read through detailed explanations, examples, and visual representations.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                        <div>
                            <h4 className="font-semibold">Practice Implementation</h4>
                            <p className="text-gray-300">Try coding the algorithms yourself and experiment with variations.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Topics */}
            <div className="layout-default-bg p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Available Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-gray-600 rounded p-4">
                        <h4 className="font-semibold text-blue-400 mb-2">Sorting Algorithms</h4>
                        <p className="text-sm text-gray-300">Bubble Sort, Quick Sort, Merge Sort, and more</p>
                    </div>
                    <div className="border border-gray-600 rounded p-4">
                        <h4 className="font-semibold text-green-400 mb-2">Search Algorithms</h4>
                        <p className="text-sm text-gray-300">Binary Search, Linear Search, and advanced techniques</p>
                    </div>
                    <div className="border border-gray-600 rounded p-4">
                        <h4 className="font-semibold text-purple-400 mb-2">Data Structures</h4>
                        <p className="text-sm text-gray-300">Arrays, Linked Lists, Stacks, Queues, Trees</p>
                    </div>
                    <div className="border border-gray-600 rounded p-4">
                        <h4 className="font-semibold text-yellow-400 mb-2">Graph Algorithms</h4>
                        <p className="text-sm text-gray-300">DFS, BFS, Shortest Path, and graph traversal</p>
                    </div>
                    <div className="border border-gray-600 rounded p-4">
                        <h4 className="font-semibold text-red-400 mb-2">Advanced Topics</h4>
                        <p className="text-sm text-gray-300">Dynamic Programming, Greedy Algorithms</p>
                    </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded border-l-4 border-blue-500">
                    <p className="text-blue-200">
                        <strong>💡 Tip:</strong> Start with the basics like sorting and searching algorithms, 
                        then progress to more complex data structures and advanced algorithmic techniques.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmIntroduction;
