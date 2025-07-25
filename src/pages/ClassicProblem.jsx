import ClassicProblemsSection from "../layouts/ClassicProblemsSection";

const ClassicProblem = ({ onClassicProblemClick }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-default">
            <ClassicProblemsSection onProblemClick={onClassicProblemClick} />
        </div>
    );
};

export default ClassicProblem;
