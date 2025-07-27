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
import BackspaceStackVisualizer from "../../visualizer/problem/backspace-string-compare/BackspaceStackVisualizer.jsx";
import BackspaceTwoPointerVisualizer from "../../visualizer/problem/backspace-string-compare/BackspaceTwoPointerVisualizer.jsx";

// Solutions
import { solutions } from "../../assets/data/solutions.js";
import { questions } from "../../assets/data/references.js";

const BackspaceStringCompare = () => {

    const examples = [
        {
            input: `s = "ab#c", t = "ad#c"`,
            output: 'true',
            explanation: `Both s and t become "ac".`
        },
        {
            input: `s = "ab##", t = "c#d#"`,
            output: 'true',
            explanation: ` Both s and t become "".`
        },
        {
            input: `s = "a#c", t = "b"`,
            output: 'false',
            explanation: `s becomes "c" while t becomes "b".`
        }
    ];

    const constraints = [
        { text: '1 <= s.length, t.length <= 200', type: 'math' },
        { text: 's and t only contain lowercase letters and `#` characters.', type: 'text' }
    ];

    return (
        <div>
            <Paragraph content={"Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character."} />
            <Paragraph content={"Note that after backspacing an empty text, the text will continue empty."} />

            <ExampleList examples={examples} />

            <ConstraintsBullet constraints={constraints} />

            <TableOfContents items={[
                {id: 'backspace-stack-approach', title: 'Stack Approach'},
                {id: 'backspace-two-pointer', title: 'Two Pointers Approach'},
            ]}/>

            <section id="backspace-stack-approach">
                <Heading heading={"Approach 1: Stack"}/>

                <Paragraph
                    content={"The most intuitive approach is to simulate the typing process using stacks. For each string, we process characters one by one: if it's a regular character, we add it to the stack; if it's a backspace ('#'), we remove the top character from the stack (if the stack is not empty)."}/>

                <Paragraph
                    content={"After processing both strings, we compare the final stacks. If they contain the same characters in the same order, the strings are equal."}/>

                <CodeBlock language={"javascript"} code={solutions.backspace_string_compare.stack.javascript}/>

                <BackspaceStackVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(m + n), where m and n are the lengths of strings s and t respectively. We process each character exactly once.",
                            "Space Complexity: O(m + n), in the worst case both stacks could contain all characters from their respective strings."
                        ]}/>
            </section>

            <section id="backspace-two-pointer">
                <Heading heading={"Approach 2: Two Pointers"}/>

                <Paragraph
                    content={"Can we solve this problem without using extra space? The key insight is to process the strings from right to left. When we encounter a backspace, we know exactly how many characters to skip, allowing us to find the next valid character without storing intermediate results."}/>

                <Paragraph
                    content={"We use two pointers starting from the end of each string. For each string, we find the next valid character by properly handling backspaces, then compare these characters. If all valid characters match and both strings are exhausted simultaneously, they are equal."}/>

                <CodeBlock language={"javascript"} code={solutions.backspace_string_compare.two_pointers.javascript}/>

                <BackspaceTwoPointerVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(m + n), where m and n are the lengths of strings s and t respectively. Each character is processed at most once.",
                            "Space Complexity: O(1), we only use a constant amount of extra space for variables."
                        ]}/>
            </section>

            <References references={questions.backspace_string_compare} />
        </div>
    );
};

export default BackspaceStringCompare;
