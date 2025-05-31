const BlockQuote = ({heading, quote, centered = false, italic = false}) => {
    return (
        <div className="mb-3">
            {heading ? (
                <p className="my-2 text-base">{heading}</p>
            ) : ""}
            <div
                className={`flex items-center layout-default-bg rounded-lg p-6 ${
                    centered ? "justify-center" : "justify-start"
                }`}
            >
                <blockquote>
                    <p className={`text-gray-300 text-lg ${italic ? "italic" : ""}`}>
                        {quote}
                    </p>
                </blockquote>
            </div>
        </div>
    );
};

export default BlockQuote;
