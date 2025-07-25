// Components
import Bullet from "../components/Bullet.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import Heading from "../components/Heading.jsx";
import Paragraph from "../components/Paragraph.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

// Visualizers
import FourSumBruteForceVisualizer from "../visualizer/problem/four-sum/FourSumBruteForceVisualizer.jsx";
import FourSumHashMapVisualizer from "../visualizer/problem/four-sum/FourSumHashMapVisualizer.jsx";
import FourSumTwoPointersRegularVisualizer from "../visualizer/problem/four-sum/FourSumTwoPointersRegularVisualizer.jsx";
import FourSumTwoPointersVisualizer from "../visualizer/problem/four-sum/FourSumTwoPointersVisualizer.jsx";

// Assets
import { solutions } from "../assets/data/solutions.js";

const FourSum = () => {
    return (
        <div>
            <Paragraph
                content={"Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that 0 ≤ a < b < c < d < n and nums[a] + nums[b] + nums[c] + nums[d] == target."} />

            <TableOfContents items={[
                { id: 'problem-analysis', title: 'Problem Analysis' },
                { id: 'approach-1-brute-force', title: 'Approach 1: Brute Force' },
                { id: 'approach-2-hash-map', title: 'Approach 2: Hash Map Optimization' },
                { id: 'approach-3-two-pointers', title: 'Approach 3: Two Pointers' },
                { id: 'approach-4-k-sum', title: 'Approach 4: K-Sum Two Pointers (Optimal)' },
                { id: 'examples', title: 'Examples' },
                { id: 'constraints', title: 'Constraints' }
            ]} />

            <section id="problem-analysis">
                <Heading heading={"Problem Analysis"} />
                
                <Paragraph content={"4Sum extends the 3Sum problem to find all unique quadruplets that sum to a target value. This is a natural progression in the k-sum family of problems, requiring careful handling of duplicates and efficient search strategies."} />

                <Bullet
                    heading={"Key Challenges:"}
                    items={[
                        "Finding all unique quadruplets (no duplicate results)",
                        "Handling duplicate elements in the input array",
                        "Maintaining O(n³) or better time complexity",
                        "Avoiding integer overflow for large sums",
                        "Efficiently pruning search space"
                    ]} />

                <Bullet
                    heading={"Problem Characteristics:"}
                    items={[
                        "Extension of 2Sum and 3Sum problems",
                        "Requires returning all solutions, not just one",
                        "Solution set must not contain duplicate quadruplets",
                        "Array indices must be in ascending order (a < b < c < d)",
                        "Can be generalized to k-sum problems"
                    ]} />
            </section>

            <section id="approach-1-brute-force">
                <Heading heading={"Approach 1: Brute Force"} />
                
                <Paragraph content={"The brute force approach uses four nested loops to check all possible quadruplets. While straightforward, it's inefficient for larger inputs."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Use four nested loops for indices a < b < c < d",
                        "Check if nums[a] + nums[b] + nums[c] + nums[d] == target",
                        "Use a set to store unique quadruplets",
                        "Convert quadruplets to strings or sort them for uniqueness",
                        "Return all unique quadruplets found"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n⁴) - four nested loops",
                        "Space Complexity: O(k) - where k is the number of unique quadruplets"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.four_sum.brute_force.javascript} 
                />

                <FourSumBruteForceVisualizer />
            </section>

            <section id="approach-2-hash-map">
                <Heading heading={"Approach 2: Hash Map Optimization"} />
                
                <Paragraph content={"This approach reduces the problem to 2Sum by fixing two elements and using a hash map to find the remaining pair."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Fix the first two elements with nested loops",
                        "For remaining two elements, use hash map approach",
                        "Calculate needed = target - nums[i] - nums[j]",
                        "Use hash map to find pairs that sum to needed",
                        "Handle duplicates carefully using sorting and skipping",
                        "Store unique quadruplets in result"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n³) - two fixed loops + O(n) hash map operations",
                        "Space Complexity: O(n) - hash map storage + O(k) for results"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.four_sum.hash_map.javascript} 
                />

                <FourSumHashMapVisualizer />
            </section>

            <section id="approach-3-two-pointers">
                <Heading heading={"Approach 3: Two Pointers"} />
                
                <Paragraph content={"This approach extends the 3Sum two pointers technique by adding an additional outer loop for the fourth element."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Sort the array to enable two pointers technique",
                        "Fix first element with outermost loop",
                        "Fix second element with second loop",
                        "Use two pointers for remaining two elements",
                        "Skip duplicates at all levels to avoid duplicate quadruplets",
                        "Adjust pointers based on sum comparison with target"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n³) - two nested loops + O(n) two pointers",
                        "Space Complexity: O(1) - excluding output space"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.four_sum.two_pointers.javascript} 
                />

                <FourSumTwoPointersRegularVisualizer />
            </section>

            <section id="approach-4-k-sum">
                <Heading heading={"Approach 4: K-Sum Two Pointers (Optimal)"} />
                
                <Paragraph content={"This approach generalizes the solution to work for any k-sum problem, making it highly reusable and elegant. It recursively reduces k-sum to 2-sum."} />

                <Bullet
                    heading={"Algorithm Design:"}
                    items={[
                        "Implement a general kSum function that works for any k ≥ 2",
                        "Base case: when k == 2, use two pointers technique",
                        "Recursive case: fix first element and solve (k-1)Sum for remaining",
                        "Handle duplicates systematically at each level",
                        "Early pruning when minimum/maximum possible sums are out of range"
                    ]} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Sort the array once at the beginning",
                        "Call kSum(nums, target, 4) to find 4-sum",
                        "In kSum function:",
                        "  • If k == 2: use two pointers",
                        "  • Else: fix first element, recursively solve (k-1)Sum",
                        "  • Skip duplicates to ensure uniqueness",
                        "  • Add early pruning optimizations",
                        "Combine results from recursive calls"
                    ]} type="ol" />

                <Bullet
                    heading={"Optimizations:"}
                    items={[
                        "Early termination if target is outside possible range",
                        "Skip duplicate elements efficiently",
                        "Pruning when remaining elements can't reach target",
                        "Reusable for 2Sum, 3Sum, 4Sum, and beyond"
                    ]} />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n^(k-1)) - for k=4, it's O(n³)",
                        "Space Complexity: O(k) - recursion depth + O(result) for output"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.four_sum.k_sum_two_pointers.javascript} 
                />

                <FourSumTwoPointersVisualizer />

                <Paragraph content={"This generalized approach is optimal because it provides a clean, reusable solution that scales to any k-sum problem while maintaining optimal time complexity and handling all edge cases systematically."} />
            </section>
        </div>
    );
};

export default FourSum;
