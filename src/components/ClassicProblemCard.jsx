import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTag } from '@fortawesome/free-solid-svg-icons';
import { difficultyColors } from '../assets/data/classicProblems';

const ClassicProblemCard = ({ problem, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(problem);
        }
    };

    return (
        <div 
            className="layout-default-bg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-600 p-6 text-white"
            onClick={handleClick}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
                    {problem.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ml-3 ${difficultyColors[problem.difficulty]}`}>
                    {problem.difficulty}
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {problem.description}
            </p>

            {/* Category */}
            <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faTag} className="text-blue-400 mr-2 text-sm" />
                <span className="text-sm text-blue-300 font-medium">
                    {problem.category}
                </span>
            </div>

            {/* Techniques */}
            <div className="flex items-start mb-4">
                
                <div className="flex flex-wrap gap-1">
                    {problem.techniques.slice(0, 3).map((technique, index) => (
                        <span 
                            key={index}
                            className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs"
                        >
                            {technique}
                        </span>
                    ))}
                    {problem.techniques.length > 3 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                            +{problem.techniques.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-600 pt-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                        <FontAwesomeIcon icon={faClock} className="mr-1 text-xs" />
                        <span className="text-xs">Classic Problem #{problem.id}</span>
                    </div>
                    <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                        Explore →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassicProblemCard;
