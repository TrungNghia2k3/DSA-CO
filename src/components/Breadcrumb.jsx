const Breadcrumb = ({breadcrumb, onBreadcrumbClick}) => {
    return (
        <div className="layout-default-bg w-full flex items-center justify-center">
            <div className="max-w-7xl w-full text-white py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
                <div className="text-xs sm:text-sm mb-2">
                    {breadcrumb.map((item, index) => {
                        const isLast = index === breadcrumb.length - 1;
                        return (
                            <span key={index}>
                        {index > 0 && ' / '}
                                <button
                                    onClick={() => onBreadcrumbClick(index)}
                                    className={`cursor-pointer transition-colors hover:text-white ${
                                        isLast ? 'text-[#71727A]' : 'text-[#c9c9cf]'
                                    }`}
                                >
                            {item}
                        </button>
                    </span>
                        );
                    })}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {breadcrumb[breadcrumb.length - 1]}
                </h1>
            </div>
        </div>

    );
};

export default Breadcrumb;
