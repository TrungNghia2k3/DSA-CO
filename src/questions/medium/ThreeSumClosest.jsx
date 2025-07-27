// Components
import Bullet from "../../components/Bullet.jsx";
import CodeBlock from "../../components/CodeBlock.jsx";
import Heading from "../../components/Heading.jsx";
import Paragraph from "../../components/Paragraph.jsx";
import TableOfContents from "../../components/TableOfContents.jsx";

// Visualizers
import ThreeSumClosestBruteForceVisualizer from "../../visualizer/problem/three-sum-closest/ThreeSumClosestBruteForceVisualizer.jsx";
import ThreeSumClosestTwoPointersVisualizer from "../../visualizer/problem/three-sum-closest/ThreeSumClosestTwoPointersVisualizer.jsx";

// Assets
import { solutions } from "../../assets/data/solutions.js";

const ThreeSumClosest = () => {
    return (
        <div>
            <Paragraph
                content={"Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers."} />

            <TableOfContents items={[
                { id: 'problem-analysis', title: 'Problem Analysis' },
                { id: 'approach-1-brute-force', title: 'Approach 1: Brute Force' },
                { id: 'approach-2-two-pointers', title: 'Approach 2: Two Pointers (Optimal)' },
                { id: 'examples', title: 'Examples' },
                { id: 'constraints', title: 'Constraints' }
            ]} />

            <section id="problem-analysis">
                <Heading heading={"Problem Analysis"} />
                
                <Paragraph content={"3Sum Closest is a variation of the classic 3Sum problem where instead of finding triplets that sum to zero, we need to find the triplet whose sum is closest to a given target value."} />

                <Bullet
                    heading={"Key Insights:"}
                    items={[
                        "We need to minimize |sum - target| where sum is the triplet sum",
                        "Sorting the array enables two pointers optimization",
                        "We track the closest sum seen so far",
                        "Early termination when exact target is found",
                        "Similar to 3Sum but with distance tracking instead of exact matching"
                    ]} />

                <Bullet
                    heading={"Problem Characteristics:"}
                    items={[
                        "Always has exactly one unique answer (guaranteed by problem)",
                        "Can have positive, negative, or zero target",
                        "Array can contain duplicates",
                        "Need to return the sum, not the indices or triplet itself"
                    ]} />
            </section>

            <section id="approach-1-brute-force">
                <Heading heading={"Approach 1: Brute Force"} />
                
                <Paragraph content={"The brute force approach examines all possible triplets and tracks the one with sum closest to the target."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Use three nested loops to generate all possible triplets",
                        "For each triplet (i, j, k) where i < j < k",
                        "Calculate current_sum = nums[i] + nums[j] + nums[k]",
                        "If |current_sum - target| < |closest_sum - target|, update closest_sum",
                        "If current_sum == target, return immediately (optimal)",
                        "Return the closest_sum found"
                    ]} type="ol" />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n³) - three nested loops",
                        "Space Complexity: O(1) - only using constant extra space"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.three_sum_closest.brute_force.javascript} 
                />

                <ThreeSumClosestBruteForceVisualizer />
            </section>

            <section id="approach-2-two-pointers">
                <Heading heading={"Approach 2: Two Pointers (Optimal)"} />
                
                <Paragraph content={"The two pointers approach optimizes the solution by sorting the array first and using intelligent pointer movement to find the closest sum efficiently."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Sort the array to enable two pointers technique",
                        "Fix the first element with outer loop",
                        "Use two pointers (left, right) for the remaining two elements",
                        "Calculate current_sum = nums[i] + nums[left] + nums[right]",
                        "Update closest_sum if current sum is closer to target",
                        "Move pointers based on comparison with target:",
                        "  • If current_sum < target: move left pointer right",
                        "  • If current_sum > target: move right pointer left", 
                        "  • If current_sum == target: return target (optimal)",
                        "Continue until all possibilities are explored"
                    ]} type="ol" />

                <Bullet
                    heading={"Why Two Pointers Works:"}
                    items={[
                        "Sorted array allows intelligent elimination of suboptimal choices",
                        "Moving left pointer increases sum, moving right decreases sum",
                        "Each pointer movement eliminates multiple invalid combinations",
                        "Reduces search space from O(n³) to O(n²)"
                    ]} />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n²) - O(n log n) sorting + O(n²) two pointers",
                        "Space Complexity: O(1) - only using constant extra space (excluding sorting)"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.three_sum_closest.two_pointers.javascript} 
                />

                <ThreeSumClosestTwoPointersVisualizer />

                <Paragraph content={"This approach is optimal for the 3Sum Closest problem, providing the best balance of time complexity and space efficiency while being much more intuitive than the brute force solution."} />
            </section>
        </div>
    );
};

export default ThreeSumClosest;

