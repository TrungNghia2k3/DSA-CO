const Table = ({rows, cols, striped = false, data}) => {
    return (
        <div className="overflow-x-auto my-5">
            <table className="min-w-full table-auto border border-gray-400">
                <tbody>
                {Array.from({length: rows}).map((_, rowIndex) => (
                    <tr className={`${striped ? "odd:bg-gray-900 even:bg-gray-800" : ""}`} key={rowIndex}>
                        {Array.from({length: cols}).map((_, colIndex) => {
                            const cell = data?.[rowIndex]?.[colIndex] || {};
                            const {
                                text = '',
                                bold = false,
                                align = 'center',
                                padding = 'p-2',
                                backgroundColor = 'transparent',
                            } = cell;

                            return (
                                <td
                                    key={colIndex}
                                    className={`text-sm sm:text-base lg:text-lg border border-gray-300 ${backgroundColor} ${padding} text-${align} ${bold ? 'font-bold' : ''} whitespace-nowrap`}
                                >
                                    {text}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
