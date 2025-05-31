import {sortAlphabetically} from "../utils/utils.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const FilterQuestionAside = ({selectedDifficulties, onDifficultyChange, selectedCategories, onCategoryChange, search, onSearchChange}) => {
    const difficultyItems = [
        {id: 1, name: 'easy'},
        {id: 2, name: 'medium'},
        {id: 3, name: 'hard'},
    ];

    const categoryItems = [
        'array', 'string', 'linked list', 'math', 'graph', 'recursion', 'hash table', 'dynamic programming', 'tree',
        'binary search', 'sorting', 'heap', 'stack', 'queue', 'backtracking', 'greedy', 'bit manipulation',
        'two pointers', 'sliding window', 'depth first search', 'breadth first search'
    ];

    return (
        <div className="layout-default-bg text-white rounded-lg p-6">
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
    );
};

export default FilterQuestionAside;
