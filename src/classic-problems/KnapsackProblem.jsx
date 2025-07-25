import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import Bullet from "../components/Bullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const KnapsackProblem = () => {
    return (
        <div>
            <Paragraph content={"The Knapsack Problem is a classic optimization problem where you must choose items to maximize value within a weight constraint."} />
            
            <Paragraph content={"Given a set of items with weights and values, and a knapsack with limited capacity, determine the most valuable combination of items to include."} />

            <TableOfContents items={[
                {id: 'problem-variants', title: 'Problem Variants'},
                {id: 'dynamic-programming', title: 'Dynamic Programming Solution'},
                {id: 'space-optimization', title: 'Space Optimization'},
            ]}/>

            <section id="problem-variants">
                <Heading heading={"Problem Variants"}/>
                <Bullet heading={"Common Variants:"} bold
                        items={[
                            "0/1 Knapsack: Each item can be taken at most once",
                            "Unbounded Knapsack: Unlimited copies of each item available",
                            "Bounded Knapsack: Limited copies of each item",
                            "Multiple Knapsack: Multiple knapsacks with different capacities"
                        ]}/>
            </section>

            <section id="dynamic-programming">
                <Heading heading={"Dynamic Programming Solution"}/>
                <Paragraph content={"The classic DP approach builds a table where dp[i][w] represents the maximum value achievable using first i items with weight limit w."} />
                
                <Bullet heading={"Algorithm Steps:"} bold
                        items={[
                            "Create a 2D DP table: dp[items][weight]",
                            "For each item and weight combination, choose maximum of:",
                            "• Take current item (if weight allows): value + dp[i-1][w-weight]", 
                            "• Skip current item: dp[i-1][w]",
                            "The answer is dp[n][W] where n=items, W=capacity"
                        ]}
                        type={"ol"}/>
            </section>

            <section id="space-optimization">
                <Heading heading={"Space Optimization"}/>
                <Bullet heading={"Optimization Techniques"} bold
                        items={[
                            "1D DP: Use single array by processing weights in reverse order",
                            "Space Complexity: Reduced from O(nW) to O(W)",
                            "Time Complexity: Remains O(nW) for both approaches"
                        ]}/>
            </section>
        </div>
    );
};

export default KnapsackProblem;
