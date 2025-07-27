// Components
import Paragraph from "../../components/Paragraph.jsx";
import ExampleList from "../../components/ExampleList.jsx";
import ConstraintsBullet from "../../components/ConstraintsBullet.jsx";
import TableOfContents from "../../components/TableOfContents.jsx";
import Heading from "../../components/Heading.jsx";
import CodeBlock from "../../components/CodeBlock.jsx";
import Bullet from "../../components/Bullet.jsx";
import References from "../../components/References.jsx";

// Visualizers
import TwoSumBruteForceVisualizer from "../../visualizer/problem/two-sum/TwoSumBruteForceVisualizer.jsx";
import TwoSumHashTableVisualizer from "../../visualizer/problem/two-sum/TwoSumHashTableVisualizer.jsx";

// Assets
import {questions} from "../../assets/data/references.js";
import {solutions} from "../../assets/data/solutions.js";

const TwoSum = () => {

    const examples = [
        {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
            input: 'nums = [3,2,4], target = 6',
            output: '[1,2]'
        },
        {
            input: 'nums = [3,3], target = 6',
            output: '[0,1]'
        }
    ];

    return (
        <div>
            <Paragraph
                content={"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."}/>

            <ExampleList examples={examples}/>

            <ConstraintsBullet
                constraints={[
                    {text: '2 <= nums.length <= 10^4', type: 'math'},
                    {text: '-10^9 <= nums[i] <= 10^9', type: 'math'},
                    {text: '-10^9 <= target <= 10^9', type: 'math'},
                    {text: 'Only one valid answer exists.', type: 'text'},
                ]}
            />

            <TableOfContents items={[
                {id: 'two-sum-brute-force', title: 'Approach 1: Brute Force'},
                {id: 'two-sum-hash-table', title: 'Approach 2: Hash Table'},
            ]}/>

            <section id="two-sum-brute-force">
                <Heading heading={"Approach 1: Brute Force"}/>

                <Paragraph
                    content={"We need to find the combination of which two numbers add up to a given target. We can split this into two steps: 1.) Iterate over every possible pair of numbers 2.) Check if a given pair sums up to our target."}/>

                <Paragraph
                    content={"How do we iterate over every pair of numbers? We can start with the first number and compare it against every other number in the array. Then we move the next number and compare it against every other number and so on until we have found our solution."}/>

                <Paragraph
                    content={"We can then easily check if a given pair adds up to our target. If it does then we have found our solution and we can return the two indices."}/>

                <CodeBlock language={"javascript"} code={solutions.two_sum.brute_force.javascript}/>

                <TwoSumBruteForceVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(n^2), where n is the size of the array. For each number, we have to evaluate every other number in the array.",
                            "Space Complexity: O(1), disregarding the input, all other variables have constant space."
                        ]}/>
            </section>

            <section id="two-sum-hash-table">
                <Heading heading={"Approach 2: Hash Table"}/>

                <Paragraph
                    content={"We can build on the brute force solution and see that there is a lot of repeated work. This is because we iterate over the array multiple times."}/>

                <Paragraph
                    content={"Why do we need to iterate multiple times? For each number, we try to find another number which sums to the target. We refer to this other number as the \"complement\", and to find this number we check every other element in the array."}/>

                <Bullet heading={"We can rephrase the previous algorithm:"} bold
                        items={[
                            "Iterate over every number in the array",
                            "For each number scan the rest of the array to see if there is another number which sums to the target."
                        ]}
                        type={"ol"}/>

                <Paragraph
                    content={"Notice how we repeatedly search the array for this \"complement\" number (step #2 above), which takes O(n) time. Is there some way we can do this step faster?"}/>

                <Paragraph
                    content={"We can reduce this repeated work by using a hash table. A hash table is a data structure which stores key-value pairs, a value can be looked up with a given key in constant time. We can store a number with its index in the hash table. Then when we need to check if the complement number is in the array, we can do so in constant time."}/>

                <Bullet heading={"With this in mind we can break down our hash table algorithm into steps:"} bold
                        items={[
                            "Iterate over every number in the array This can be done with a simple for loop.",
                            "Calculate the complement The complement is the other number that would sum to the target and can be calculated as target - num.",
                            "Check if that complement is in our hash table If the complement is in the hash table then we can look up its index and we have our solution! If it is not then we continue to search the array.",
                            "Add the current number to our hash table The current number may sum up with another number that we have not yet evaluated. We can store the number in the hash table as a key with the index as the value for future checks."
                        ]}
                        type={"ol"}/>

                <CodeBlock language={"javascript"} code={solutions.two_sum.hash_table.javascript}/>

                <TwoSumHashTableVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(n), where n is the size of the array. We iterate over every number in the array and the hash table lookup/add operations take constant time.",
                            "Space Complexity: O(n), where n is the size of the array. Our hash map stores every number in the input array."
                        ]}/>
            </section>

            <References references={questions.two_sum}/>
        </div>
    );
};

export default TwoSum;
