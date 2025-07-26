import AlgorithmCard from "../components/AlgorithmCard.jsx";
import {categories} from "../assets/data/categories.js";
import {formatTitle} from "../utils/utils.js";
import {faSort, faSearch, faProjectDiagram, faTree, faBrain} from '@fortawesome/free-solid-svg-icons';

const AlgorithmsSection = ({onAlgorithmClick}) => {

    const icons = [faSort, faSearch, faProjectDiagram, faTree, faBrain];

    return (
        <section className="pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 w-full flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
                    Popular Algorithms & Data structures Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 mt-6 sm:mt-8 lg:mt-10">
                    {Object.entries(categories).map(([key, list], index) => (
                        <AlgorithmCard
                            key={key}
                            icon={icons[index]}
                            title={formatTitle(key)}
                            list={list}
                            onClickItem={onAlgorithmClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlgorithmsSection;