import React from 'react';
import Title from './Title';

const Complexity = ({ time, space }) => {

    // Nếu giá trị là số mũ thì tạo chuỗi hiển thị dạng O(n^2) với superscript
    const formatComplexity = (value) => {
        if (typeof value === 'string' && value.includes('^')) {
            // Replace exponents with proper superscript formatting
            const formattedValue = value.replace(/\^(\d+|n|k)/g, '<sup>$1</sup>');
            return (
                <span>
                    O(<span dangerouslySetInnerHTML={{ __html: formattedValue }} />)
                </span>
            );
        } else if (typeof value === 'number') {
            return `O(${value})`;
        } else if (typeof value === 'string') {
            return `O(${value})`;
        }
        return `O(1)`;
    }

    return (
        <>
            <Title title="Time & Space Complexity" />
            <ul className="list-disc pl-6 text-sm sm:text-base">
                <li className="mb-4">
                    <strong>Time Complexity:</strong> {formatComplexity(time)}
                </li>
                <li className="mb-4">
                    <strong>Space Complexity:</strong> {formatComplexity(space)}
                </li>
            </ul>
        </>
    );
};

export default Complexity;