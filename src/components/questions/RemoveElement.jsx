import React from 'react';
import Paragraph from "../Paragraph.jsx";
import Bullet from "../Bullet.jsx";
import ExampleList from "../ExampleList.jsx";
import ConstraintsBullet from "../ConstraintsBullet.jsx";
import {questions} from "../../assets/data/references.js";
import AlgorithmReferenceSection from "../../layouts/AlgorithmReferenceSection.jsx";
import TableOfContents from "../TableOfContents.jsx";
import CodeBlock from "../CodeBlock.jsx";
import {solutions} from "../../assets/data/solutions.js";
import Heading from "../Heading.jsx";
import RemoveElementTwoPointersVisualizer from "../visualizer/remove-element/RemoveElementTwoPointersVisualizer.jsx";
import RemoveElementBruteForceVisualizer from "../visualizer/remove-element/RemoveElementBruteForceVisualizer.jsx";

const RemoveElement = () => {
    const examples = [
        {
            input: 'nums = [3, 2, 2, 3], val = 3',
            output: '2, nums = [2, 2, _ , _]',
            explanation: 'Your function should return k = 2, with the first two elements of nums being 2. It does not matter what you leave beyond the returned k (hence they are underscores).'
        },
        {
            input: 'nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2',
            output: '5, nums = [0, 1, 4, 0, 3, _ , _ , _]',
            explanation: 'Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4. Note that the five elements can be returned in any order. It does not matter what you leave beyond the returned k (hence they are underscores).'
        }
    ];

    return (
        <div>
            <Paragraph
                content={"Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val."}/>

            <Bullet
                heading={"Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:"}
                items={[
                    "Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.\n",
                    "Return k."
                ]}
            />

            <ExampleList examples={examples}/>

            <ConstraintsBullet
                constraints={[
                    {text: '0 <= nums.length <= 100', type: 'math'},
                    {text: '0 <= nums[i] <= 50', type: 'math'},
                    {text: '0 <= val <= 100', type: 'math'},
                ]}
            />

            <TableOfContents items={[
                {id: 'remove-element-brute-force', title: 'Approach 1: Brute Force'},
                {id: 'remove-element-two-pointers-i', title: 'Approach 2: Two Pointers I'},
                {id: 'remove-element-two-pointers-ii', title: 'Approach 2: Two Pointers II'},
            ]}/>

            <section id="remove-element-brute-force">
                <Heading heading={"Approach 1: Brute Force"}/>

                <CodeBlock language={"cpp"} code={solutions.remove_element.brute_force.cpp}/>

                <CodeBlock language={"java"} code={solutions.remove_element.brute_force.java}/>

                <CodeBlock language={"javascript"} code={solutions.remove_element.brute_force.javascript}/>

                <RemoveElementBruteForceVisualizer />
            </section>

            <section id="remove-element-two-pointers-i">
                <Heading heading={"Approach 2: Two Pointers I"}/>

                <CodeBlock language={"cpp"} code={solutions.remove_element.two_pointers_i.cpp}/>

                <CodeBlock language={"java"} code={solutions.remove_element.two_pointers_i.java}/>

                <CodeBlock language={"javascript"} code={solutions.remove_element.two_pointers_i.javascript}/>
            </section>

            <section id="remove-element-two-pointers-ii">
                <Heading heading={"Approach 2: Two Pointers II"}/>

                <CodeBlock language={"cpp"} code={solutions.remove_element.two_pointers_ii.cpp}/>

                <CodeBlock language={"java"} code={solutions.remove_element.two_pointers_ii.java}/>

                <CodeBlock language={"javascript"} code={solutions.remove_element.two_pointers_ii.javascript}/>
            </section>

            <RemoveElementTwoPointersVisualizer />

            <AlgorithmReferenceSection references={questions.remove_element}/>
        </div>
    )
};

export default RemoveElement;