import React from 'react';
import Example from './Example';

const ExampleList = ({examples = []}) => {
    if (!examples.length) return null;

    return (
        <div className="layout-default-bg rounded-xl p-5">
            {examples.map((example, index) => (
                <Example
                    key={index}
                    title={"Example " + (index + 1)}
                    input={example.input}
                    output={example.output}
                    image={example.image}
                    explanation={example.explanation}
                />
            ))}
        </div>
    );
};

export default ExampleList;
