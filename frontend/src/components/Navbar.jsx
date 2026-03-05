import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Market Rates', path: '/market-rates' },
        { name: 'Packaging', path: '/packaging' },
        { name: 'Certifications', path: '/certifications' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="Sri Srinivasa" className="h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className="font-bold text-xl text-secondary leading-tight">Sri Srinivasa</span>
                                <span className="text-sm font-semibold text-primary tracking-wider leading-tight"> CANVASSING</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-text-muted hover:text-secondary font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm"
                        >
                            Get Bulk Quote
                        </Link>
                    </div>

                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text-muted hover:text-secondary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 pb-4">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-secondary hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="block mt-4 px-3 py-2 text-center rounded-md font-semibold bg-primary text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Bulk Quote
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
