// Componets
import Heading from "../components/Heading.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Image from "../components/Image.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import References from "../components/References.jsx";

// Visualizers
import BacktrackingVisualizer from "../visualizer/algorithm/backtracking/BacktrackingVisualizer.jsx";

// Assets
import { images } from "../assets/data/images.js";
import { algorithms } from "../assets/data/references.js";

const BackTracking = () => {
    return (
        <div>
            <Paragraph
                content={"Backtracking algorithms are like problem-solving strategies that help explore different options to find the best solution. They work by trying out different paths and if one doesn't work, they backtrack and try another until they find the right one. It's like solving a puzzle by testing different pieces until they fit together perfectly."} />

            <Image imageURL={images.backtracking["image 0"]} caption="Backtracking"
                link="https://www.geeksforgeeks.org/dsa/backtracking-algorithms/" />

            <TableOfContents items={[
                { id: 'introduction', title: 'Introduction' },
                { id: 'how-does-backtracking-work', title: 'How Does Backtracking Work?' },
                { id: 'when-to-use-backtracking', title: 'When to Use Backtracking?' },
                { id: 'applications', title: 'Applications of Backtracking Algorithm' }
            ]} />

            <section id="introduction">
                <Heading heading={"What is Backtracking Algorithm?"} />

                <Paragraph
                    content={"Backtracking is a problem-solving algorithmic technique that involves finding a solution incrementally by trying different options and undoing them if they lead to a dead end."} />

                <Paragraph
                    content={"It is commonly used in situations where you need to explore multiple possibilities to solve a problem, like searching for a path in a maze or solving puzzles like Sudoku. When a dead end is reached, the algorithm backtracks to the previous decision point and explores a different path until a solution is found or all possibilities have been exhausted."} />
            </section>

            <section id="how-does-backtracking-work">
                <Heading heading={"How Does a Backtracking Algorithm Work?"} />
                <Paragraph
                    content={"A backtracking algorithm works by recursively exploring all possible solutions to a problem. It starts by choosing an initial solution, and then it explores all possible extensions of that solution. If an extension leads to a solution, the algorithm returns that solution. If an extension does not lead to a solution, the algorithm backtracks to the previous solution and tries a different extension."} />

                <Bullet
                    heading={"The following is a general outline of how a backtracking algorithm works:"}
                    items={[
                        "Choose an initial solution.",
                        "Explore all possible extensions of the current solution.",
                        "If an extension leads to a solution, return that solution.",
                        "If an extension does not lead to a solution, backtrack to the previous solution and try a different extension.",
                        "Repeat steps 2-4 until all possible solutions have been explored."
                    ]} type="ol" />
            </section>


            <section id="example">
                <Heading heading={"Example of Backtracking Algorithm"} />
                <Paragraph
                    content={"Example: Finding the shortest path through a maze"} />

                <Paragraph
                    content={"Input: A maze represented as a 2D array, where 0 represents an open space and 1 represents a wall."} />

                <Bullet
                    heading={"Algorithm:"} bold
                    items={[
                        "Start at the starting point.",
                        "For each of the four possible directions (up, down, left, right), try moving in that direction.",
                        "If moving in that direction leads to the ending point, return the path taken.",
                        "If moving in that direction does not lead to the ending point, backtrack to the previous position and try a different direction.",
                        "Repeat steps 2-4 until the ending point is reached or all possible paths have been explored."
                    ]} type="ol" />

                <BacktrackingVisualizer />

            </section>

            <section id="when-to-use-backtracking">
                <Heading heading={"When to Use Backtracking?"} />
                <Bullet
                    heading={"Backtracking algorithms are best used to solve problems that have the following characteristics:"}
                    items={[
                        "There are multiple possible solutions to the problem.",
                        "The problem can be broken down into smaller subproblems.",
                        "The subproblems can be solved independently."
                    ]} />
            </section>

            <section id="applications">
                <Heading heading={"Applications of Backtracking Algorithm"} />
                <Bullet
                    heading={"Backtracking algorithms are used in a wide variety of applications, including:"}
                    items={[
                        "Solving puzzles like Sudoku and crosswords.",
                        "Finding paths in mazes or graphs.",
                        "Generating permutations and combinations.",
                        "Solving optimization problems."
                    ]} />
            </section>

            <References references={algorithms.backtracking} />
        </div>
    );
};

export default BackTracking;