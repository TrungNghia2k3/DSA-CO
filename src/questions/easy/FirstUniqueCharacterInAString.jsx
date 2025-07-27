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
import FirstUniqueCharQueueFrequencyArrayVisualizer from "../../visualizer/problem/first-unique-character-in-a-string/FirstUniqueCharQueueFrequencyArrayVisualizer.jsx";
import FirstUniqueCharBruteForceVisualizer from "../../visualizer/problem/first-unique-character-in-a-string/FirstUniqueCharBruteForceVisualizer.jsx";
import FirstUniqueCharHashMapVisualizer from "../../visualizer/problem/first-unique-character-in-a-string/FirstUniqueCharHashMapVisualizer.jsx";
import FirstUniqueCharIterationVisualizer from "../../visualizer/problem/first-unique-character-in-a-string/FirstUniqueCharIterationVisualizer.jsx";

// Solutions
import { solutions } from "../../assets/data/solutions.js";
import { questions } from "../../assets/data/references.js";

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
                {id: 'first-unique-char-brute-force-solution', title: 'Brute Force Solution'},
                {id: 'first-unique-char-hash-map-solution', title: 'Hash Map Solution'},
                {id: 'first-unique-char-iteration-solution', title: 'Iteration Solution'},
                {id: 'first-unique-char-queue-solution', title: 'Queue & Frequency Array Solution'},
            ]}/>

            <section id="first-unique-char-brute-force-solution">
                <Heading heading={"Brute Force Solution"}/>

                <Paragraph
                    content={"The brute force approach checks each character against every other character in the string to determine if it's unique. For each position i, we compare the character at position i with all other characters in the string."}/>

                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "For each character at index i:",
                            "• Compare it with every other character at index j (where j ≠ i)",
                            "• If any duplicate is found, mark as not unique and move to next character",
                            "• If no duplicate found, return index i",
                            "If no unique character exists, return -1"
                        ]}
                        type={"ol"}/>

                <CodeBlock language={"javascript"} code={solutions.first_unique_character_in_a_string.brute_force.javascript}/>

                <FirstUniqueCharBruteForceVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(n²), where n is the length of the string. For each character, we potentially check all other characters.",
                            "Space Complexity: O(1), as we only use a constant amount of extra space."
                        ]}/>
            </section>

            <section id="first-unique-char-hash-map-solution">
                <Heading heading={"Hash Map Solution"}/>

                <Paragraph
                    content={"The hash map approach uses a two-pass solution. First, we count the frequency of each character using a hash map. Then, we iterate through the string again to find the first character with a frequency of 1."}/>

                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "First pass: Count frequency of each character using a hash map",
                            "Second pass: Iterate through the string",
                            "• For each character, check if its frequency is 1",
                            "• Return the index of the first character with frequency 1",
                            "If no unique character found, return -1"
                        ]}
                        type={"ol"}/>

                <CodeBlock language={"javascript"} code={solutions.first_unique_character_in_a_string.hash_map.javascript}/>

                <FirstUniqueCharHashMapVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(n), where n is the length of the string. We make two passes through the string.",
                            "Space Complexity: O(1), as the hash map stores at most 26 characters (lowercase English letters)."
                        ]}/>
            </section>

            <section id="first-unique-char-iteration-solution">
                <Heading heading={"Iteration Solution"}/>

                <Paragraph
                    content={"This clever approach iterates through all possible lowercase letters (a-z) and for each letter, finds its first and last occurrence in the string. If they are the same, the character is unique, and we track the minimum index among all unique characters."}/>

                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Initialize result to string length (worst case)",
                            "For each letter from 'a' to 'z':",
                            "• Find first occurrence using indexOf()",
                            "• Find last occurrence using lastIndexOf()",
                            "• If first === last, character appears exactly once (unique)",
                            "• Update minimum index if this unique character is earlier",
                            "Return minimum index found, or -1 if no unique character"
                        ]}
                        type={"ol"}/>

                <CodeBlock language={"javascript"} code={solutions.first_unique_character_in_a_string.iteration.javascript}/>

                <FirstUniqueCharIterationVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(26n) = O(n), where n is the length of the string. We check 26 letters, and for each letter we scan the string twice.",
                            "Space Complexity: O(1), as we only use a constant amount of extra space."
                        ]}/>
            </section>

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

                <FirstUniqueCharQueueFrequencyArrayVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(n), where n is the length of the string. Each character is processed once, and queue operations are amortized O(1).",
                            "Space Complexity: O(1), as we use a fixed-size frequency array (26 elements) and the queue contains at most 26 unique characters."
                        ]}/>
            </section>

            <References references={questions.first_unique_character_in_a_string} />
        </div>
    );
};

export default FirstUniqueCharacterInAString;
