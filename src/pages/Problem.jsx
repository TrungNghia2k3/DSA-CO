import {useState, useMemo} from 'react';
import QuestionCard from '../components/QuestionCard';
import FilterQuestionAside from "../layouts/FilterQuestionAside.jsx";

const Problem = ({questions, onQuestionClick}) => {
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulties(prev =>
            prev.includes(difficulty)
                ? prev.filter(d => d !== difficulty)
                : [...prev, difficulty]
        );
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Filtered questions
    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            const difficultyMatch = selectedDifficulties.length === 0 || selectedDifficulties.includes(q.difficulty);
            const categoryMatch = selectedCategories.length === 0 || q.category.some(c => selectedCategories.includes(c));
            return difficultyMatch && categoryMatch;
        });
    }, [questions, selectedDifficulties, selectedCategories]);

    return (
        <div className="w-full flex flex-col justify-between px-30 py-20">
            <div className="flex gap-5">
                <div className="w-10/12 flex flex-col gap-3">
                    {filteredQuestions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onClick={() => onQuestionClick(question)}
                        />
                    ))}
                </div>
                <div className="w-2/12">
                    <FilterQuestionAside
                        selectedDifficulties={selectedDifficulties}
                        onDifficultyChange={handleDifficultyChange}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Problem;
