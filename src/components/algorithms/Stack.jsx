import React from 'react';

// Components
import Heading from "../Heading.jsx";
import Paragraph from "../Paragraph.jsx";
import Image from "../Image.jsx";
import Bullet from "../Bullet.jsx";
import Table from "../Table.jsx";
import TableOfContents from "../TableOfContents.jsx";

// Assets
import {images} from "../../assets/data/images.js";

// Visualizer
import StackVisualizer from "../visualizer/algorithm/stack/StackVisualizer.jsx";
import AlgorithmReferenceSection from "../../layouts/AlgorithmReferenceSection.jsx";
import {algorithms} from "../../assets/data/references.js";

const Stack = () => {
    return (
        <div>
            <section id="introduction">

                <Heading heading={"What is Stack Data Structure?"}/>

                <Paragraph
                    content={"Stack is a linear data structure that follows LIFO (Last In First Out) Principle, the last element inserted is the first to be popped out. It means both insertion and deletion operations happen at one end only."}/>

                <Image imageURL={images.stack["image 0"]} caption="What is Stack - GeeksforGeeks"
                       link="https://www.geeksforgeeks.org/introduction-to-stack-data-structure-and-algorithm-tutorials/"/>

                <Heading heading={"LIFO(Last In First Out) Principle"}/>

                <Bullet
                    heading={"Here are some real world examples of LIFO"}
                    items={["Consider a stack of plates. When we add a plate, we add at the top. When we remove, we remove from the top.",
                        "A shuttlecock box (or any other box that is closed from one end) is another great real-world example of the LIFO (Last In, First Out) principle where do insertions and removals from the same end."]}/>
            </section>

            <TableOfContents items={[
                {id: 'introduction', title: 'What is Stack Data Structure?'},
                {id: 'representation', title: 'Representation of Stack Data Structure'},
                {id: 'basic-operations', title: 'Basic Operations on Stack'},
                {id: 'complexity-analysis', title: 'Complexity Analysis of Operations on Stack Data Structure'},
                {id: 'applications', title: 'Applications of Stacks'},
                {id: 'advantages', title: 'Advantages of Stacks'},
                {id: 'disadvantages', title: 'Disadvantages of Stacks'},
            ]}/>

            <section id="representation">

                <Heading heading={"Representation of Stack Data Structure"}/>

                <Paragraph
                    content={"Stack follows LIFO (Last In First Out) Principle so the element which is pushed last is popped first."}/>

                <Image imageURL={images.stack["image 1"]} caption="Representation of Stack Data Structure"/>

                <Bullet
                    heading={"Types of Stack:"} bold
                    items={["Fixed Size Stack : As the name suggests, a fixed size stack has a fixed size and cannot grow or shrink dynamically. If the stack is full and an attempt is made to add an element to it, an overflow error occurs. If the stack is empty and an attempt is made to remove an element from it, an underflow error occurs.",
                        "Dynamic Size Stack : A dynamic size stack can grow or shrink dynamically. When the stack is full, it automatically increases its size to accommodate the new element, and when the stack is empty, it decreases its size. This type of stack is implemented using a linked list, as it allows for easy resizing of the stack."]}/>
            </section>

            <section id="basic-operations">

                <Heading heading={"Basic Operations on Stack"}/>

                <Bullet
                    heading={"In order to make manipulations in a stack, there are certain operations provided to us."}
                    items={
                        [
                            "push() to insert an element into the stack.",
                            "pop() to remove an element from the stack.",
                            "top() returns the top element of the stack.",
                            "isEmpty() returns true if stack is empty else false.",
                            "isFull() returns true if the stack is full else false."
                        ]}/>

                <Paragraph content={"To implement stack, we need to maintain reference to the top item"}/>

                <StackVisualizer/>

                <Heading heading={"Push Operation on Stack"}/>

                <Paragraph
                    content={"Adds an item to the stack. If the stack is full, then it is said to be an Overflow condition."}/>

                <Bullet
                    heading={"Algorithm for Push Operation:"} bold
                    items={
                        [
                            "Before pushing the element to the stack, we check if the stack is full.",
                            "If the stack is full (top == capacity - 1) , then Stack Overflows and we cannot insert the element to the stack.",
                            "Otherwise, we increment the value of top by 1 (top = top + 1) and the new value is inserted at top position.",
                            "The elements can be pushed into the stack till we reach the capacity of the stack."
                        ]}/>

                <Image imageURL={images.stack["image 2"]} caption="Push Operation in Stack"/>

                <Heading heading={"Pop Operation in Stack"}/>

                <Paragraph
                    content={"Removes an item from the stack. The items are popped in the reversed order in which they are pushed. If the stack is empty, then it is said to be an Underflow condition."}/>

                <Bullet
                    heading={"Algorithm for Pop Operation:"} bold
                    items={
                        [
                            "Before popping the element from the stack, we check if the stack is empty.",
                            "If the stack is empty (top == -1), then Stack Underflows and we cannot remove any element from the stack.",
                            "Otherwise, we store the value at top, decrement the value of top by 1 (top = top – 1) and return the stored top value."
                        ]}/>

                <Image imageURL={images.stack["image 3"]} caption="Pop Operation in Stack"/>

                <Heading heading={"Top or Peek Operation on Stack"}/>

                <Paragraph content={"Returns the top element of the stack."}/>

                <Bullet
                    heading={"Algorithm for Top Operation:"} bold
                    items={
                        [
                            "Before returning the top element from the stack, we check if the stack is empty.",
                            "If the stack is empty (top == -1), we simply print “Stack is empty”.",
                            "Otherwise, we return the element stored at index = top."
                        ]}/>

                <Image imageURL={images.stack["image 4"]} caption="Top or Peek Operation in Stack"/>

                <Heading heading={"isEmpty Operation in Stack Data Structure:"}/>

                <Paragraph content={"Returns true if the stack is empty, else false."}/>

                <Bullet
                    heading={"Algorithm for isEmpty Operation:"} bold
                    items={
                        [
                            "Check for the value of top in stack.",
                            "If (top == -1), then the stack is empty so return true .",
                            "Otherwise, the stack is not empty so return false ."
                        ]}/>

                <Image imageURL={images.stack["image 5"]} caption="isEmpty Operation in Stack"/>

                <Heading heading={"isFull Operation in Stack Data Structure:"}/>

                <Paragraph content={"Returns true if the stack is full, else false."}/>

                <Bullet
                    heading={"Algorithm for isFull Operation:"} bold
                    items={
                        [
                            "Check for the value of top in stack.",
                            "If (top == capacity-1), then the stack is full so return true.",
                            "Otherwise, the stack is not full so return false."
                        ]}/>

                <Image imageURL={images.stack["image 6"]} caption="isFull Operation in Stack"/>
            </section>

            <section id="complexity-analysis">

                <Heading heading={"Complexity Analysis of Operations on Stack Data Structure"}/>

                <Table
                    rows={6}
                    cols={3}
                    data={[
                        [
                            {text: 'Operations', bold: true, padding: 'py-3', backgroundColor: 'bg-stone-800'},
                            {text: 'Time Complexity', bold: true, backgroundColor: 'bg-stone-800'},
                            {text: 'Space Complexity', bold: true, backgroundColor: 'bg-stone-800'}
                        ],
                        [
                            {text: 'push()', padding: "p-3", backgroundColor: 'bg-stone-800'},
                            {text: 'O(1)', padding: "p-3"},
                            {text: 'O(1)', padding: "p-3"}
                        ],
                        [
                            {text: 'pop()', padding: "p-3", backgroundColor: 'bg-stone-800'},
                            {text: 'O(1)', padding: "p-3"},
                            {text: 'O(1)', padding: "p-3"}
                        ],
                        [
                            {text: 'top() or peek()', padding: "p-3", backgroundColor: 'bg-stone-800'},
                            {text: 'O(1)', padding: "p-3"},
                            {text: 'O(1)', padding: "p-3"}
                        ],
                        [
                            {text: 'isEmpty()', padding: "p-3", backgroundColor: 'bg-stone-800'},
                            {text: 'O(1)', padding: "p-3"},
                            {text: 'O(1)', padding: "p-3"}
                        ],
                        [
                            {text: 'isFull()', backgroundColor: 'bg-stone-800'},
                            {text: 'O(1)'},
                            {text: 'O(1)'}
                        ]
                    ]}
                />
            </section>

            <section id="applications">

                <Heading heading={"Applications of Stacks"}/>

                <Bullet
                    items={
                        [
                            "Function calls: Stacks are used to keep track of the return addresses of function calls, allowing the program to return to the correct location after a function has finished executing.",
                            "Recursion: Stacks are used to store the local variables and return addresses of recursive function calls, allowing the program to keep track of the current state of the recursion.",
                            "Expression evaluation: Stacks are used to evaluate expressions in postfix notation (Reverse Polish Notation).",
                            "Syntax parsing: Stacks are used to check the validity of syntax in programming languages and other formal languages.",
                            "Memory management: Stacks are used to allocate and manage memory in some operating systems and programming languages."
                        ]}
                />
            </section>

            <section id="advantages">

                <Heading heading={"Advantages of Stacks"}/>

                <Bullet
                    items={
                        [
                            "Simplicity: Stacks are a simple and easy-to-understand data structure, making them suitable for a wide range of applications.",
                            "Efficiency: Push and pop operations on a stack can be performed in constant time (O(1)), providing efficient access to data.",
                            "Last-in, First-out (LIFO): Stacks follow the LIFO principle, ensuring that the last element added to the stack is the first one removed. This behavior is useful in many scenarios, such as function calls and expression evaluation.",
                            "Limited memory usage: Stacks only need to store the elements that have been pushed onto them, making them memory-efficient compared to other data structures."
                        ]}
                />
            </section>

            <section id="disadvantages">

                <Heading heading={"Disadvantages of Stacks"}/>

                <Bullet
                    items={
                        [
                            "Limited access: Elements in a stack can only be accessed from the top, making it difficult to retrieve or modify elements in the middle of the stack.",
                            "Potential for overflow: If more elements are pushed onto a stack than it can hold, an overflow error will occur, resulting in a loss of data.",
                            "Not suitable for random access: Stacks do not allow for random access to elements, making them unsuitable for applications where elements need to be accessed in a specific order.",
                            "Limited capacity: Stacks have a fixed capacity, which can be a limitation if the number of elements that need to be stored is unknown or highly variable."
                        ]}
                />
            </section>

            <AlgorithmReferenceSection references={algorithms.stack}/>
        </div>
    );
};

export default Stack;