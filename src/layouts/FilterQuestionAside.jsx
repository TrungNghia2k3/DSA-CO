import {sortAlphabetically} from "../utils/utils.js";

const FilterQuestionAside = ({selectedDifficulties, onDifficultyChange, selectedCategories, onCategoryChange}) => {
    const difficultyItems = [
        {id: 1, name: 'easy'},
        {id: 2, name: 'medium'},
        {id: 3, name: 'hard'},
    ];

    const categoryItems = [
        'array', 'string', 'linked list', 'math', 'graph', 'recursion', 'hash table', 'dynamic programming', 'tree', 'binary search', 'sorting', 'heap', 'stack', 'queue', 'backtracking', 'greedy', 'bit manipulation', 'two pointers', 'sliding window', 'depth first search', 'breadth first search'
    ];

    return (
        <div className="bg-[#1F202A] text-white rounded-lg p-10">
            <div className="pb-4 mb-4 border-b border-b-gray-200 border-solid">
                <h3 className="text-xl font-semibold mb-2 uppercase">Difficulty</h3>
                {difficultyItems.map(item => (
                    <label key={item.id} className="flex items-center space-x-2 mb-1">
                        <input
                            type="checkbox"
                            checked={selectedDifficulties.includes(item.name)}
                            onChange={() => onDifficultyChange(item.name)}
                            className="w-4 h-4 accent-green-500 bg-[#2a2b38] border border-gray-600 rounded"
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
