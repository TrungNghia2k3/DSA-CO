const HeroSection = () => {
    return (
        <section className="layout-default-bg text-white pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 w-full flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full my-auto mx-0 px-4 sm:px-6 lg:px-8 py-5 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-5 font-bold leading-tight">
                    Learn Algorithms & Data Structures
                </h1>
                <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl">
                    This is a platform to learn algorithms and data structures. You can learn the theory and practice
                    problems.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;