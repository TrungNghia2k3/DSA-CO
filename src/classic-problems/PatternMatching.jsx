import Paragraph from "../components/Paragraph.jsx";
import Heading from "../components/Heading.jsx";
import TableOfContents from "../components/TableOfContents.jsx";

const PatternMatching = () => {
    return (
        <div>
            <Paragraph content={"Pattern Matching involves finding substrings in text using efficient algorithms like KMP, Boyer-Moore, and Rabin-Karp."} />
            <TableOfContents items={[{id: 'overview', title: 'Problem Overview'}, {id: 'approach', title: 'Solution Approach'}]}/>
            <section id="overview"><Heading heading={"Problem Overview"}/><Paragraph content={"This section will contain the problem description and examples."} /></section>
            <section id="approach"><Heading heading={"Solution Approach"}/><Paragraph content={"This section will contain the solution methodology and complexity analysis."} /></section>
        </div>
    );
};

export default PatternMatching;
