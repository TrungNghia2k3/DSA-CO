import React, {useState} from 'react';
import Home from './pages/Home';
import Problem from './pages/Problem';
import AlgorithmDetail from './pages/AlgorithmDetail';
import QuestionDetail from './pages/QuestionDetail';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import {questions} from './assets/data/data';

const App = () => {
    const [page, setPage] = useState('home');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [breadcrumb, setBreadcrumb] = useState(['Home']);

    // Handle click on an algorithm (update selected algorithm and breadcrumb)
    const handleAlgorithmClick = (algorithmName) => {
        setSelectedAlgorithm(algorithmName);
        setBreadcrumb(['Home', algorithmName]); // Update breadcrumb to include the selected algorithm
        setPage('algorithm-detail'); // Navigate to algorithm detail page
    };

    // Navigation function to handle page switching
    const navigateToPage = (targetPage, options = {}) => {
        setSelectedQuestion(null);
        setSelectedAlgorithm(null);

        switch (targetPage) {
            case 'home':
                setPage('home');
                setBreadcrumb(['Home']);
                break;
            case 'problem':
                setPage('problem');
                setBreadcrumb(['Home', 'Problem']);
                break;
            case 'theory':
                setSelectedAlgorithm("Bubble Sort");
                setPage('algorithm-detail');
                setBreadcrumb(['Home', "Bubble Sort"]);
                break;
            case 'algorithm-detail':
                setSelectedAlgorithm(options.name || null);
                setPage('algorithm-detail');
                setBreadcrumb(['Home', options.name]);
                break;
            case 'question-detail':
                setSelectedQuestion(options.question || null);
                setBreadcrumb(['Problem', options.question?.title || 'Question']);
                break;
            default:
                setPage('home');
                setBreadcrumb(['Home']);
        }
    };

    // Render the appropriate page based on the current state
    const renderPage = () => {
        if (selectedQuestion) {
            return <QuestionDetail question={selectedQuestion}/>;
        }

        switch (page) {
            case 'home':
                return (
                    <Home
                        onAlgorithmClick={(name) => {
                            navigateToPage('algorithm-detail', {name});
                        }}
                    />
                );
            case 'problem':
                return (
                    <Problem
                        questions={questions}
                        onQuestionClick={(q) => {
                            navigateToPage('question-detail', {question: q});
                        }}
                    />
                );
            case 'algorithm-detail':
                return (
                    <AlgorithmDetail
                        name={selectedAlgorithm}
                        onAlgorithmClick={handleAlgorithmClick} // Pass the algorithm click handler to the detail page
                        breadcrumb={breadcrumb} // Pass the breadcrumb to the algorithm detail page
                        setBreadcrumb={setBreadcrumb} // Function to update the breadcrumb
                    />
                );
            default:
                return <Home/>;
        }
    };

    return (
        <>
            <Navbar navigateToPage={navigateToPage} activePage={page}/>
            <main>
                {page !== 'home' && (
                    <Breadcrumb
                        breadcrumb={breadcrumb}
                        onBreadcrumbClick={(index) => {
                            const crumb = breadcrumb[index];

                            if (crumb === 'Home') {
                                navigateToPage('home');
                            } else if (crumb === 'Problem') {
                                navigateToPage('problem');
                            } else if (crumb === 'Algorithm Detail') {
                                navigateToPage('algorithm-detail', {name: selectedAlgorithm});
                            } else {
                                if (breadcrumb[0] === 'Problem') {
                                    navigateToPage('problem');
                                }
                            }
                        }}
                    />
                )}
                <div className="w-full m-auto bg-[#121418] text-white">{renderPage()}</div>
            </main>
        </>
    );
};

export default App;
