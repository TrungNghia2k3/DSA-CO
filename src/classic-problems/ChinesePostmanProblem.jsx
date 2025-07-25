import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const ChinesePostmanProblem = () => {
    return (
        <div>
            <Paragraph content={"The Chinese Postman Problem seeks to find the shortest path that covers every edge of a graph at least once."} />
            
            <TableOfContents items={[
                {id: 'overview', title: 'Problem Overview'},
                {id: 'approach', title: 'Solution Approach'},
            ]}/>
            
            <section id="overview">
                <Heading heading={"Problem Overview"}/>
                <Paragraph content={"This section will contain the problem description and examples."} />
            </section>
            
            <section id="approach">
                <Heading heading={"Solution Approach"}/>
                <Paragraph content={"This section will contain the solution methodology and complexity analysis."} />
            </section>
        </div>
    );
};

export default ChinesePostmanProblem;
