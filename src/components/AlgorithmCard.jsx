import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AlgorithmCard = ({icon, title, list, onClickItem}) => {
    return (
        <div className="p-8 rounded w-full bg-[#1F202A] text-white">
            <FontAwesomeIcon icon={icon} className="text-gray-400 mb-5 text-4xl"/>
            <h2 className="text-xl font-bold mb-2 text-nowrap">{title}</h2>
            <ul className="list-none mb-5">
                {list.map((item, idx) => (
                    <li
                        key={idx}
                        className="px-1 py-1 hover:text-gray-400 text-base cursor-pointer"
                        onClick={() => onClickItem?.(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlgorithmCard;
