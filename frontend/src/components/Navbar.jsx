import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Market Rates', path: '/market-rates' },
        { name: 'Packaging', path: '/packaging' },
        { name: 'Certifications', path: '/certifications' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'glass-nav shadow-2xl'
                    : 'bg-[#0F172A] border-b border-white/5'
            }`}
            id="main-navbar"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center -ml-2 lg:-ml-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src="/logo.png"
                                alt="Sri Srinivasa Canvassing Logo"
                                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-xl text-secondary dark:text-white leading-tight tracking-tight">
                                    Sri Srinivasa
                                </span>
                                <span className="text-xs font-bold text-primary tracking-[0.2em] leading-tight uppercase">
                                    Canvassing
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                                    isActive(link.path)
                                        ? 'text-primary'
                                        : 'text-text-muted dark:text-gray-300 hover:text-secondary dark:hover:text-white hover:bg-surface-hover dark:hover:bg-white/5'
                                }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                            </Link>
                        ))}


                        {/* CTA Button */}
                        <Link
                            to="/contact"
                            className="ml-3 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                        >
                            Get Bulk Quote
                        </Link>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex lg:hidden items-center gap-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-text-muted dark:text-gray-300 hover:bg-surface-hover dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                            id="mobile-menu-toggle"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="lg:hidden overflow-hidden border-t border-border dark:border-white/10"
                    >
                        <div className="px-4 py-4 space-y-1 bg-surface dark:bg-secondary">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                                            isActive(link.path)
                                                ? 'bg-primary/10 text-primary font-semibold'
                                                : 'text-text-muted dark:text-gray-300 hover:bg-surface-hover dark:hover:bg-white/5'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                            >
                                <Link
                                    to="/contact"
                                    className="block mt-3 px-4 py-3 text-center rounded-xl font-bold bg-primary hover:bg-primary-dark text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Bulk Quote
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
