// Components
import Bullet from "../components/Bullet";
import Paragraph from "../components/Paragraph";
import ExampleList from "../components/ExampleList.jsx";
import ConstraintsBullet from "../components/ConstraintsBullet.jsx";
import References from "../components/References.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import Image from "../components/Image.jsx";

// Visualizers
import ValidParenthesesStackVisualizer from "../visualizer/problem/valid-parentheses/ValidParenthesesStackVisualizer.jsx";

// Assets
import {questions} from "../assets/data/references.js";
import {solutions} from "../assets/data/solutions.js";
import {imagesProblem} from "../assets/data/images.js";
const ValidParentheses = () => {

    const examples = [
        {
            input: 's = "( )"',
            output: 'true'
        },
        {
            input: 's = "( )[ ]{ }"',
            output: 'true'
        },
        {
            input: 's = "( ]"',
            output: 'false'
        },

        {
            input: 's = "( [ ] )"',
            output: 'true'
        },
    ];

    return (
        <div>
            <Paragraph content={"Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."} />

            <Bullet heading={"An input string is valid if:"} type="ol" items={[
                "Open brackets must be closed by the same type of brackets.",
                "Open brackets must be closed in the correct order.",
                "Every close bracket has a corresponding open bracket of the same type."]} />

            <ExampleList examples={examples} />

            <ConstraintsBullet
                constraints={[
                    { text: '1 <= s.length <= 10^4', type: 'math' },
                    { text: 's consists of parentheses only "( )[ ]{ }"', type: 'text' },
                ]}
            />

            <section id="valid-parentheses-stack">

                <Image imageURL={imagesProblem["Valid Parentheses"]["image 1"]}/>
                <Image imageURL={imagesProblem["Valid Parentheses"]["image 2"]}/>
                <Image imageURL={imagesProblem["Valid Parentheses"]["image 3"]}/>
                <Image imageURL={imagesProblem["Valid Parentheses"]["image 4"]}/>
                <Image imageURL={imagesProblem["Valid Parentheses"]["image 5"]}/>
                <Image imageURL={imagesProblem["Valid Parentheses"]["image 6"]}/>
                <Image imageURL={imagesProblem["Valid Parentheses"]["image 7"]}/>

                <CodeBlock language={"javascript"} code={solutions.valid_parentheses.stack.javascript}/>

                <ValidParenthesesStackVisualizer />
            </section>

             <References references={questions.valid_parentheses}/>
        </div>
    );
};

export default ValidParentheses;