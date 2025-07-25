import { useParams } from 'react-router-dom';
import { classicProblems } from '../assets/data/classicProblems';
import { classicProblemComponents } from '../classic-problems';

const ClassicProblemDetail = () => {
    const { problemSlug } = useParams();
    
    // Find the problem by converting slug back to name
    const problemName = decodeURIComponent(problemSlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const problem = classicProblems.find(p => p.name.toLowerCase() === problemName.toLowerCase());
    
    // Get the corresponding component
    const ProblemComponent = classicProblemComponents[problem?.name];
    
    if (!problem || !ProblemComponent) {
        return (
            <div className="w-full min-h-screen bg-default text-white flex items-center justify-center">
                <div className="w-[1300px] flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">Problem Not Found</h1>
                    <p className="text-gray-400">The requested classic problem could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center justify-center py-20">
            <div className="w-[1300px] flex flex-col">
                {/* Problem Header */}
                <div className="mb-8">
                    <div className="flex items-start gap-3 mb-4">
                        <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                            Classic Problem
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{problem.name}</h1>
                    <p className="text-xl text-gray-300 mb-6">{problem.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                        {problem.techniques.map((technique, index) => (
                            <span 
                                key={index}
                                className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm"
                            >
                                {technique}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Problem Content */}
                <div className="prose prose-invert max-w-none">
                    <ProblemComponent />
                </div>
            </div>
        </div>
    );
};

export default ClassicProblemDetail;
