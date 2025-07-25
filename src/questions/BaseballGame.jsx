// Components
import Paragraph from "../components/Paragraph.jsx";
import ExampleList from "../components/ExampleList.jsx";
import ConstraintsBullet from "../components/ConstraintsBullet.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import Heading from "../components/Heading.jsx";
import CodeBlock from "../components/CodeBlock.jsx";

// Visualizers
import BaseballGameVisualizer from "../visualizer/problem/baseball-game/BaseballGameVisualizer.jsx";

// Solutions
import { solutions } from "../assets/data/solutions.js";

const BaseballGame = () => {

    // Example data for the Baseball Game problem
    const examples = [
        {
            input: `ops = ["5","2","C","D","+"]`,
            output: '30',
            explanation: [
                `"5" - Add 5 to the record, record is now [5].`,
                `"2" - Add 2 to the record, record is now [5, 2].`,
                `"C" - Invalidate and remove the previous score, record is now [5].`,
                `"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].`,
                `"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].`,
                `The total sum is 5 + 10 + 15 = 30.`
            ].join('\n')
        },
        {
            input: `ops = ["5","-2","4","C","D","9","+","+"]`,
            output: '27',
            explanation: [
                `"5" - Add 5 to the record, record is now [5].`,
                `"-2" - Add -2 to the record, record is now [5, -2].`,
                `"4" - Add 4 to the record, record is now [5, -2, 4].`,
                `"C" - Invalidate and remove the previous score, record is now [5, -2].`,
                `"D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].`,
                `"9" - Add 9 to the record, record is now [5, -2, -4, 9].`,
                `"+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].`,
                `"+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].`,
                `The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.`
            ].join('\n')
        },
        {
            input: `ops = ["1","C"]`,
            output: '0',
            explanation: [
                `"1" - Add 1 to the record, record is now [1].`,
                `"C" - Invalidate and remove the previous score, record is now [].`,
                `Since the record is empty, the total sum is 0.`
            ].join('\n')
        }
    ];

    const constraints = [
        { text: '1 <= ops.length <= 1000', type: 'math' },
        { text: 'operations[i] is "C", "D", "+", or a string representing an integer in the range [-3 * 10^4, 3 * 10^4].', type: 'math' },
        { text: 'For operation "+", there will always be at least two previous scores on the record.', type: 'text' },
        { text: 'For operations "C" and "D", there will always be at least one previous score on the record.', type: 'text' }
    ];

    return (
        <div>
            <Paragraph content={"You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record."} />

            <Bullet
                heading={"You are given a list of strings operations, where operations[i] is the ith operation you must apply to the record and is one of the following:"}
                items={["An integer x - Record a new score of x.",
                    "'+' - Record a new score that is the sum of the two previous scores.",
                    "'D' - Record a new score that is double the previous score.",
                    "'C' - Invalidate the previous score."]} />

            <Paragraph content={"Return the sum of all the scores on the record after applying all the operations."} />

            <Paragraph content={"The test cases are generated such that the answer and all operations are valid."} />

            <ExampleList examples={examples} />
            <ConstraintsBullet constraints={constraints} />

            <TableOfContents items={[
                {id: 'baseball-game-stack-solution', title: 'Stack Solution'},
            ]}/>

            <section id="baseball-game-stack-solution">
                <Heading heading={"Stack Solution"}/>

                <Paragraph
                    content={"This problem is perfectly suited for a stack data structure. We can process each operation sequentially, using the stack to keep track of valid scores and maintaining a running sum for efficiency."}/>

                <Paragraph
                    content={"The key insight is to maintain the sum incrementally rather than calculating it at the end. When we add a score, we add it to both the stack and the sum. When we remove a score (cancel operation), we subtract it from the sum. This gives us O(1) time complexity for the final result."}/>

                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Initialize an empty stack and sum = 0",
                            "For each operation:",
                            "• If it's a number: push to stack and add to sum",
                            "• If it's 'C': pop from stack and subtract from sum", 
                            "• If it's 'D': double the last score, push result, add to sum",
                            "• If it's '+': sum last two scores, push result, add to sum",
                            "Return the final sum"
                        ]}
                        type={"ol"}/>

                <CodeBlock language={"javascript"} code={solutions.baseball_game.stack.javascript}/>

                <BaseballGameVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(n), where n is the number of operations. Each operation is processed exactly once.",
                            "Space Complexity: O(n), in the worst case the stack could contain all operations if they are all numbers."
                        ]}/>
            </section>

        </div>
    );
};

export default BaseballGame;