const Image = ({ imageURL, caption, link }) => {
    return (
        <div className="w-full flex flex-col items-center my-5">
            <img src={imageURL} alt={caption} className="w-[800px] h-[400px]" />
            {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-center text-sm text-gray-500 italic hover:underline"
                >
                    {caption}
                </a>
            ) : (
                <p className="mt-2 text-center text-sm text-gray-500 italic">
                    {caption}
                </p>
            )}
        </div>
    );
};

export default Image;
