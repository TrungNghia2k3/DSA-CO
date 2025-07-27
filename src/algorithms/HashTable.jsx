import References from "../components/References.jsx";

// Components
import Heading from "../components/Heading.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Image from "../components/Image.jsx";
import Bullet from "../components/Bullet.jsx";
import CodeBlock from "../components/CodeBlock.jsx";

// Assets
import {examples} from "../assets/data/examples.js";
import {algorithms} from "../assets/data/references.js";
import {images} from "../assets/data/images.js";

const HashTable = () => {
    return (
        <div>
            <Heading heading={"What is Hash Table?"}/>

            <Paragraph
                content={"A Hash table is defined as a data structure used to insert, look up, and remove key-value pairs quickly. It operates on the hashing concept, where each key is translated by a hash function into a distinct index in an array. The index functions as a storage location for the matching value. In simple words, it maps the keys with the value."}/>

            <Image imageURL={images.hash_table["image 0"]} caption={"Components of Hashing"}/>

            <Heading heading={"What is a Hash function?"}/>

            <Paragraph
                content={"A Function that translates keys to array indices is known as a hash function. The keys should be evenly distributed across the array via a decent hash function to reduce collisions and ensure quick lookup speeds."}/>

            <Bullet items={[
                "Integer universe assumption: The keys are assumed to be integers within a certain range according to the integer universe assumption. This enables the use of basic hashing operations like division or multiplication hashing.",
                "Hashing by division: This straightforward hashing technique uses the key’s remaining value after dividing it by the array’s size as the index. When an array size is a prime number and the keys are evenly spaced out, it performs well.",
                "Hashing by multiplication: This straightforward hashing operation multiplies the key by a constant between 0 and 1 before taking the fractional portion of the outcome. After that, the index is determined by multiplying the fractional component by the array’s size. Also, it functions effectively when the keys are scattered equally."
            ]}/>

            <Paragraph
                content={"Selecting a decent hash function is based on the properties of the keys and the intended functionality of the hash table. Using a function that evenly distributes the keys and reduces collisions is crucial."}/>

            <Bullet heading={"Criteria based on which a hash function is chosen:"} bold
                    items={[
                        "To ensure that the number of collisions is kept to a minimum, a good hash function should distribute the keys throughout the hash table in a uniform manner. This implies that for all pairings of keys, the likelihood of two keys hashing to the same position in the table should be rather constant.",
                        "To enable speedy hashing and key retrieval, the hash function should be computationally efficient.",
                        "It ought to be challenging to deduce the key from its hash value. As a result, attempts to guess the key using the hash value are less likely to succeed.",
                        "A hash function should be flexible enough to adjust as the data being hashed changes. For instance, the hash function needs to continue to perform properly if the keys being hashed change in size or format."
                    ]}/>

            <Heading heading={"Collision resolution techniques:"}/>

            <Paragraph
                content={"Collisions happen when two or more keys point to the same array index. Chaining, open addressing, and double hashing are a few techniques for resolving collisions."}/>

            <Image imageURL={images.hash_table["image 1"]} caption={"Collision in Hashing"}/>

            <Bullet items={[
                "Open addressing: collisions are handled by looking for the following empty space in the table. If the first slot is already taken, the hash function is applied to the subsequent slots until one is left empty. There are various ways to use this approach, including double hashing, linear probing, and quadratic probing.",
                "Separate Chaining: In separate chaining, a linked list of objects that hash to each slot in the hash table is present. Two keys are included in the linked list if they hash to the same slot. This method is rather simple to use and can manage several collisions.",
                "Robin Hood hashing: To reduce the length of the chain, collisions in Robin Hood hashing are addressed by switching off keys. The algorithm compares the distance between the slot and the occupied slot of the two keys if a new key hashes to an already-occupied slot. The existing key gets swapped out with the new one if it is closer to its ideal slot. This brings the existing key closer to its ideal slot. This method has a tendency to cut down on collisions and average chain length."
            ]}/>

            <CodeBlock language={"javascript"} code={examples.hashTable["example 1"].javascript}/>

            <Heading heading={"Advantages of Hashing in Data Structures"}/>

            <Bullet items={[
                "Key-value support: Hashing is ideal for implementing key-value data structures.",
                "Fast data retrieval: Hashing allows for quick access to elements with constant-time complexity.",
                "Efficiency: Insertion, deletion, and searching operations are highly efficient.",
                "Memory usage reduction: Hashing requires less memory as it allocates a fixed space for storing elements.",
                "Scalability: Hashing performs well with large data sets, maintaining constant access time.",
                "Security and encryption: Hashing is essential for secure data storage and integrity verification."
            ]}/>

            <Heading heading={"Applications of Hash Table:"}/>

            <Bullet items={[
                "Hash tables are frequently used for indexing and searching massive volumes of data. A search engine might use a hash table to store the web pages that it has indexed.",
                "Data is usually cached in memory via hash tables, enabling rapid access to frequently used information. ",
                "Hash functions are frequently used in cryptography to create digital signatures, validate data, and guarantee data integrity.",
                "Hash tables can be used for implementing database indexes, enabling fast access to data based on key values. "
            ]}/>

            <Heading heading={"Summary"}/>

            <Bullet items={[
                "Hash Table elements are stored in storage containers called buckets.",
                "Every Hash Table element has a part that is unique that is called the key.",
                "A hash function takes the key of an element to generate a hash code.",
                "The hash code says what bucket the element belongs to, so now we can go directly to that Hash Table element: to modify it, or to delete it, or just to check if it exists.",
                "A collision happens when two Hash Table elements have the same hash code, because that means they belong to the same bucket. A collision can be solved in two ways.",
                "Chaining is the way collisions are solved in this tutorial, by using arrays or linked lists to allow more than one element in the same bucket.",
                "Open Addressing is another way to solve collisions. With open addressing, if we want to store an element but there is already an element in that bucket, the element is stored in the next available bucket. This can be done in many different ways, but we will not explain open addressing any further here.",
            ]}/>

            <References references={algorithms.hashTable}/>
        </div>
    );
};

export default HashTable;