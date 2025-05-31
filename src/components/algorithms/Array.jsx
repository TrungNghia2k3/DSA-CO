import AlgorithmReferenceSection from "../../layouts/AlgorithmReferenceSection";

// Components
import Image from "../Image.jsx";
import Heading from "../Heading.jsx";
import Bullet from "../Bullet.jsx";
import CodeBlock from "../CodeBlock.jsx";
import Title from "../Title.jsx";
import Paragraph from "../Paragraph.jsx";
import BlockQuote from "../BlockQuote.jsx";
import SubHeading from "../SubHeading.jsx";
import TableOfContents from "../TableOfContents.jsx";

// Assets
import {examples} from "../../assets/data/examples.js";
import {algorithms} from "../../assets/data/references.js";
import {images} from "../../assets/data/images.js";

const Array = () => {

    return (
        <div>
            <Heading heading={"What is Array?"}/>

            <Paragraph
                content={"Array is a linear data structure where all elements are arranged sequentially. It is collection of elements of same data type stored at contiguous memory locations."}/>

            <Image imageURL={images.array["image 0"]} caption="What is Array - GeeksforGeeks"
                   link="https://www.geeksforgeeks.org/what-is-array"/>

            <TableOfContents items={[
                {id: 'introduction', title: 'Introduction'},
                {id: 'example', title: 'Example'},
            ]}/>

            <Paragraph
                content={"For simplicity, we can think of an array as a flight of stairs where on each step is placed a value (let’s say one of your friends). Here, you can identify the location of any of your friends by simply knowing the count of the step they are on."}/>

            <Paragraph
                content={"This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of the first element of the array (generally denoted by the name of the array). The base value is index 0 and the difference between the two indexes is the offset."}/>

            <Heading heading={"Is the array always of a fixed size?"}/>

            <Paragraph
                content={"Arrays at core are of fixed size only, but most of the languages provide dynamic sized arrays using the underlying fixed sized arrays. For example, vector in C++, ArrayList in Java and list in Python. In C language, the array has a fixed size meaning once the size is given to it, it cannot be changed i.e. you can’t shrink it nor can you expand it."}/>

            <Heading heading={"Important Points to Note about Arrays"}/>

            <Bullet
                items={["Array is a fundamental data structure and used to implement other data structures like stack, queue, dequeue and heap.",
                    "The main advantages of using array over other data structures are cache friendliness and random access memory."]}/>

            <section id="introduction">
                <h2 className="text-xl font-bold">Introduction</h2>
                <p>Introductory content...</p>
            </section>


            <Title title={"Getting Started with Array Data Structure"}/>

            <Paragraph
                content={"Array is a collection of items of the same variable type that are stored at contiguous memory locations. It is one of the most popular and simple data structures used in programming."}/>

            <Heading heading={"Basic terminologies of Array"}/>

            <Bullet
                items={["Array Index: In an array, elements are identified by their indexes. Array index starts from 0.",
                    "Array element: Elements are items stored in an array and can be accessed by their index.",
                    "Array Length: The length of an array is determined by the number of elements it can contain."]}/>

            <Heading heading={"Memory representation of Array"}/>

            <Paragraph
                content={"In an array, all the elements are stored in contiguous memory locations. So, if we initialize an array, the elements will be allocated sequentially in memory. This allows for efficient access and manipulation of elements."}/>

            <Image imageURL={images.array["image 1"]} caption="Array in C++"/>

            <Image imageURL={images.array["image 2"]} caption="Array in Java"/>

            <Image imageURL={images.array["image 3"]} caption="Array in Python"/>

            <Heading heading={"Declaration of Array"}/>

            <Paragraph
                content={"Arrays can be declared in various ways in different languages. For better illustration, below are some language-specific array declarations:"}/>

            <section id="example">
                <h2 className="text-xl font-bold">Example</h2>
                <p>Example content...</p>
            </section>

            <CodeBlock language={"cpp"} code={examples.array["example 1"].cpp}/>

            <CodeBlock language={"java"} code={examples.array["example 1"].java}/>

            <CodeBlock language={"javascript"} code={examples.array["example 1"].javascript}/>

            <Heading heading={"Declaration of Array"}/>

            <Paragraph
                content={"Arrays can be declared in various ways in different languages. For better illustration, below are some language-specific array declarations:"}/>

            <CodeBlock language={"cpp"} code={examples.array["example 2"].cpp}/>

            <CodeBlock language={"java"} code={examples.array["example 2"].java}/>

            <CodeBlock language={"javascript"} code={examples.array["example 2"].javascript}/>

            <Heading heading={"Why do we Need Arrays?"}/>

            <Paragraph
                content={"Assume there is a class of five students and if we have to keep records of their marks in examination then, we can do this by declaring five variables individual and keeping track of records but what if the number of students becomes very large, it would be challenging to manipulate and maintain the data."}/>

            <Paragraph
                content={"What it means is that, we can use normal variables (v1, v2, v3, ..) when we have a small number of objects. But if we want to store a large number of instances, it becomes difficult to manage them with normal variables."}/>

            <BlockQuote quote={"The idea of an array is to represent many instances in one variable."}
                        centered italic/>

            <Image imageURL={images.array["image 4"]} caption="Important of Array"/>

            <Heading heading={"Types of Arrays"}/>

            <Bullet heading={"Arrays can be classified in two ways:"}
                    items={["On the basis of Size", "On the basis of Dimensions"]}/>

            <Image imageURL={images.array["image 5"]} caption="Types of Arrays"/>

            <Heading heading={"Types of Arrays on the basis of Size"}/>

            <SubHeading subHeading={"1. Fixed Sized Arrays"}/>

            <Paragraph
                content={"We cannot alter or update the size of this array. Here only a fixed size (i,e. the size that is mentioned in square brackets []) of memory will be allocated for storage. In case, we don’t know the size of the array then if we declare a larger size and store a lesser number of elements will result in a wastage of memory or we declare a lesser size than the number of elements then we won’t get enough memory to store all the elements. In such cases, static memory allocation is not preferred."}/>

            <CodeBlock language={"cpp"} code={examples.array["example 3"].cpp}/>

            <CodeBlock language={"java"} code={examples.array["example 3"].java}/>

            <SubHeading subHeading={"2. Dynamic Sized Arrays"}/>

            <Paragraph
                content={"The size of the array changes as per user requirements during execution of code so the coders do not have to worry about sizes. They can add and removed the elements as per the need. The memory is mostly dynamically allocated and de-allocated in these arrays."}/>

            <CodeBlock language={"cpp"} code={examples.array["example 4"].cpp}/>

            <CodeBlock language={"java"} code={examples.array["example 4"].java}/>

            <CodeBlock language={"javascript"} code={examples.array["example 4"].javascript}/>

            <Heading heading={"Types of Arrays on the basis of Dimensions"}/>

            <Paragraph
                content={"1. One-dimensional Array(1-D Array): You can imagine a 1d array as a row, where elements are stored one after another."}/>

            <Image imageURL={images.array["image 6"]} caption="One-dimensional Array(1-D Array)"/>

            <Paragraph
                content={"2. Multi-dimensional Array: A multi-dimensional array is an array with more than one dimension. We can use multidimensional array to store complex data in the form of tables, etc. We can have 2-D arrays, 3-D arrays, 4-D arrays and so on."}/>

            <Bullet
                items={["Two-Dimensional Array(2-D Array or Matrix): 2-D Multidimensional arrays can be considered as an array of arrays or as a matrix consisting of rows and columns."]}/>

            <Image imageURL={images.array["image 7"]}
                   caption="Two-Dimensional Array(2-D Array or Matrix)"/>

            <Bullet
                items={["Three-Dimensional Array(3-D Array): A 3-D Multidimensional array contains three dimensions, so it can be considered an array of two-dimensional arrays."]}/>

            <Image imageURL={images.array["image 8"]} caption="Three-Dimensional Array(3-D Array)"/>

            <Heading heading={"Operations on Array"}/>

            <SubHeading subHeading={"1. Array Traversal"}/>

            <Paragraph
                content={"Array traversal refers to the process of accessing and processing each element of an array sequentially. This is one of the most fundamental operations in programming, as arrays are widely used data structures for storing multiple elements in a single variable."}/>

            <SubHeading subHeading={"How Array Traversal Works?"}/>

            <Paragraph
                content={"When an array is created, it occupies a contiguous block of memory where elements are stored in an indexed manner. Each element can be accessed using its index, which starts from 0 in most programming languages."}/>

            <BlockQuote heading={"For example, consider an array containing five integers:"}
                        quote={"arr = [10, 20, 30, 40, 50]"} italic/>

            <Bullet heading={"Here:"} items={[
                "The first element (10) is at index 0.",
                "The second element (20) is at index 1.",
                "The last element (50) is at index 4."
            ]}/>

            <Paragraph
                content={"Array traversal means accessing each element from start to end (or sometimes in reverse order), usually by using a loop."}/>

            <Heading heading={"Types of Array Traversal"}/>

            <Paragraph
                content={"Array traversal can be done in multiple ways based on the requirement:"}/>

            <Bullet heading={"1. Sequential (Linear) Traversal"} bold items={[
                "This is the most common way of traversing an array.",
                "It involves iterating through the array one element at a time from the first index to the last.",
                "Used for printing elements, searching, or performing calculations (such as sum or average)."
            ]}/>

            <Bullet heading={"2. Reverse Traversal"} bold items={[
                "Instead of starting from index 0, the traversal begins from the last element and moves towards the first.",
                "This is useful in cases where we need to process elements from the end."
            ]}/>

            <Heading heading={"2. Insertion in Array"}/>

            <Paragraph
                content={"Insertion in an array refers to the process of adding a new element at a specific position while maintaining the order of the existing elements. Since arrays have a fixed size in static implementations, inserting an element often requires shifting existing elements to make space."}/>

            <Bullet heading={"If we search for 30, the algorithm will:"}
                    items={[
                        "Compare 10 with 30 → No match.",
                        "Compare 20 with 30 → No match.",
                        "Compare 30 with 30 → Match found at index 2."
                    ]}
                    type={"ol"}/>

            <Heading heading={"Applications, Advantages and Disadvantages of Array"}/>

            <SubHeading subHeading={"Applications of Array Data Structure:"}/>

            <Paragraph
                content={"Arrays mainly have advantages like random access and cache friendliness over other data structures that make them useful."}/>

            <Bullet heading={"Below are some applications of arrays."} items={[
                "Storing and accessing data: Arrays store elements in a specific order and allow constant-time O(1) access to any element.",
                "Searching: If data in array is sorted, we can search an item in O(log n) time. We can also find floor(), ceiling(), kth smallest, kth largest, etc efficiently.",
                "Matrices: Two-dimensional arrays are used for matrices in computations like graph algorithms and image processing.",
                "Implementing other data structures: Arrays are used as the underlying data structure for implementing stacks and queues.",
                "Dynamic programming: Dynamic programming algorithms often use arrays to store intermediate results of subproblems in order to solve a larger problem.",
                "Data Buffers: Arrays serve as data buffers and queues, temporarily storing incoming data like network packets, file streams, and database results before processing."
            ]}/>

            <AlgorithmReferenceSection references={algorithms.array}/>
        </div>
    );
};

export default Array;