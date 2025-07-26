// Components
import Paragraph from "../components/Paragraph.jsx";
import ExampleList from "../components/ExampleList.jsx";
import ConstraintsBullet from "../components/ConstraintsBullet.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import References from "../components/References.jsx";
import Title from "../components/Title.jsx";
import BlockQuote from "../components/BlockQuote.jsx";
import CodeBlock from "../components/CodeBlock.jsx";

// Assets
import {imagesProblem} from "../assets/data/images.js";
import {questions} from "../assets/data/references.js";
import {solutions} from "../assets/data/solutions.js";

// Visualizers
import LinkedListMergeUsingRecursiveVisualizer
    from "../visualizer/problem/merge-two-sorted-lists/LinkedListMergeUsingRecursiveVisualizer.jsx";
import LinkedListMergeUsingIterativeVisualizer
    from "../visualizer/problem/merge-two-sorted-lists/LinkedListMergeUsingIterativeVisualizer.jsx";

const MergeTwoSortedLists = () => {
    const examples = [
        {
            input: 'list1 = [1,2,4], list2 = [1,3,4]',
            output: '[1,1,2,3,4,4]',
            image: imagesProblem["Merge Two Sorted Lists"]["image 0"]
        },
        {
            input: 'list1 = [], list2 = []',
            output: '[]'
        },
        {
            input: 'list1 = [], list2 = [0]',
            output: '[0]'
        }
    ];


    return (
        <div>
            <Paragraph content={"You are given the heads of two sorted linked lists list1 and list2."}/>

            <Paragraph
                content={"Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists."}/>

            <Paragraph content={"Return the head of the merged linked list."}/>

            <ExampleList examples={examples}/>

            <ConstraintsBullet
                constraints={[
                    {text: 'The number of nodes in both lists is in the range [0, 50]', type: 'math'},
                    {text: '-100 <= Node.val <= 100', type: 'math'},
                    {text: 'Both list1 and list2 are sorted in non-decreasing order.', type: 'text'}
                ]}
            />

            <TableOfContents items={[
                {id: 'recursive-merge', title: 'Approach 1: Using Recursive Merge'},
                {id: 'iterative-merge', title: 'Approach 2: Using Iterative Merge'},
            ]}/>

            <section id="recursive-merge">
                <Title title={"Using Recursive Merge - O(n+m) Time and O(n+m) Space"}/>

                <BlockQuote
                    quote={"The idea is to merge two sorted linked lists using recursion. The base cases handle the scenarios where one of the lists is empty, in which case the other list is returned directly. In the recursive step, the function compares the data of the current nodes of both lists and attaches the smaller node to the merged list. The function then recursively merges the remaining part of the list. This process continues until both lists are fully merged. This approach eliminates the need for extra space and efficiently merges the lists."}
                    centered italic/>

                <CodeBlock language={"java"} code={solutions.merge_two_sorted_lists.recursive_merge.java}/>

                <CodeBlock language={"javascript"} code={solutions.merge_two_sorted_lists.recursive_merge.javascript}/>

                <LinkedListMergeUsingRecursiveVisualizer/>
            </section>

            <section id="iterative-merge">

                <Title title={"Using Iterative Merge - O(n+m) Time and O(1) Space"}/>

                <BlockQuote
                    quote={"The idea is to iteratively merge two sorted linked lists using a dummy node to simplify the process. A current pointer tracks the last node of the merged list. We compare the nodes from both lists and append the smaller node to the merged list. Once one list is fully traversed, the remaining nodes from the other list are appended. The merged list is returned starting from the node after the dummy node."}
                    centered italic/>

                <CodeBlock language={"java"} code={solutions.merge_two_sorted_lists.iterative_merge.java}/>

                <CodeBlock language={"javascript"} code={solutions.merge_two_sorted_lists.iterative_merge.javascript}/>

                <LinkedListMergeUsingIterativeVisualizer/>
            </section>

            <References references={questions.merge_two_sorted_lists}/>
        </div>
    );
};

export default MergeTwoSortedLists;