import React from 'react';
import { useParams } from 'react-router-dom';
import { questionComponents } from '../questions';

const QuestionDetail = ({ questions }) => {
    const { questionId } = useParams(); // Get questionId from URL parameters
    
    // Find the question by ID or title
    const question = questions.find(q => 
        q.id.toString() === questionId || q.title === decodeURIComponent(questionId)
    );
    
    const Component = question ? questionComponents[question.title] : null;
    
    if (!question) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20">
                <div className="w-[1300px] flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">Question Not Found</h1>
                    <p>The requested question could not be found.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full flex flex-col items-center justify-center py-20">
            <div className="w-[1300px] flex flex-col">
                <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
                {Component ? <Component/> : <p>No component found for this question.</p>}
            </div>
        </div>
    );
};

export default QuestionDetail;
