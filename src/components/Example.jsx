const Example = ({title, input, output, image, explanation}) => {
    return (
        <div className="py-3">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="mb-2 text-gray-200"><span className="font-bold text-white">Input:</span> {input}</p>
            <p className="mb-2 text-gray-200"><span className="font-bold text-white">Output:</span> {output}</p>

            {image && (
                <div className="mt-5">
                    <img src={image} alt="Example visual" className="max-w-full h-auto mx-auto"/>
                </div>
            )}

            {explanation && (
                <p className="mt-2 text-gray-200"><span className="font-bold text-white">Explanation:</span> {explanation}</p>
            )}
        </div>
    );
};

export default Example;
