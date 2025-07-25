import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const TravellingSalesmanProblem = () => {
    return (
        <div>
            <Paragraph content={"The Travelling Salesman Problem (TSP) is a classic NP-hard optimization problem that seeks the shortest route visiting each city exactly once and returning to the start."} />
            
            <Paragraph content={"This problem appears in logistics, manufacturing, and circuit design, making it one of the most studied problems in computer science."} />

            <TableOfContents items={[
                {id: 'problem-formulation', title: 'Problem Formulation'},
                {id: 'solution-approaches', title: 'Solution Approaches'},
                {id: 'dynamic-programming', title: 'Dynamic Programming with Bitmasks'},
            ]}/>

            <section id="problem-formulation">
                <Heading heading={"Problem Formulation"}/>
                <Paragraph content={"Given a complete graph with weighted edges representing distances between cities, find the minimum-weight Hamiltonian cycle."} />
                
                <Bullet heading={"Problem Characteristics:"} bold
                        items={[
                            "NP-hard: No known polynomial-time exact algorithm",
                            "Exponential solution space: (n-1)!/2 possible tours",
                            "Applications: logistics, manufacturing, DNA sequencing"
                        ]}/>
            </section>

            <section id="solution-approaches">
                <Heading heading={"Solution Approaches"}/>
                <Bullet heading={"Common Approaches:"} bold
                        items={[
                            "Brute Force: Try all permutations - O(n!)",
                            "Dynamic Programming: Use bitmasks - O(n²2ⁿ)",
                            "Heuristics: Nearest neighbor, genetic algorithms",
                            "Approximation: Christofides algorithm (1.5-approximation)"
                        ]}/>
            </section>

            <section id="dynamic-programming">
                <Heading heading={"Dynamic Programming with Bitmasks"}/>
                <Paragraph content={"The Held-Karp algorithm uses dynamic programming with bitmasks to solve TSP optimally in O(n²2ⁿ) time."} />
                
                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "State: dp[mask][i] = minimum cost to visit cities in mask, ending at city i",
                            "Base case: dp[1][0] = 0 (start at city 0)",
                            "Transition: Try all possible previous cities",
                            "Answer: Minimum of dp[full_mask][i] + cost[i][0] for all i"
                        ]}
                        type={"ol"}/>
            </section>
        </div>
    );
};

export default TravellingSalesmanProblem;
