import React from 'react';
import { useParams } from 'react-router-dom';
import { algorithmComponents } from '../algorithms'; // Correct this import as needed
import AlgorithmAside from "../layouts/AlgorithmAside.jsx"; // Make sure the path is correct
import AlgorithmIntroduction from "../components/AlgorithmIntroduction.jsx";

const AlgorithmDetail = ({ onAlgorithmClick }) => {
    const { algorithmName } = useParams(); // Get algorithmName from URL parameters
    const Component = algorithmComponents[algorithmName]; // Get the component for the selected algorithm

    return (
        <section className="w-full flex flex-col justify-between px-30 py-20">
            <div className="flex gap-5">
                <div className="w-2/12">
                    <AlgorithmAside onAlgorithmClick={onAlgorithmClick}/>
                </div>

                {/* Main Content */}
                <div className="w-10/12 pl-10">
                    {algorithmName ? (
                        // Show specific algorithm when selected
                        <>
                            <h1 className="text-3xl font-bold mb-4">{algorithmName}</h1>
                            {Component ? <Component/> : <p>No detailed component available for this algorithm.</p>}
                        </>
                    ) : (
                        // Show introduction when no algorithm is selected
                        <AlgorithmIntroduction />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AlgorithmDetail;
