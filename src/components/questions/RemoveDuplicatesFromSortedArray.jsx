import React from 'react';
import Paragraph from "../Paragraph.jsx";
import ExampleList from "../ExampleList.jsx";
import ConstraintsBullet from "../ConstraintsBullet.jsx";
import Bullet from "../Bullet.jsx";
import TableOfContents from "../TableOfContents.jsx";
import RemoveDuplicatesTwoPointersVisualizer from "../visualizer/remove-duplicates-from-sorted-array/RemoveDuplicatesTwoPointersVisualizer.jsx";
import RemoveDuplicatesHashSetVisualizer from "../visualizer/remove-duplicates-from-sorted-array/RemoveDuplicatesHashSetVisualizer.jsx";
import {questions} from "../../assets/data/references.js";
import AlgorithmReferenceSection from "../../layouts/AlgorithmReferenceSection.jsx";

const RemoveDuplicatesFromSortedArray = () => {

    const examples = [
        {
            input: 'nums = [1, 1, 2]',
            output: '2, nums = [1, 2, _ ]',
            explanation: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\n' +
                'It does not matter what you leave beyond the returned k (hence they are underscores).'
        },
        {
            input: 'nums = [0,0,1,1,1,2,2,3,3,4]',
            output: '5, nums = [0,1,2,3,4, _ , _ , _ , _ , _ ]',
            explanation: 'Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively. It does not matter what you leave beyond the returned k (hence they are underscores).'
        }
    ];

    return (
        <div>
            <Paragraph
                content={"Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums."}/>

            <Bullet
                heading={"Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:"}
                items={[
                    "Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.",
                    "Return k."
                ]}
            />

            <ExampleList examples={examples}/>

            <ConstraintsBullet
                constraints={[
                    {text: '1 <= nums.length <= 3 * 10^4', type: 'math'},
                    {text: '-100 <= nums[i] <= 100', type: 'math'},
                    {text: 'nums is sorted in non-decreasing order.', type: 'text'},
                ]}
            />

            <TableOfContents items={[
                {id: 'remove-duplicates-hash-set', title: 'Approach 1: Hash Set'},
                {id: 'remove-duplicates-two-pointers', title: 'Approach 2: Two pointers'},
            ]}/>

            <section id="remove-duplicates-hash-set">
                <RemoveDuplicatesHashSetVisualizer/>
            </section>

            <section id="remove-duplicates-two-pointers">
                <RemoveDuplicatesTwoPointersVisualizer/>
            </section>

            <AlgorithmReferenceSection references={questions.remove_duplicates}/>
        </div>
    );
};

export default RemoveDuplicatesFromSortedArray;