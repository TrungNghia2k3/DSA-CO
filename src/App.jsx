import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Page
import Home from './pages/Home';
import Problem from './pages/Problem';
import AlgorithmDetail from './pages/AlgorithmDetail';
import QuestionDetail from './pages/QuestionDetail';
import ClassicProblemDetail from './pages/ClassicProblemDetail';
import ClassicProblem from './pages/ClassicProblem';

// Component
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';

// Assets
import { questions } from './assets/data/questions.js';

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [breadcrumb, setBreadcrumb] = useState(['Home']);

    // Update breadcrumb based on current location
    useEffect(() => {
        const path = location.pathname;
        const segments = path.split('/').filter(Boolean);
        
        if (path === '/') {
            setBreadcrumb(['Home']);
        } else if (path === '/problem') {
            setBreadcrumb(['Home', 'Problem']);
        } else if (path === '/classic-problem') {
            setBreadcrumb(['Home', 'Classic Problems']);
        } else if (path === '/algorithm') {
            setBreadcrumb(['Home', 'Theory']);
        } else if (path.startsWith('/problem/')) {
            const questionId = segments[1];
            const question = questions.find(q => 
                q.id.toString() === questionId || q.title === decodeURIComponent(questionId)
            );
            setBreadcrumb(['Problem', question?.title || 'Question']);
        } else if (path.startsWith('/classic-problem/')) {
            const problemSlug = segments[1];
            // Convert slug back to problem name for breadcrumb
            const problemName = decodeURIComponent(problemSlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            setBreadcrumb(['Home', 'Classic Problems', problemName]);
        } else if (path.startsWith('/algorithm/')) {
            const algorithmName = decodeURIComponent(segments[1]);
            setBreadcrumb(['Home', algorithmName]);
        }
    }, [location.pathname]);

    // Handle click on an algorithm (navigate to algorithm detail)
    const handleAlgorithmClick = (algorithmName) => {
        navigate(`/algorithm/${algorithmName}`);
    };

    // Handle click on a classic problem (navigate to classic problem detail)
    const handleClassicProblemClick = (problem) => {
        const problemSlug = problem.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        navigate(`/classic-problem/${problemSlug}`);
    };

    // Navigation function to handle page switching
    const navigateToPage = (targetPage, options = {}) => {
        switch (targetPage) {
            case 'home':
                navigate('/');
                break;
            case 'problem':
                navigate('/problem');
                break;
            case 'classic-problem':
                navigate('/classic-problem');
                break;
            case 'theory':
                navigate('/algorithm');
                break;
            case 'algorithm-detail':
                navigate(`/algorithm/${options.name}`);
                break;
            case 'question-detail':
                navigate(`/problem/${options.question?.id || options.question?.title}`);
                break;
            case 'classic-problem-detail':
                navigate(`/classic-problem/${options.slug}`);
                break;
            default:
                navigate('/');
        }
    };

    // Get the current page based on location
    const getCurrentPage = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path.startsWith('/problem')) return 'problem';
        if (path === '/algorithm') return 'theory';
        if (path.startsWith('/algorithm/')) return 'algorithm-detail';
        if (path === '/classic-problem') return 'classic-problem';
        if (path.startsWith('/classic-problem/')) return 'classic-problem-detail';
        return 'home';
    };

    // Handle breadcrumb clicks
    const handleBreadcrumbClick = (index) => {
        const crumb = breadcrumb[index];
        
        if (crumb === 'Home') {
            navigateToPage('home');
        } else if (crumb === 'Problem') {
            navigateToPage('problem');
        } else if (crumb === 'Classic Problems') {
            navigateToPage('classic-problem');
        } else if (crumb === 'Theory') {
            navigateToPage('theory');
        } else if (breadcrumb[0] === 'Problem') {
            navigateToPage('problem');
        } else {
            // If it's an algorithm name, navigate to that algorithm
            navigateToPage('algorithm-detail', { name: crumb });
        }
    };

    return (
        <>
            <Navbar navigateToPage={navigateToPage} activePage={getCurrentPage()} />
            <main>
                {location.pathname !== '/' && (
                    <Breadcrumb
                        breadcrumb={breadcrumb}
                        onBreadcrumbClick={handleBreadcrumbClick}
                    />
                )}
                <div className="w-full m-auto bg-[#121418] text-white">
                    <Routes>
                        <Route path="/" element={<Home onAlgorithmClick={handleAlgorithmClick} onClassicProblemClick={handleClassicProblemClick} />} />
                        <Route 
                            path="/problem" 
                            element={
                                <Problem 
                                    questions={questions}
                                    onQuestionClick={(question) => {
                                        navigate(`/problem/${question?.id || question?.title}`);
                                    }}
                                />
                            } 
                        />
                        <Route 
                            path="/classic-problem" 
                            element={<ClassicProblem onClassicProblemClick={handleClassicProblemClick} />} 
                        />
                        <Route 
                            path="/problem/:questionId" 
                            element={
                                <QuestionDetail 
                                    questions={questions}
                                />
                            } 
                        />
                        <Route 
                            path="/algorithm" 
                            element={
                                <AlgorithmDetail 
                                    onAlgorithmClick={handleAlgorithmClick}
                                />
                            } 
                        />
                        <Route 
                            path="/algorithm/:algorithmName" 
                            element={
                                <AlgorithmDetail 
                                    onAlgorithmClick={handleAlgorithmClick}
                                />
                            } 
                        />
                        <Route 
                            path="/classic-problem/:problemSlug" 
                            element={<ClassicProblemDetail />} 
                        />
                    </Routes>
                </div>
            </main>
        </>
    );
};

export default App;
