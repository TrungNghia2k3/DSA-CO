// Components
import Paragraph from "../components/Paragraph.jsx";
import Bullet from "../components/Bullet.jsx";
import Title from "../components/Title.jsx";
import Image from "../components/Image.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import BlockQuote from "../components/BlockQuote.jsx";

// Assets
import {examples} from "../assets/data/examples.js";
import {images} from "../assets/data/images.js";

// Visualizers
import BubbleSortVisualizer from "../visualizer/algorithm/bubble-sort/BubbleSortVisualizer.jsx";

const BubbleSort = () => {
    return (
        <div>
            <Paragraph
                content={"Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity are quite high."}/>

            <Bullet
                items={[
                    "We sort the array using multiple passes. After the first pass, the maximum element goes to end (its correct position). Same way, after second pass, the second largest element goes to second last position and so on.",
                    "In every pass, we process only those elements that have already not moved to correct position. After k passes, the largest k elements must have been moved to the last k positions.",
                    "In a pass, we consider remaining elements and compare all adjacent and swap if larger element is before a smaller element. If we keep doing this, we get the largest (among the remaining elements) at its correct position."
                ]}/>

            <Title title={"How does Bubble Sort Work?"} />

            <Image imageURL={images.bubble_sort["image 0"]}/>

            <Image imageURL={images.bubble_sort["image 1"]}/>

            <Image imageURL={images.bubble_sort["image 2"]}/>

            <Title title={"Implementation of bubble sort"}/>

            <CodeBlock language={"cpp"} code={examples.bubbleSort["example 1"].cpp}/>

            <CodeBlock language={"java"} code={examples.bubbleSort["example 1"].java}/>

            <CodeBlock language={"javascript"} code={examples.bubbleSort["example 1"].javascript}/>

            <BlockQuote heading={"Output"} quote={"Sorted array: 11 12 22 25 34 64 90"}/>

            <BubbleSortVisualizer />

            <Title title={"Complexity Analysis of Bubble Sort:"} />

            <Bullet
                items={[
                    "Time Complexity: O(n^2)",
                    "Auxiliary Space: O(1)"
                ]}/>

            <Title title={"Advantages of Bubble Sort:"} />

            <Bullet
                items={[
                    "Bubble sort is easy to understand and implement.",
                    "It does not require any additional memory space.",
                    "It is a stable sorting algorithm, meaning that elements with the same key value maintain their relative order in the sorted output."
                ]}/>

            <Title title={"Disadvantages of Bubble Sort:"} />

            <Bullet
                items={[
                    "Bubble sort has a time complexity of O(n2) which makes it very slow for large data sets.",
                    "Bubble sort has almost no or limited real world applications. It is mostly used in academics to teach different ways of sorting."
                ]}/>

        </div>
    );
};

export default BubbleSort;
