import React from "react";

const NodeComponent = ({value, highlight}) => (
    <div
        className={`p-2 w-10 h-10 text-center rounded ${
            highlight ? "bg-green-500" : "bg-gray-500"
        }`}
    >
        {value}
    </div>
);

export default NodeComponent;