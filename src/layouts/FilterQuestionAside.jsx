import React, { useState } from 'react';
import { sortAlphabetically } from "../utils/utils.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

import { category_questions } from '../assets/data/category_questions.js';

const difficultyItems = [
    { id: 1, name: 'easy' },
    { id: 2, name: 'medium' },
    { id: 3, name: 'hard' },
];

const categoryItems = [...category_questions].sort((a, b) => a.localeCompare(b));

const FilterQuestionAside = ({ selectedDifficulties, onDifficultyChange, selectedCategories, onCategoryChange, search, onSearchChange }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get active filter count for display
    const activeFiltersCount = selectedDifficulties.length + selectedCategories.length + (search ? 1 : 0);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="w-full layout-default-bg hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <FontAwesomeIcon icon={faFilter} />
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs ml-1 animate-pulse">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block layout-default-bg text-white rounded-lg p-6">
                {/* Search questions */}
                <div className="mb-6 relative">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search questions"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 p-2 rounded bg-[#2a2b38] text-white border border-gray-700 focus:outline-none text-base"
                    />
                </div>

                <div className="py-4 my-4 border-y border-y-gray-700 border-solid">
                    <h3 className="text-xl font-semibold mb-2 uppercase">Difficulty</h3>
                    {difficultyItems.map(item => (
                        <label key={item.id} className="flex items-center space-x-2 mb-1">
                            <input
                                type="checkbox"
                                checked={selectedDifficulties.includes(item.name)}
                                onChange={() => onDifficultyChange(item.name)}
                                className="w-4 h-4 accent-green-500 bg-[#2a2b38] border border-gray-700 rounded"
                            />
                            <span className="capitalize">{item.name}</span>
                        </label>
                    ))}
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2 uppercase">Category</h3>
                    {sortAlphabetically(categoryItems).map((cat, i) => (
                        <label key={i} className="flex items-center space-x-2 mb-1">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => onCategoryChange(cat)}
                                className="w-4 h-4 accent-green-500 bg-[#2a2b38] border border-gray-600 rounded"
                            />
                            <span className="capitalize">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

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
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold">Filters</h2>
                                {activeFiltersCount > 0 && (
                                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                        {/* Filter Content */}
                        <div className="p-4">
                            {/* Search questions */}
                            <div className="mb-6 relative">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search questions"
                                    value={search}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full pl-10 p-2 rounded bg-[#2a2b38] text-white border border-gray-700 focus:outline-none text-base"
                                />
                            </div>

                            <div className="py-4 my-4 border-y border-y-gray-700 border-solid">
                                <h3 className="text-xl font-semibold mb-2 uppercase">Difficulty</h3>
                                {difficultyItems.map(item => (
                                    <label key={item.id} className="flex items-center space-x-2 mb-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedDifficulties.includes(item.name)}
                                            onChange={() => onDifficultyChange(item.name)}
                                            className="w-4 h-4 accent-green-500 bg-[#2a2b38] border border-gray-700 rounded"
                                        />
                                        <span className="capitalize">{item.name}</span>
                                    </label>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2 uppercase">Category</h3>
                                {sortAlphabetically(categoryItems).map((cat, i) => (
                                    <label key={i} className="flex items-center space-x-2 mb-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => onCategoryChange(cat)}
                                            className="w-4 h-4 accent-green-500 bg-[#2a2b38] border border-gray-600 rounded"
                                        />
                                        <span className="capitalize">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterQuestionAside;
