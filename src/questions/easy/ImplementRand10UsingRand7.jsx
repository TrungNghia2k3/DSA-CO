// Components
import Paragraph from "../../components/Paragraph.jsx";
import ExampleList from "../../components/ExampleList.jsx";
import Bullet from "../../components/Bullet.jsx";
import ConstraintsBullet from "../../components/ConstraintsBullet.jsx";
const ImplementRand10UsingRand7 = () => {
    const examples = [
        {
            input: 'n = 1',
            output: '[2]'
        },
        {
            input: 'n = 2',
            output: '[2,8]'
        },
        {
            input: 'n = 3',
            output: '[3,8,10]'
        }
    ];


    return (
        <div>
            <Paragraph content={"Given the API rand7() that generates a uniform random integer in the range [1, 7], write a function rand10() that generates a uniform random integer in the range [1, 10]. You can only call the API rand7(), and you shouldn't call any other API. Please do not use a language's built-in random API."} />

            <Paragraph content={"Each test case will have one internal argument n, the number of times that your implemented function rand10() will be called while testing. Note that this is not an argument passed to rand10()."} />

            <ExampleList examples={examples} />

            <ConstraintsBullet
                constraints={[
                    { text: '1 <= n <= 10^5', type: 'math' }
                ]}
            />

            <Bullet
                heading={"Follow up:"} bold
                items={["What is the expected value for the number of calls to rand7() function?",
                "Could you minimize the number of calls to rand7()?"]} />
        </div>
    );
}

export default ImplementRand10UsingRand7;
