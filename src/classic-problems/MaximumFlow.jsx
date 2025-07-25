import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const MaximumFlow = () => {
    return (
        <div>
            <Paragraph content={"Maximum Flow algorithms compute the maximum flow from source to sink in a flow network using methods like Ford-Fulkerson."} />
            <TableOfContents items={[{id: 'overview', title: 'Problem Overview'}, {id: 'approach', title: 'Solution Approach'}]}/>
            <section id="overview"><Heading heading={"Problem Overview"}/><Paragraph content={"This section will contain the problem description and examples."} /></section>
            <section id="approach"><Heading heading={"Solution Approach"}/><Paragraph content={"This section will contain the solution methodology and complexity analysis."} /></section>
        </div>
    );
};

export default MaximumFlow;
