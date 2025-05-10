import React from 'react';
import Paragraph from "../Paragraph.jsx";
import ExampleList from "../ExampleList.jsx";
import ConstraintsBullet from "../ConstraintsBullet.jsx";

const PlusOne = () => {
    const examples = [
        {
            input: 'digits = [1,2,3]',
            output: '[1,2,4]',
            explanation: 'The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4].'
        },
        {
            input: 'digits = [4,3,2,1]',
            output: '[4,3,2,2]',
            explanation: 'The array represents the integer 4321. Incrementing by one gives 4321 + 1 = 4322. Thus, the result should be [4,3,2,2].'
        },
        {
            input: 'digits = [9]',
            output: '1,0]',
            explanation: 'The array represents the integer 9. Incrementing by one gives 9 + 1 = 10. Thus, the result should be [1,0].'
        }
    ];

    return (
        <div>
            <Paragraph
                content={"You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's."}/>

            <Paragraph content={"Increment the large integer by one and return the resulting array of digits."} />

            <ExampleList examples={examples}/>

            <ConstraintsBullet
                constraints={[
                    {text: '1 <= digits.length <= 100', type: 'math'},
                    {text: '0 <= digits[i] <= 9', type: 'math'},
                    {text: 'digits does not contain any leading 0\'s.', type: 'text'}
                ]}
            />
        </div>
    )
};

export default PlusOne;