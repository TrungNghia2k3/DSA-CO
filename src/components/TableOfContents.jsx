import React from 'react';

// Explain:
// How the Table of Contents Works
// 1. HTML Anchors (id attributes)
// In HTML and React, when you add an id to an element, like:
//
// <section id="example">...</section>
// You're creating a named anchor — a specific spot in the page that can be linked to directly using href="#example".
//
// 2. Links with href="#..."
// When you click:
// <a href="#example">Go to Example</a>
// The browser looks for an element with id="example" and scrolls to it automatically. This is standard HTML behavior — no JavaScript needed.

const TableOfContents = ({items}) => (
    <nav className="mb-6 py-4 rounded">
        <h3 className="font-semibold text-xl mb-2">Table of Contents</h3>
        <ul className="list-disc list-inside space-y-1">
            {items.map(({id, title}) => (
                <li key={id}>
                    <a href={`#${id}`} className="text-green-600 underline text-lg">
                        {title}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

export default TableOfContents;