import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AlgorithmCard = ({icon, title, list, onClickItem}) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded w-full layout-default-bg text-white hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={icon} className="text-gray-400 mb-3 sm:mb-4 lg:mb-5 text-2xl sm:text-3xl lg:text-4xl"/>
            <h2 className="text-lg sm:text-xl font-bold mb-2 break-words">{title}</h2>
            <ul className="list-none mb-3 sm:mb-4 lg:mb-5">
                {list.map((item, idx) => (
                    <li
                        key={idx}
                        className="px-1 py-1 hover:text-gray-400 text-sm sm:text-base cursor-pointer transition-colors"
                        onClick={() => onClickItem?.(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlgorithmCard;
