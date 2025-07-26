import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import {categories} from "../assets/data/categories.js";
import {formatTitle} from "../utils/utils.js";

const AlgorithmAside = ({onAlgorithmClick}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const handleAlgorithmClick = (algorithm) => {
        onAlgorithmClick(algorithm);
        setIsMobileMenuOpen(false); // Close mobile menu after selection
    };

    const AlgorithmList = () => (
        <>
            {Object.keys(categories).map((category, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-lg font-bold mb-2">{formatTitle(category)}</h3>
                    <ul>
                        {categories[category].map((item, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={() => handleAlgorithmClick(item)}
                                    className="text-[#71727A] hover:text-white transition-all duration-200 w-full text-left py-1 hover:pl-2"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="w-full layout-default-bg hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <FontAwesomeIcon icon={faList} />
                    <span>Select Algorithm</span>
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block layout-default-bg text-white rounded-lg p-6">
                <AlgorithmList />
            </aside>

            {/* Mobile Modal/Canvas */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop for clicking outside to close */}
                    <div 
                        className="fixed inset-0 transition-opacity duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-default text-white w-full max-w-sm ml-auto h-full overflow-y-auto transform transition-transform duration-300 ease-out translate-x-0">
                        {/* Header */}
                        <div className="sticky top-0 bg-default border-b border-gray-700 p-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Select Algorithm</h2>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        
                        {/* Algorithm List */}
                        <div className="p-4">
                            <AlgorithmList />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AlgorithmAside;
