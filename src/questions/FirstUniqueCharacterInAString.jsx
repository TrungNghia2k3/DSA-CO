// Components
import Paragraph from "../components/Paragraph.jsx";
import ExampleList from "../components/ExampleList.jsx";
import ConstraintsBullet from "../components/ConstraintsBullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import Heading from "../components/Heading.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import Bullet from "../components/Bullet.jsx";

// Visualizers
import FirstUniqueCharVisualizer from "../visualizer/problem/first-unique-character-in-a-string/FirstUniqueCharVisualizer.jsx";

// Solutions
import { solutions } from "../assets/data/solutions.js";

const FirstUniqueCharacterInAString = () => {

    const examples = [
        {
            input: 's = "leetcode"',
            output: '0',
            explanation: `The character 'l' at index 0 is the first character that does not occur at any other index.`
        },
        {
            input: 's = "loveleetcode"',
            output: '2',
            explanation: `The character 'v' at index 2 is the first character that does not occur at any other index.`
        },
        {
            input: 's = "aabb"',
            output: '-1',
            explanation: `There are no non-repeating characters, so we return -1.`
        }
    ];

    // Constraints can be added here if needed
    const constraints = [
        { text: '1 <= s.length <= 10^5', type: 'math' },
        { text: 's consists of only lowercase English letters.', type: 'text' }
    ];

    return (
        <div>
            <Paragraph content={"Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1."} />
            <ExampleList examples={examples} />
            <ConstraintsBullet constraints={constraints} />

            <TableOfContents items={[
                {id: 'first-unique-char-queue-solution', title: 'Queue & Frequency Array Solution'},
            ]}/>

            <section id="first-unique-char-queue-solution">
                <Heading heading={"Queue & Frequency Array Solution"}/>

                <Paragraph
                    content={"This problem can be efficiently solved using a combination of a frequency array and a queue. The key insight is to maintain a queue of potential first unique characters while using a frequency array to track character counts."}/>

                <Paragraph
                    content={"As we process each character, we add it to both the frequency array and the queue. However, we continuously clean the queue by removing characters that have become repeated. This ensures the front of the queue always contains the first unique character (if any exists)."}/>

                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Initialize a frequency array for 26 lowercase letters and an empty queue",
                            "For each character in the string:",
                            "• Increment its frequency count",
                            "• Add [character, index] to the queue",
                            "• Remove repeated characters from the front of the queue",
                            "• The front of the queue now contains the current first unique character",
                            "Return the index from the front of the queue, or -1 if queue is empty"
                        ]}
                        type={"ol"}/>

                <Paragraph
                    content={"This approach is more efficient than naive solutions because it processes the string only once and maintains the result incrementally, avoiding the need to scan the entire string multiple times."}/>

                <CodeBlock language={"javascript"} code={solutions.first_unique_character_in_a_string.queue_frequency.javascript}/>

                <FirstUniqueCharVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(n), where n is the length of the string. Each character is processed once, and queue operations are amortized O(1).",
                            "Space Complexity: O(1), as we use a fixed-size frequency array (26 elements) and the queue contains at most 26 unique characters."
                        ]}/>
            </section>

        </div>
    );
};

export default FirstUniqueCharacterInAString;