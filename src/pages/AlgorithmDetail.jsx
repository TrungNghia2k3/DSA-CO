import {algorithmComponents} from '../algorithms'; // Correct this import as needed
import AlgorithmAside from "../layouts/AlgorithmAside.jsx"; // Make sure the path is correct

const AlgorithmDetail = ({name, onAlgorithmClick}) => {
    const Component = algorithmComponents[name]; // Get the component for the selected algorithm

    return (
        <section className="w-full flex flex-col justify-between px-30 py-20">
            <div className="flex gap-5">
                <div className="w-2/12">
                    <AlgorithmAside onAlgorithmClick={onAlgorithmClick}/>
                </div>

                {/* Main Content */}
                <div className="w-10/12 pl-10">
                    <h1 className="text-3xl font-bold mb-4">{name}</h1>
                    {Component ? <Component/> : <p>No detailed component available for this algorithm.</p>}
                </div>
            </div>
        </section>
    );
};

export default AlgorithmDetail;
