// Components
import Paragraph from "../components/Paragraph.jsx";
import ExampleList from "../components/ExampleList.jsx";
import ConstraintsBullet from "../components/ConstraintsBullet.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import Heading from "../components/Heading.jsx";
import CodeBlock from "../components/CodeBlock.jsx";

// Visualizers
import NumberOfRecentCallsVisualizer from "../visualizer/problem/number-of-recent-calls/NumberOfRecentCallsVisualizer.jsx";

// Solutions
import { solutions } from "../assets/data/solutions.js";

const NumberOfRecentCalls = () => {

    // Example data for the Number of Recent Calls problem
    const examples = [
        {
            input: `["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]`,
            output: '[null, 1, 2, 3, 3]',
            explanation: [
                `RecentCounter recentCounter = new RecentCounter();`,
                `recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1`,
                `recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2`,
                `recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3`,
                `recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3`
            ].join('\n')
        }
    ];

    // Constraints can be added here if needed
    const constraints = [
        { text: '1 <= t <= 10^9', type: 'math' },
        { text: 'Each test case will call ping with strictly increasing values of t.', type: 'text' },
        { text: 'At most 10^4 calls will be made to ping.', type: 'math' }
    ];

    return (
        <div>
            <Paragraph content={"You have a RecentCounter class which counts the number of recent requests within a certain time frame."} />

            <Bullet
                heading={"Implement the RecentCounter class:"}
                items={["RecentCounter() Initializes the counter with zero recent requests.",
                    "int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t]."]} />

            <Paragraph content={"It is guaranteed that every call to ping uses a strictly larger value of t than the previous call."} />

            <ExampleList examples={examples} />

            <ConstraintsBullet
                constraints={constraints} />

            <TableOfContents items={[
                {id: 'recent-counter-queue-solution', title: 'Queue Solution'},
            ]}/>

            <section id="recent-counter-queue-solution">
                <Heading heading={"Queue Solution"}/>

                <Paragraph
                    content={"This problem is perfectly suited for a queue data structure with a sliding window approach. The key insight is that we need to maintain only the requests that fall within the current time window [t - 3000, t]."}/>

                <Paragraph
                    content={"Since the ping times are guaranteed to be strictly increasing, we can use a simple queue where we add new requests to the back and remove outdated requests from the front. This gives us an efficient solution with amortized O(1) time complexity per ping."}/>

                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Initialize an empty queue in the constructor",
                            "For each ping(t) call:",
                            "• Add the new timestamp t to the back of the queue",
                            "• Remove all timestamps from the front that are < (t - 3000)",
                            "• Return the current size of the queue",
                            "The queue size represents requests in range [t - 3000, t]"
                        ]}
                        type={"ol"}/>

                <Paragraph
                    content={"The sliding window nature of this problem means that as time progresses, older requests naturally fall out of the relevant time range and need to be removed. The queue efficiently maintains this sliding window."}/>

                <CodeBlock language={"javascript"} code={solutions.number_of_recent_calls.queue.javascript}/>

                <NumberOfRecentCallsVisualizer/>

                <Bullet heading={"Time / Space Complexity Analysis"} bold
                        items={[
                            "Time Complexity: O(1) amortized per ping. Each request is added once and removed at most once from the queue.",
                            "Space Complexity: O(W), where W is the maximum number of requests that can occur within the 3000ms window. In the worst case, this is O(min(N, 3000)) where N is the total number of pings."
                        ]}/>
            </section>

        </div>
    );
};

export default NumberOfRecentCalls;