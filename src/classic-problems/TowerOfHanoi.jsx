import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const TowerOfHanoi = () => {
    return (
        <div>
            <Paragraph content={"The Tower of Hanoi is a classic recursive problem where you must move disks between three rods following specific rules."} />
            
            <Paragraph content={"Rules: You can only move one disk at a time, and you can never place a larger disk on top of a smaller one."} />

            <TableOfContents items={[
                {id: 'problem-statement', title: 'Problem Statement'},
                {id: 'recursive-approach', title: 'Recursive Approach'},
                {id: 'complexity-analysis', title: 'Complexity Analysis'},
            ]}/>

            <section id="problem-statement">
                <Heading heading={"Problem Statement"}/>
                <Paragraph content={"Given n disks of different sizes on rod A, move all disks to rod C using rod B as auxiliary, following the Tower of Hanoi rules."} />
            </section>

            <section id="recursive-approach">
                <Heading heading={"Recursive Approach"}/>
                <Paragraph content={"The key insight is to break down the problem: move n-1 disks to auxiliary rod, move the largest disk to destination, then move n-1 disks from auxiliary to destination."} />
                
                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Move n-1 disks from source to auxiliary rod",
                            "Move the largest disk from source to destination rod", 
                            "Move n-1 disks from auxiliary to destination rod"
                        ]}
                        type={"ol"}/>
            </section>

            <section id="complexity-analysis">
                <Heading heading={"Complexity Analysis"}/>
                <Bullet heading={"Time / Space Complexity"} bold
                        items={[
                            "Time Complexity: O(2^n) - each disk doubles the number of moves",
                            "Space Complexity: O(n) - recursion stack depth"
                        ]}/>
            </section>
        </div>
    );
};

export default TowerOfHanoi;
