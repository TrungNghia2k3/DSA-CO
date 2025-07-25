import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const PartitionProblem = () => {
    return (
        <div>
            <Paragraph content={"The Partition Problem involves dividing an array into two subsets with equal sums, a classic NP-complete problem."} />
            <TableOfContents items={[{id: 'overview', title: 'Problem Overview'}, {id: 'approach', title: 'Solution Approach'}]}/>
            <section id="overview"><Heading heading={"Problem Overview"}/><Paragraph content={"This section will contain the problem description and examples."} /></section>
            <section id="approach"><Heading heading={"Solution Approach"}/><Paragraph content={"This section will contain the solution methodology and complexity analysis."} /></section>
        </div>
    );
};

export default PartitionProblem;
