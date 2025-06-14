import React from 'react';
import Heading from "./Heading.jsx";

const References = ({references}) => {
    return (
        <section className="mt-10">
            <Heading heading="Reference"/>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
                {references.map((ref, index) => (
                    <li key={index}>
                        <a
                            href={ref.url}
                            target="_blank" // Open in a new tab
                            rel="noopener noreferrer" // Security best practice
                            className="text-blue-400 hover:underline"
                        >
                            {ref.title}
                        </a>{" "}
                        – {ref.source}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default References;