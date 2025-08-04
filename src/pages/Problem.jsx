import { useState, useMemo } from 'react';
import QuestionCard from '../components/QuestionCard';
import FilterQuestionAside from "../layouts/FilterQuestionAside.jsx";

const ITEMS_PER_PAGE = 30;

const Problem = ({ questions, onQuestionClick }) => {
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulties(prev =>
            prev.includes(difficulty)
                ? prev.filter(d => d !== difficulty)
                : [...prev, difficulty]
        );
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            const difficultyMatch = selectedDifficulties.length === 0 || selectedDifficulties.includes(q.difficulty);
            const categoryMatch = selectedCategories.length === 0 || q.category.some(c => selectedCategories.includes(c));
            const searchMatch = q.title.toLowerCase().includes(search.toLowerCase());
            return difficultyMatch && categoryMatch && searchMatch;
        });
    }, [questions, selectedDifficulties, selectedCategories, search]);

    const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
    const paginatedQuestions = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredQuestions.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredQuestions, currentPage]);

    return (
        <div className="w-full flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
                {/* Filter Section - Top on mobile, Right on desktop */}
                <div className="w-full lg:w-2/12 order-1 lg:order-2">
                    <FilterQuestionAside
                        selectedDifficulties={selectedDifficulties}
                        onDifficultyChange={handleDifficultyChange}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        search={search}
                        onSearchChange={handleSearchChange}
                    />
                </div>

                {/* Questions List - Bottom on mobile, Left on desktop */}
                <div className="w-full lg:w-10/12 flex flex-col gap-3 order-2 lg:order-1">
                    {paginatedQuestions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onClick={() => onQuestionClick(question)}
                        />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-3 py-1 layout-default-bg rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-3 py-1 layout-default-bg rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Problem;
