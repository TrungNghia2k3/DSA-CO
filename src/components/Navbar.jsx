import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ navigateToPage, activePage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { id: 'theory', label: 'Theory' },
        { id: 'problem', label: 'Problem' },
        { id: 'classic-problem', label: 'Classic Problems' }
    ];

    return (
        <header>
            <div className="bg-default text-[#fff9] w-full flex justify-center items-center">
                <div className="max-w-7xl w-full h-[70px] m-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="text-xl sm:text-2xl font-bold">
                        <button
                            onClick={() => navigateToPage('home')}
                            className={`hover:text-white ${activePage === 'home' ? 'text-white' : ''}`}
                        >
                            DSA.CO
                        </button>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-4 lg:gap-6 text-base lg:text-lg font-semibold">
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
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <FontAwesomeIcon 
                            icon={isMobileMenuOpen ? faTimes : faBars} 
                            className="text-white text-lg"
                        />
                    </button>
                </div>
                
                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-[70px] left-0 w-full bg-default border-t border-gray-700 z-50 animate-in slide-in-from-top-2 duration-200">
                        <nav className="flex flex-col py-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigateToPage(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 sm:px-6 py-3 text-lg font-semibold transition duration-200 hover:text-white hover:bg-gray-800 ${activePage === item.id ? 'text-white bg-gray-800' : 'text-[#fff9]'}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
