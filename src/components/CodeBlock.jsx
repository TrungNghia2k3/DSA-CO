import React, {useState} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {atomDark} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({language, code}) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <p className="font-bold capitalize text-green-400">{language === "cpp" ? "c++" : language}</p>
            <div className="relative mb-5">
                <button
                    onClick={handleCopy}
                    className="absolute top-4 right-2 bg-gray-800 text-xs px-2 py-1 rounded hover:bg-gray-700">
                    {copied ? "Copied" : "Copy"}
                </button>
                <SyntaxHighlighter
                    language={language}
                    style={atomDark}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </>
    );
};

export default CodeBlock;
