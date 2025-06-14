// Components
import Paragraph from "../components/Paragraph.jsx";
import ExampleList from "../components/ExampleList.jsx";
import ConstraintsBullet from "../components/ConstraintsBullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import Heading from "../components/Heading.jsx";
import References from "../components/References.jsx";

// Visualizers
import SearchInsertBruteForceVisualizer from "../visualizer/problem/search-insert-position/SearchInsertBruteForceVisualizer.jsx";
import SearchInsertExpectedBinarySearchVisualizer
    from "../visualizer/problem/search-insert-position/SearchInsertExpectedBinarySearchVisualizer.jsx";
import SearchInsertAlternateBinarySearchVisualizer
    from "../visualizer/problem/search-insert-position/SearchInsertAlternateBinarySearchVisualizer.jsx";

// Assets
import {questions} from "../assets/data/references.js";

const SearchInsertPosition = () => {
    const examples = [
        {
            input: 'nums = [1,3,5,6], target = 5',
            output: '2'
        },
        {
            input: 'nums = [1,3,5,6], target = 2',
            output: '1'
        },
        {
            input: 'nums = [1,3,5,6], target = 7',
            output: '4'
        }
    ];

    return (
        <div>
            <Paragraph
                content={"Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order."}/>

            <Paragraph content={"You must write an algorithm with O(log n) runtime complexity."} />

            <ExampleList examples={examples}/>

            <ConstraintsBullet
                constraints={[
                    {text: '1 <= nums.length <= 10^4', type: 'math'},
                    {text: '-10^4 <= nums[i] <= 10^4', type: 'math'},
                    {text: 'nums contains distinct values sorted in ascending order.', type: 'text'},
                    {text: '-10^4 <= target <= 10^4', type: 'math'},
                ]}
            />

            <TableOfContents items={[
                {id: 'search-insert-brute-force', title: 'Approach 1: Brute Force'},
                {id: 'search-insert-expected', title: 'Approach 2: Expected'},
                {id: 'search-insert-alternate', title: 'Approach 3: Alternate'},
            ]}/>

            <section id="search-insert-brute-force">
                <Heading heading={"[Brute Force Approach] Traverse and Find"}/>

                <SearchInsertBruteForceVisualizer />
            </section>

            <section id="search-insert-expected">
                <Heading heading={"[Expected Approach] Using Binary Search "}/>
                <SearchInsertExpectedBinarySearchVisualizer />
            </section>

            <section id="search-insert-alternate">
                <Heading heading={"[Alternate Approach] Using Binary Search"}/>
                <SearchInsertAlternateBinarySearchVisualizer />
            </section>

            <References references={questions.search_insert_position}/>
        </div>
    )
};

export default SearchInsertPosition;