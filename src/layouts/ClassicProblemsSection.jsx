import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import ClassicProblemCard from '../components/ClassicProblemCard';
import { classicProblems, problemCategories } from '../assets/data/classicProblems';

const ClassicProblemsSection = ({ onProblemClick }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter problems based on selected criteria
    const filteredProblems = classicProblems.filter(problem => {
        const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
        const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            problem.techniques.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesCategory && matchesDifficulty && matchesSearch;
    });

    const categories = ['All', ...Object.keys(problemCategories)];
    const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

    return (
        <section className="py-12 sm:py-16 lg:py-20 w-full flex flex-col items-center justify-center bg-default">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-3 text-2xl" />
                        <h2 className="text-3xl font-bold text-white">Classic Algorithmic Problems</h2>
                    </div>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Explore the legendary problems in Computer Science that have shaped the field of algorithms and data structures. 
                        These timeless challenges continue to inspire and educate developers worldwide.
                    </p>
                </div>

                {/* Search and Filter Controls */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search problems, techniques, or descriptions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-3 layout-default-bg border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-white"
                        >
                            <FontAwesomeIcon icon={faFilter} />
                            <span>Filters</span>
                            <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded-full text-xs">
                                {filteredProblems.length}
                            </span>
                        </button>
                    </div>

                    {/* Filter Dropdowns */}
                    {showFilters && (
                        <div className="mt-4 p-4 layout-default-bg rounded-lg border border-gray-600">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Difficulty Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                                    <select
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    >
                                        {difficulties.map(difficulty => (
                                            <option key={difficulty} value={difficulty}>{difficulty}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Info */}
                <div className="mb-6">
                    <p className="text-gray-300">
                        Showing <span className="font-semibold text-white">{filteredProblems.length}</span> of <span className="font-semibold text-white">{classicProblems.length}</span> classic problems
                        {selectedCategory !== 'All' && <span> in <span className="font-semibold text-white">{selectedCategory}</span></span>}
                        {selectedDifficulty !== 'All' && <span> with <span className="font-semibold text-white">{selectedDifficulty}</span> difficulty</span>}
                    </p>
                </div>

                {/* Problems Grid */}
                {filteredProblems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProblems.map(problem => (
                            <ClassicProblemCard
                                key={problem.id}
                                problem={problem}
                                onClick={onProblemClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">No problems found</h3>
                        <p className="text-gray-400">Try adjusting your search terms or filters</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ClassicProblemsSection;
