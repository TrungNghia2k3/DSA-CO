import AlgorithmCard from "../components/AlgorithmCard.jsx";
import {categories} from "../assets/data/categories.js";
import {formatTitle} from "../utils/utils.js";
import {faSort, faSearch, faProjectDiagram, faTree, faBrain} from '@fortawesome/free-solid-svg-icons';

const AlgorithmsSection = ({onAlgorithmClick}) => {

    const icons = [faSort, faSearch, faProjectDiagram, faTree, faBrain];

    return (
        <section className="pt-28 pb-20  w-full flex flex-col items-center justify-center">
            <div className="w-[1300px] flex flex-col">
                <h2 className="text-2xl font-bold">Popular Algorithms & Data structures Categories</h2>
                <div className="grid grid-cols-5 gap-5 mt-10">
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