const Breadcrumb = ({breadcrumb, onBreadcrumbClick}) => {
    return (
        <div className="layout-default-bg w-full flex items-center justify-center">
            <div className="w-[1300px] text-white py-5">
                <div className="text-sm mb-2">
                    {breadcrumb.map((item, index) => {
                        const isLast = index === breadcrumb.length - 1;
                        return (
                            <span key={index}>
                        {index > 0 && ' / '}
                                <button
                                    onClick={() => onBreadcrumbClick(index)}
                                    className={`cursor-pointer ${
                                        isLast ? 'text-[#71727A]' : 'text-[#c9c9cf]'
                                    }`}
                                >
                            {item}
                        </button>
                    </span>
                        );
                    })}
                </div>
                <h1 className="text-3xl font-bold text-white">
                    {breadcrumb[breadcrumb.length - 1]}
                </h1>
            </div>
        </div>

    );
};

export default Breadcrumb;
