import {capitalize} from "../utils/utils.js";

const QuestionCard = ({question, onClick}) => {
    const {title, difficulty, category} = question;

    return (
        <div
            onClick={onClick}
            className="bg-[#1F202A] text-white p-4 rounded-lg cursor-pointer hover:bg-[#2a2b38]"
        >
            <div className="flex items-center justify-between w-full">
                <h3 className="text-xl font-bold">{title}</h3>
                <p
                    className={`text-sm capitalize ${
                        difficulty === 'easy'
                            ? 'text-green-500'
                            : difficulty === 'medium'
                                ? 'text-yellow-500'
                                : 'text-red-500'
                    }`}
                >
                    {difficulty}
                </p>
            </div>
            <div className="text-sm mt-2">
                {category.map((tag, i) => (
                    <span
                        key={i}
                        className="bg-gray-700 rounded px-2 py-1 text-xs mr-2"
                    >
                        {capitalize(tag)}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
