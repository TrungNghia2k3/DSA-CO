// Components
import Bullet from "../components/Bullet.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import Heading from "../components/Heading.jsx";
import Paragraph from "../components/Paragraph.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

// Visualizers
import TwoSumIIBruteForceVisualizer from "../visualizer/problem/two-sum-ii/TwoSumIIBruteForceVisualizer.jsx";
import TwoSumIIBinarySearchVisualizer from "../visualizer/problem/two-sum-ii/TwoSumIIBinarySearchVisualizer.jsx";
import TwoSumIIHashMapVisualizer from "../visualizer/problem/two-sum-ii/TwoSumIIHashMapVisualizer.jsx";
import TwoSumIITwoPointersVisualizer from "../visualizer/problem/two-sum-ii/TwoSumIITwoPointersVisualizer.jsx";

// Assets
import { solutions } from "../assets/data/solutions.js";

const TwoSumII = () => {
    return (
        <div>
            <Paragraph
                content={"Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 ≤ index1 < index2 ≤ numbers.length. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2."} />

            <TableOfContents items={[
                { id: 'problem-analysis', title: 'Problem Analysis' },
                { id: 'approach-1-brute-force', title: 'Approach 1: Brute Force' },
                { id: 'approach-2-binary-search', title: 'Approach 2: Binary Search' },
                { id: 'approach-3-hash-map', title: 'Approach 3: Hash Map' },
                { id: 'approach-4-two-pointers', title: 'Approach 4: Two Pointers (Optimal)' },
                { id: 'examples', title: 'Examples' },
                { id: 'constraints', title: 'Constraints' }
            ]} />

            <section id="problem-analysis">
                <Heading heading={"Problem Analysis"} />
                
                <Paragraph content={"Two Sum II builds upon the classic Two Sum problem with a crucial advantage: the input array is already sorted. This constraint opens up more efficient solutions that leverage the sorted property."} />

                <Bullet
                    heading={"Key Differences from Two Sum I:"}
                    items={[
                        "Input array is guaranteed to be sorted in non-decreasing order",
                        "Returns 1-indexed positions instead of 0-indexed",
                        "Guaranteed to have exactly one solution",
                        "Can use sorted array properties for optimization"
                    ]} />

                <Bullet
                    heading={"Key Insights:"}
                    items={[
                        "Sorted array allows for two pointers technique",
                        "Binary search can be used to find complements",
                        "Early termination is possible in many cases",
                        "Space complexity can be optimized to O(1)"
                    ]} />
            </section>

            <section id="approach-1-brute-force">
                <Heading heading={"Approach 1: Brute Force"} />
                
                <Paragraph content={"The brute force approach checks every possible pair of numbers to find the target sum. While not optimal, it's important to understand as a baseline."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Use two nested loops to check all pairs",
                        "For each i, check all j where j > i",
                        "If numbers[i] + numbers[j] == target, return [i+1, j+1]",
                        "Continue until solution is found"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n²) - checking all pairs",
                        "Space Complexity: O(1) - only using constant extra space"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.two_sum_ii.brute_force.javascript} 
                />
                
                <TwoSumIIBruteForceVisualizer />
            </section>

            <section id="approach-2-binary-search">
                <Heading heading={"Approach 2: Binary Search"} />
                
                <Paragraph content={"This approach leverages the sorted array property by using binary search to find the complement for each element."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "For each element at index i, calculate complement = target - numbers[i]",
                        "Use binary search to find the complement in numbers[i+1:]",
                        "If found, return [i+1, found_index+1]",
                        "Continue until solution is found"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n log n) - O(n) iterations × O(log n) binary search",
                        "Space Complexity: O(1) - only using constant extra space"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.two_sum_ii.binary_search.javascript} 
                />

                <TwoSumIIBinarySearchVisualizer />
            </section>

            <section id="approach-3-hash-map">
                <Heading heading={"Approach 3: Hash Map"} />
                
                <Paragraph content={"The hash map approach provides O(n) time complexity by storing seen elements and their indices for quick complement lookup."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Create a hash map to store number → index mapping",
                        "For each number, calculate complement = target - number",
                        "Check if complement exists in hash map",
                        "If found, return [complement_index, current_index + 1]",
                        "Otherwise, add current number and index to hash map"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n) - single pass through array",
                        "Space Complexity: O(n) - hash map can store up to n elements"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.two_sum_ii.hash_map.javascript} 
                />
                
                <TwoSumIIHashMapVisualizer />
            </section>

            <section id="approach-4-two-pointers">
                <Heading heading={"Approach 4: Two Pointers (Optimal)"} />
                
                <Paragraph content={"The two pointers approach is the optimal solution for this problem, taking advantage of the sorted array to achieve O(n) time with O(1) space."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Initialize left pointer at start (0) and right pointer at end (n-1)",
                        "Calculate current_sum = numbers[left] + numbers[right]",
                        "If current_sum == target: return [left+1, right+1]",
                        "If current_sum < target: move left pointer right (increase sum)",
                        "If current_sum > target: move right pointer left (decrease sum)",
                        "Repeat until solution is found"
                    ]} type="ol" />

                <Bullet
                    heading={"Why This Works:"}
                    items={[
                        "Sorted array ensures moving left increases sum, moving right decreases sum",
                        "Each comparison eliminates one potential pair",
                        "Guaranteed to find solution since exactly one exists",
                        "No need to check all pairs - intelligent elimination"
                    ]} />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n) - each element visited at most once",
                        "Space Complexity: O(1) - only using two pointers"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.two_sum_ii.two_pointers.javascript} 
                />

                <TwoSumIITwoPointersVisualizer />

                <Paragraph content={"This approach is optimal because it combines the best of both worlds: linear time complexity and constant space complexity, making it the preferred solution for sorted arrays."} />
            </section>
        </div>
    );
};

export default TwoSumII;
