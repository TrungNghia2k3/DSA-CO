// Components
import Heading from "../components/Heading.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Image from "../components/Image.jsx";
import Bullet from "../components/Bullet.jsx";
import Table from "../components/Table.jsx";
import References from "../components/References.jsx";

// Assets
import {images} from "../assets/data/images.js";
import {algorithms} from "../assets/data/references.js";

const LinkedList = () => {
    return (
        <div>
            <section id="introduction">
                <Heading heading={"What is Linked List?"}/>

                <Paragraph
                    content={"A linked list is a fundamental data structure in computer science. It mainly allows efficient insertion and deletion operations compared to arrays. Like arrays, it is also used to implement other data structures like stack, queue and deque."}/>

                <Paragraph
                    content={"A Linked List is, as the word implies, a list where the nodes are linked together. Each node contains data and a pointer. The way they are linked together is that each node points to where in the memory the next node is placed."}/>

                <Paragraph
                    content={"Linked List is basically chains of nodes where each node contains information such as data and a pointer to the next node in the chain. It is a popular data structure with a wide range of real-world applications. Unlike Arrays, Linked List elements are not stored at a contiguous location. In the linked list there is a head pointer, which points to the first element of the linked list, and if the list is empty then it simply points to null or nothing."}/>

                <Image imageURL={images.linked_list["image 0"]} caption="Linked List Data Structure"
                       link="https://www.geeksforgeeks.org/introduction-to-linked-list-data-structure/"/>

                <Heading heading={"Basic Terminologies of Linked List"}/>

                <Bullet
                    items={
                    [
                        "Head: The Head of a linked list is a pointer to the first node or reference of the first node of linked list. This pointer marks the beginning of the linked list.",
                        "Node: Linked List consists of a series of nodes where each node has two parts: data and next pointer.",
                        "Data: Data is the part of node which stores the information in the linked list.",
                        "Next pointer: Next pointer is the part of the node which points to the next node of the linked list."
                    ]}/>

                <Heading heading={"Importance of Linked List"}/>

                <Bullet
                    heading={"Here are a few advantages of a linked list that is listed below, it will help you understand why it is necessary to know."}
                    items={
                        [
                            "Dynamic Data structure: The size of memory can be allocated or de-allocated at run time based on the operation insertion or deletion.",
                            "Ease of Insertion/Deletion: The insertion and deletion of elements are simpler than arrays since no elements need to be shifted after insertion and deletion, Just the address needed to be updated.",
                            "Efficient Memory Utilization: As we know Linked List is a dynamic data structure the size increases or decreases as per the requirement so this avoids the wastage of memory. ",
                            "Implementation: Various advanced data structures can be implemented using a linked list like a stack, queue, graph, hash maps, etc."
                        ]}/>
            </section>

            <section id="comparision">

                <Heading heading={"The comparison of Linked List vs Array"}/>

                <Paragraph content={"The table below compares linked lists with arrays to give a better understanding of what linked lists are."} />

                <Table
                    rows={7}
                    cols={3}
                    striped
                    data={[
                        [
                            {text: '', padding: "p-3"},
                            {text: 'Array'},
                            {text: 'Linked List'}
                        ],
                        [
                            {text: 'An existing data structure in the programming language', padding: "p-3"},
                            {text: 'Yes', padding: "p-3"},
                            {text: 'No', padding: "p-3"}
                        ],
                        [
                            {text: 'Fixed size in memory', padding: "p-3"},
                            {text: 'Yes', padding: "p-3"},
                            {text: 'No', padding: "p-3"}
                        ],
                        [
                            {text: 'Elements, or nodes, are stored right after each other in memory (contiguously)', padding: "p-3"},
                            {text: 'Yes', padding: "p-3"},
                            {text: 'No', padding: "p-3"}
                        ],
                        [
                            {text: 'Memory usage is low each node only contains data, no links to other nodes)', padding: "p-3"},
                            {text: 'Yes', padding: "p-3"},
                            {text: 'No', padding: "p-3"}
                        ],
                        [
                            {text: 'Elements, or nodes, can be accessed directly (random access)', padding: "p-3"},
                            {text: 'No', padding: "p-3"},
                            {text: 'Yes', padding: "p-3"}
                        ],
                        [
                            {text: 'Elements, or nodes, can be inserted or deleted in constant time, no shifting operations in memory needed.', padding: "p-3"},
                            {text: 'Yes', padding: "p-3"},
                            {text: 'No', padding: "p-3"}
                        ]
                    ]}
                />
            </section>

            <section id="memory">
                <Heading heading={"Computer Memory"} />

                <Paragraph content={"To explain what linked lists are, and how linked lists are different from arrays, we need to understand some basics about how computer memory works. Computer memory is the storage your program uses when it is running. This is where your variables, arrays and linked lists are stored."} />

                <Heading heading={"Variables in Memory"} />

                <Paragraph content={"Let's imagine that we want to store the integer \"17\" in a variable myNumber. For simplicity, let's assume the integer is stored as two bytes (16 bits), and the address in memory to myNumber is 0x7F25."} />

                <Paragraph content={"0x7F25 is actually the address to the first of the two bytes of memory where the myNumber integer value is stored. When the computer goes to 0x7F25 to read an integer value, it knows that it must read both the first and the second byte, since integers are two bytes on this specific computer."} />

                <Paragraph content={"The image below shows how the variable myNumber = 17 is stored in memory."} />

                <Image imageURL={images.linked_list["image 1"]}/>

                <Paragraph content={"The example above shows how an integer value is stored on the simple, but popular, Arduino Uno microcontroller. This microcontroller has an 8 bit architecture with 16 bit address bus and uses two bytes for integers and two bytes for memory addresses. For comparison, personal computers and smart phones use 32 or 64 bits for integers and addresses, but the memory works basically in the same way."} />

                <Heading heading={"Arrays in Memory"} />

                <Paragraph content={"To understand linked lists, it is useful to first know how arrays are stored in memory."} />

                <Paragraph content={"Elements in an array are stored contiguously in memory. That means that each element is stored right after the previous element."} />

                <Paragraph content={"The image below shows how an array of integers myArray = [3,5,13,2] is stored in memory. We use a simple kind of memory here with two bytes for each integer, like in the previous example, just to get the idea."} />

                <Image imageURL={images.linked_list["image 2"]}/>

                <Paragraph content={"The computer has only got the address of the first byte of myArray, so to access the 3rd element with code myArray[2] the computer starts at 0x7F23 and jumps over the two first integers. The computer knows that an integer is stored in two bytes, so it jumps 2x2 bytes forward from 0x7F23 and reads value 13 starting at address 0x7F27."} />

                <Paragraph content={"When removing or inserting elements in an array, every element that comes after must be either shifted up to make place for the new element, or shifted down to take the removed element's place. Such shifting operations are time consuming and can cause problems in real-time systems for example."} />

                <Paragraph content={"The image below shows how elements are shifted when an array element is removed."} />

                <Image imageURL={images.linked_list["image 3"]}/>

                <Paragraph content={"Manipulating arrays is also something you must think about if you are programming in C, where you have to explicitly move other elements when inserting or removing an element. In C this does not happen in the background."} />

                <Paragraph content={"In C you also need to make sure that you have allocated enough space for the array to start with, so that you can add more elements later."} />

            </section>
            <section id="types"></section>
            <section id="operations"></section>
            <section id="introduction"></section>
            <section id="applications"></section>
            <section id="advantages"></section>
            <section id="disadvantages"></section>

            <References references={algorithms.linkedList}/>
        </div>
    );
};

export default LinkedList;