const Navbar = ({ navigateToPage, activePage }) => {
    const navItems = [
        { id: 'theory', label: 'Theory' },
        { id: 'problem', label: 'Problem' },
        { id: 'classic-problem', label: 'Classic Problems' }
    ];

    return (
        <header>
            <div className="bg-default text-[#fff9] w-full flex justify-center items-center">
                <div className="w-[1300px] h-[70px] m-auto flex items-center gap-10">
                    <div className="text-2xl font-bold">
                        <button
                            onClick={() => navigateToPage('home')}
                            className={`hover:text-white ${activePage === 'home' ? 'text-white' : ''}`}
                        >
                            DSA.CO
                        </button>
                    </div>
                    <nav className="flex gap-6 text-lg font-semibold">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigateToPage(item.id)}
                                className={`relative transition duration-200 hover:text-white ${activePage === item.id ? 'text-white' : 'text-[#fff9]'}`}
                            >
                                <span
                                    className={`
                                        after:content-[''] 
                                        after:absolute 
                                        after:left-0 
                                        after:-bottom-6
                                        after:h-[3px] 
                                        after:bg-white
                                        ${activePage === item.id || 'hover:after:w-full'} 
                                        ${activePage === item.id ? 'after:w-full' : 'after:w-0'}
                                    `}
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
