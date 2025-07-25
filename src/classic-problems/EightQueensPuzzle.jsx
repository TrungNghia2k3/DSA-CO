import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const EightQueensPuzzle = () => {
    return (
        <div>
            <Paragraph content={"The Eight Queens Puzzle is a classic backtracking problem where you must place 8 queens on a chessboard such that none attack each other."} />
            
            <Paragraph content={"A queen can attack any piece in the same row, column, or diagonal. The challenge is to find valid placements for all 8 queens."} />

            <TableOfContents items={[
                {id: 'problem-statement', title: 'Problem Statement'},
                {id: 'backtracking-approach', title: 'Backtracking Approach'},
                {id: 'optimization-techniques', title: 'Optimization Techniques'},
            ]}/>

            <section id="problem-statement">
                <Heading heading={"Problem Statement"}/>
                <Paragraph content={"Place 8 queens on an 8×8 chessboard so that no two queens attack each other. Find all possible solutions or determine if a solution exists."} />
            </section>

            <section id="backtracking-approach">
                <Heading heading={"Backtracking Approach"}/>
                <Paragraph content={"Use backtracking to systematically try placing queens and backtrack when conflicts arise. This explores the solution space efficiently."} />
                
                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Try placing a queen in each column of the current row",
                            "Check if the placement conflicts with previously placed queens",
                            "If valid, recursively solve for the next row",
                            "If invalid or no solution found, backtrack and try next position"
                        ]}
                        type={"ol"}/>
            </section>

            <section id="optimization-techniques">
                <Heading heading={"Optimization Techniques"}/>
                <Bullet heading={"Performance Optimizations"} bold
                        items={[
                            "Use arrays to track attacked rows, columns, and diagonals",
                            "Bit manipulation for faster conflict checking",
                            "Symmetry reduction to eliminate duplicate solutions"
                        ]}/>
            </section>
        </div>
    );
};

export default EightQueensPuzzle;
