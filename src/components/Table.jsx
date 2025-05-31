const Table = ({rows, cols, striped = false, data}) => {
    return (
        <table className="table-auto border border-gray-400 my-5">
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
                                className={`text-lg border border-gray-300 ${backgroundColor} ${padding} text-${align} ${bold ? 'font-bold' : ''}`}
                            >
                                {text}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
