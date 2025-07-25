import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const JobScheduling = () => {
    return (
        <div>
            <Paragraph content={"Job Scheduling involves assigning jobs to machines to optimize total processing time and resource utilization."} />
            <TableOfContents items={[{id: 'overview', title: 'Problem Overview'}, {id: 'approach', title: 'Solution Approach'}]}/>
            <section id="overview"><Heading heading={"Problem Overview"}/><Paragraph content={"This section will contain the problem description and examples."} /></section>
            <section id="approach"><Heading heading={"Solution Approach"}/><Paragraph content={"This section will contain the solution methodology and complexity analysis."} /></section>
        </div>
    );
};

export default JobScheduling;
