import React from 'react';

const ConstraintsBullet = ({constraints = []}) => {
    const formatMathExpression = (text) => {
        const regex = /(10\^(\d+)|-10\^(\d+))/g;
        const parts = [];
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(text)) !== null) {
            const before = text.slice(lastIndex, match.index);
            if (before) parts.push(before);

            const fullMatch = match[0];
            const exponent = match[2] || match[3];

            parts.push(
                <span key={match.index}>
                    {fullMatch.startsWith('-') && '-'}
                    10<sup>{exponent}</sup>
                </span>
            );

            lastIndex = match.index + fullMatch.length;
        }

        const after = text.slice(lastIndex);
        if (after) parts.push(after);

        return parts.map((part, index) =>
            typeof part === 'string' ? <span key={index}>{part}</span> : part
        );
    };

    return (
        <div>
            <h3 className="text-lg font-semibold my-2">Constraints</h3>
            <ul className="list-disc list-inside space-y-2 mb-3">
                {constraints.map((constraint, index) => (
                    <li key={index} className="text-white mb-3 p-1">
                        {/* Check if constraint type is 'math' */}
                        {constraint.type === 'math' ? (
                            <span
                                className="rounded-xl layout-default-bg p-2">{formatMathExpression(constraint.text)}</span>
                        ) : (
                            <span className="font-bold">{constraint.text}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConstraintsBullet;
