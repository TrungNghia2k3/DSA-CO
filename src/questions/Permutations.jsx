// Components
import Bullet from "../components/Bullet.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import Heading from "../components/Heading.jsx";
import Paragraph from "../components/Paragraph.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

// Visualizers
import PermutationsBacktrackingVisualizer from "../visualizer/problem/permutations/PermutationsBacktrackingVisualizer.jsx";
import PermutationsRecursionVisualizer from "../visualizer/problem/permutations/PermutationsRecursionVisualizer.jsx";
import PermutationsIterationVisualizer from "../visualizer/problem/permutations/PermutationsIterationVisualizer.jsx";

// Assets
import { solutions } from "../assets/data/solutions.js";

const Permutations = () => {
    return (
        <div>
            <Paragraph
                content={"Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order."} />

            <TableOfContents items={[
                { id: 'problem-analysis', title: 'Problem Analysis' },
                { id: 'approach-1-recursion', title: 'Approach 1: Recursion' },
                { id: 'approach-2-iteration', title: 'Approach 2: Iteration' },
                { id: 'approach-3-backtracking', title: 'Approach 3: Backtracking' },
                { id: 'examples', title: 'Examples' },
                { id: 'constraints', title: 'Constraints' }
            ]} />

            <section id="problem-analysis">
                <Heading heading={"Problem Analysis"} />
                
                <Paragraph content={"The Permutations problem asks us to generate all possible arrangements of a given array of distinct integers. This is a classic combinatorial problem that demonstrates important algorithmic techniques like backtracking, recursion, and systematic enumeration."} />

                <Bullet
                    heading={"Key Concepts:"}
                    items={[
                        "Permutation: An arrangement of elements where order matters",
                        "For n distinct elements, there are n! total permutations",
                        "Each permutation contains all original elements exactly once",
                        "Different approaches: recursive, iterative, and backtracking",
                        "Important for understanding combinatorial algorithms"
                    ]} />

                <Bullet
                    heading={"Problem Characteristics:"}
                    items={[
                        "Input contains distinct integers (no duplicates)",
                        "Need to generate ALL possible permutations",
                        "Order of output permutations doesn't matter",
                        "Can use various algorithmic paradigms",
                        "Excellent example for backtracking technique"
                    ]} />

                <Bullet
                    heading={"Mathematical Foundation:"}
                    items={[
                        "Total permutations = n! where n is array length",
                        "Each position has decreasing choices: n, n-1, n-2, ..., 1",
                        "Time complexity is inherently factorial",
                        "Space complexity depends on implementation approach"
                    ]} />
            </section>

            <section id="approach-1-recursion">
                <Heading heading={"Approach 1: Recursion"} />
                
                <Paragraph content={"This approach uses recursion with in-place swapping to generate permutations. It builds permutations by fixing each element at each position through swapping."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Use a recursive function with current index parameter",
                        "Base case: when index reaches array length, add current array to result",
                        "For each position from current index to end:",
                        "  • Swap current index with position i",
                        "  • Recursively generate permutations for next index",
                        "  • Backtrack by swapping elements back",
                        "This generates all permutations by systematically trying each element at each position"
                    ]} type="ol" />

                <Bullet
                    heading={"Why This Works:"}
                    items={[
                        "Each recursive call fixes one more element in its final position",
                        "Swapping explores all possibilities for each position",
                        "Backtracking ensures we don't lose the original array state",
                        "Natural recursive structure mirrors permutation definition"
                    ]} />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n! × n) - n! permutations, O(n) to copy each",
                        "Space Complexity: O(n) - recursion depth (excluding output space)"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.permutations.recursion.javascript} 
                />
                
                <PermutationsRecursionVisualizer />
            </section>

            <section id="approach-2-iteration">
                <Heading heading={"Approach 2: Iteration"} />
                
                <Paragraph content={"This approach builds permutations iteratively by adding one element at a time to existing partial permutations. It's more intuitive for those who prefer iterative solutions."} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Start with empty result array",
                        "For each element in the input array:",
                        "  • Take all current permutations",
                        "  • For each permutation, insert current element at every possible position",
                        "  • Create new permutations and update result",
                        "Continue until all elements are processed",
                        "Result contains all possible permutations"
                    ]} type="ol" />

                <Bullet
                    heading={"Example Walkthrough:"}
                    items={[
                        "Input: [1,2,3]",
                        "Start: [[]]",
                        "Add 1: [[1]]", 
                        "Add 2: [[2,1], [1,2]]",
                        "Add 3: [[3,2,1], [2,3,1], [2,1,3], [3,1,2], [1,3,2], [1,2,3]]"
                    ]} />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n! × n) - n! permutations, O(n) to build each",
                        "Space Complexity: O(n! × n) - storing all permutations during construction"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.permutations.iteration.javascript} 
                />
                
                <PermutationsIterationVisualizer />
            </section>

            <section id="approach-3-backtracking">
                <Heading heading={"Approach 3: Backtracking"} />
                
                <Paragraph content={"Backtracking is the most elegant and widely-used approach for permutation generation. It systematically explores all possibilities while maintaining state efficiently."} />

                <Bullet
                    heading={"Backtracking Principles:"}
                    items={[
                        "Make a choice (add element to current permutation)",
                        "Explore consequences (recurse with updated state)",
                        "Undo the choice (remove element - backtrack)",
                        "Try next possibility (continue loop)",
                        "Systematic exploration ensures all solutions are found"
                    ]} />

                <Bullet
                    heading={"Algorithm Steps:"}
                    items={[
                        "Maintain current permutation path and used elements tracking",
                        "Base case: when path length equals input length, add to result",
                        "For each unused element:",
                        "  • Add element to current path",
                        "  • Mark element as used",
                        "  • Recursively continue building permutation",
                        "  • Remove element from path (backtrack)",
                        "  • Mark element as unused (backtrack)",
                        "This systematically generates all permutations"
                    ]} type="ol" />

                <Bullet
                    heading={"Backtracking Advantages:"}
                    items={[
                        "Clean and intuitive recursive structure",
                        "Efficient space usage (single path maintained)",
                        "Easy to understand and implement",
                        "Generalizes well to related problems (combinations, subsets)",
                        "Natural pruning opportunities for optimization"
                    ]} />

                <Bullet
                    heading={"Time & Space Complexity:"}
                    items={[
                        "Time Complexity: O(n! × n) - generate n! permutations, copy O(n) each",
                        "Space Complexity: O(n) - recursion depth + current path (excluding output)"
                    ]} />

                <CodeBlock 
                    language="javascript" 
                    code={solutions.permutations.backtracking.javascript} 
                />

                <PermutationsBacktrackingVisualizer />

                <Paragraph content={"Backtracking is the optimal approach for permutation generation because it provides the clearest algorithmic structure, efficient space usage, and serves as an excellent foundation for understanding more complex combinatorial problems."} />
            </section>
        </div>
    );
};

export default Permutations;
