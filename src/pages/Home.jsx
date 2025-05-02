import HeroSection from "../layouts/HeroSection";
import AlgorithmsSection from "../layouts/AlgorithmsSection";

const Home = ({ onAlgorithmClick }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <HeroSection />
            <AlgorithmsSection onAlgorithmClick={onAlgorithmClick}/>
        </div>
    );
};

export default Home;