const Bullet = ({heading, bold = false, items = [], type = "ul"}) => {
    const ListTag = type === "ol" ? "ol" : "ul";
    const listStyle = type === "ol" ? "list-decimal" : "list-disc";

    return (
        <>
            {heading && (
                <p className={`my-2 text-base ${bold ? "font-bold" : ""}`}>{heading}</p>
            )}
            <ListTag className={`${listStyle} list-inside mb-3 space-y-2`}>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ListTag>
        </>
    );
};

export default Bullet;
