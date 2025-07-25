import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const SudokuSolver = () => {
    return (
        <div>
            <Paragraph content={"Sudoku Solver is a classic constraint satisfaction problem that uses backtracking to fill a 9×9 grid with digits 1-9."} />
            
            <Paragraph content={"Each row, column, and 3×3 subgrid must contain all digits from 1 to 9 exactly once."} />

            <TableOfContents items={[
                {id: 'constraint-rules', title: 'Constraint Rules'},
                {id: 'backtracking-solution', title: 'Backtracking Solution'},
                {id: 'optimization-strategies', title: 'Optimization Strategies'},
            ]}/>

            <section id="constraint-rules">
                <Heading heading={"Constraint Rules"}/>
                <Bullet heading={"Sudoku Constraints:"} bold
                        items={[
                            "Row constraint: Each row must contain digits 1-9 exactly once",
                            "Column constraint: Each column must contain digits 1-9 exactly once",
                            "Box constraint: Each 3×3 subgrid must contain digits 1-9 exactly once"
                        ]}/>
            </section>

            <section id="backtracking-solution">
                <Heading heading={"Backtracking Solution"}/>
                <Paragraph content={"The backtracking approach systematically tries different digit placements and backtracks when constraints are violated."} />
                
                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Find the next empty cell in the grid",
                            "Try placing digits 1-9 in the empty cell",
                            "Check if placement violates any constraints",
                            "If valid, recursively solve the remaining grid",
                            "If no valid digit works, backtrack to previous cell"
                        ]}
                        type={"ol"}/>
            </section>

            <section id="optimization-strategies">
                <Heading heading={"Optimization Strategies"}/>
                <Bullet heading={"Performance Improvements"} bold
                        items={[
                            "Most Constrained Variable: Choose cell with fewest possible values",
                            "Constraint Propagation: Update possibilities when placing digits",
                            "Forward Checking: Eliminate impossible values early"
                        ]}/>
            </section>
        </div>
    );
};

export default SudokuSolver;
