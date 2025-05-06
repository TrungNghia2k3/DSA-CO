import React from 'react';
import {categories} from "../assets/data/categories.js";
import {formatTitle} from "../utils/utils.js";

const AlgorithmAside = ({onAlgorithmClick}) => {
    return (
        <aside className="bg-[#1F202A] text-white rounded-lg p-10">
            {Object.keys(categories).map((category, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-lg font-bold mb-2">{formatTitle(category)}</h3>
                    <ul>
                        {categories[category].map((item, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={() => onAlgorithmClick(item)} // Pass selected algorithm to parent
                                    className="text-[#71727A] hover:text-white"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </aside>
    );
};

export default AlgorithmAside;
