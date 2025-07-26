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
            <p className="font-bold capitalize text-green-400 text-sm sm:text-base">{language}</p>
            <div className="relative mb-5 overflow-hidden">
                <button
                    onClick={handleCopy}
                    className="absolute top-2 sm:top-4 right-2 bg-gray-800 text-xs px-2 py-1 rounded hover:bg-gray-700 z-10">
                    {copied ? "Copied" : "Copy"}
                </button>
                <div className="overflow-x-auto">
                    <SyntaxHighlighter
                        language={language}
                        style={atomDark}
                        customStyle={{
                            fontSize: '0.875rem', // 14px
                            lineHeight: '1.25rem', // 20px
                            margin: 0,
                            borderRadius: '0.375rem',
                        }}
                        codeTagProps={{
                            style: {
                                fontSize: 'inherit',
                                lineHeight: 'inherit'
                            }
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
        </>
    );
};

export default CodeBlock;
