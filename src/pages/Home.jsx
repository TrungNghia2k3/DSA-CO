import HeroSection from "../layouts/HeroSection";
import AlgorithmsSection from "../layouts/AlgorithmsSection";
import ClassicProblemsSection from "../layouts/ClassicProblemsSection";

const Home = ({ onAlgorithmClick, onClassicProblemClick }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <HeroSection />
            <AlgorithmsSection onAlgorithmClick={onAlgorithmClick}/>
            <ClassicProblemsSection onProblemClick={onClassicProblemClick}/>
        </div>
    );
};

export default Home;