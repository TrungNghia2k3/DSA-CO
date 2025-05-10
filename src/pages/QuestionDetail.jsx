import {questionComponents} from '../components/questions';

const QuestionDetail = ({question}) => {
    const Component = questionComponents[question.title];
    
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
