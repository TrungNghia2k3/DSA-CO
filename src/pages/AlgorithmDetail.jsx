import React from 'react';
import { useParams } from 'react-router-dom';
import { algorithmComponents } from '../algorithms'; // Correct this import as needed
import AlgorithmAside from "../layouts/AlgorithmAside.jsx"; // Make sure the path is correct
import AlgorithmIntroduction from "../components/AlgorithmIntroduction.jsx";

const AlgorithmDetail = ({ onAlgorithmClick }) => {
    const { algorithmName } = useParams(); // Get algorithmName from URL parameters
    const Component = algorithmComponents[algorithmName]; // Get the component for the selected algorithm

    return (
        <section className="w-full flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
                {/* Algorithm Sidebar */}
                <div className="w-full lg:w-2/12">
                    <AlgorithmAside onAlgorithmClick={onAlgorithmClick}/>
                </div>

                {/* Main Content */}
                <div className="w-full lg:w-10/12 lg:pl-10">
                    {algorithmName ? (
                        // Show specific algorithm when selected
                        <>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{algorithmName}</h1>
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
