// Components
import Bullet from "../../components/Bullet.jsx";
import CodeBlock from "../../components/CodeBlock.jsx";
import Heading from "../../components/Heading.jsx";
import Paragraph from "../../components/Paragraph.jsx";
import TableOfContents from "../../components/TableOfContents.jsx";
import ExampleList from "../../components/ExampleList.jsx";
import ConstraintsBullet from "../../components/ConstraintsBullet.jsx";
import References from "../../components/References.jsx";

// Visualizers
import ThreeSumBruteForceVisualizer from "../../visualizer/problem/three-sum/ThreeSumBruteForceVisualizer.jsx";
import ThreeSumTwoPointersVisualizer from "../../visualizer/problem/three-sum/ThreeSumTwoPointersVisualizer.jsx";

// Assets
import { solutions } from "../../assets/data/solutions.js";
import { questions } from "../../assets/data/references.js";

const ThreeSum = () => {

    const examples = [
        {
            input: 'nums = [-1,0,1,2,-1,-4]',
            output: '[[-1,-1,2],[-1,0,1]]',
            explanation: [
                `nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.`,
                `nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.`,
                `nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.`,
                `The distinct triplets are [-1,0,1] and [-1,-1,2].`,
                `Notice that the order of the output and the order of the triplets does not matter.`
            ].join('\n')
        },
        {
            input: 'nums = [0,1,1]',
            output: '[]',
            explanation: "The only possible triplet does not sum up to 0."
        },
        {
            input: 'nums = [0,0,0]',
            output: '[[0,0,0]]',
            explanation: "The only possible triplet sums up to 0."
        }
    ];

    // Constraints can be added here if needed
    const constraints = [
        { text: '3 <= nums.length <= 3000', type: 'math' },
        { text: '-10^5 <= nums[i] <= 10^5', type: 'math' }
    ];

    return (
        <div>
            <Paragraph content={"Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0."} />

            <Paragraph content={"Notice that the solution set must not contain duplicate triplets."} />

            <ExampleList examples={examples} />

            <ConstraintsBullet
                constraints={constraints} />

            <TableOfContents items={[
                { id: 'approach-1-brute-force', title: 'Approach 1: Brute Force' },
                { id: 'approach-2-hash-map', title: 'Approach 2: Hash Map' },
                { id: 'approach-3-two-pointers', title: 'Approach 3: Two Pointers' }
            ]} />

            <section id="approach-1-brute-force">
                <Heading heading={"Approach 1: Brute Force"} />

                <Paragraph content={"The most straightforward approach is to check every possible combination of three numbers. We use three nested loops to generate all possible triplets and check if their sum equals zero."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Sort the array to handle duplicates easily",
                        "Use three nested loops (i, j, k) where i < j < k",
                        "For each triplet, check if nums[i] + nums[j] + nums[k] == 0",
                        "Use a Set to store unique triplets (avoid duplicates)",
                        "Convert Set back to array for the final result"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n³) - three nested loops",
                        "Space Complexity: O(1) for the algorithm, O(k) for storing results where k is the number of triplets"
                    ]} />

                <CodeBlock
                    language="javascript"
                    code={solutions.three_sum.brute_force.javascript}
                />

                <ThreeSumBruteForceVisualizer />
            </section>

            <section id="approach-2-hash-map">
                <Heading heading={"Approach 2: Hash Map"} />

                <Paragraph content={"This approach optimizes the brute force method by using a hash map to track element frequencies, reducing one level of nested loops."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Sort the array and create a frequency map",
                        "Use two nested loops for the first two elements (i, j)",
                        "Calculate the target value: -(nums[i] + nums[j])",
                        "Check if the target exists in the remaining elements using the frequency map",
                        "Handle duplicates by skipping repeated values"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n²) - two nested loops with O(1) hash map lookup",
                        "Space Complexity: O(n) for the hash map storing frequencies"
                    ]} />

                <CodeBlock
                    language="javascript"
                    code={solutions.three_sum.hash_map.javascript}
                />

                <Paragraph content={"While this approach reduces time complexity, it requires additional space for the hash map and can be more complex to implement correctly, especially when handling duplicates."} />
            </section>

            <section id="approach-3-two-pointers">
                <Heading heading={"Approach 3: Two Pointers"} />

                <Paragraph content={"The two pointers approach is the most elegant and efficient solution. It leverages the sorted array property to eliminate the need for hash maps while maintaining O(n²) time complexity."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Sort the array in ascending order",
                        "For each element at index i, use two pointers (left = i+1, right = n-1)",
                        "Calculate sum = nums[i] + nums[left] + nums[right]",
                        "If sum == 0: found a triplet, add to result and move both pointers",
                        "If sum < 0: move left pointer right (increase sum)",
                        "If sum > 0: move right pointer left (decrease sum)",
                        "Skip duplicates to avoid duplicate triplets"
                    ]} type="ol" />

                <Bullet
                    heading={"Key Optimizations:"}
                    items={[
                        "Early termination: if nums[i] > 0, break (no more valid triplets)",
                        "Skip duplicates for i to avoid duplicate triplets",
                        "Skip duplicates for left and right pointers after finding a valid triplet"
                    ]} />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n²) - outer loop O(n) × inner two pointers O(n)",
                        "Space Complexity: O(1) if we don't count the output array"
                    ]} />

                <CodeBlock
                    language="javascript"
                    code={solutions.three_sum.two_pointers.javascript}
                />

                <ThreeSumTwoPointersVisualizer />

                <Paragraph content={"This approach is optimal because it combines the benefits of the sorted array property with the efficiency of two pointers, avoiding the need for additional data structures while maintaining excellent time complexity."} />
            </section>

            <References references={questions.three_sum} />
        </div>
    );
};

export default ThreeSum;

