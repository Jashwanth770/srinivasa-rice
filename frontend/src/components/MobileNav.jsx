import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, BarChart3, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileNav = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Products', path: '/products', icon: ShoppingBag },
        { name: 'Rates', path: '/market-rates', icon: BarChart3 },
        { name: 'Contact', path: '/contact', icon: Phone },
        {
            name: 'WhatsApp',
            path: null,
            icon: MessageCircle,
            isExternal: true,
            url: 'https://wa.me/919866760028',
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden safe-bottom" id="mobile-nav">
            <div className="bg-surface/95 dark:bg-secondary/95 backdrop-blur-xl border-t border-border dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-around px-2 py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = !item.isExternal && isActive(item.path);

                        if (item.isExternal) {
                            return (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-emerald transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-[10px] font-semibold">{item.name}</span>
                                </a>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-300 ${
                                    active
                                        ? 'text-primary'
                                        : 'text-text-muted dark:text-gray-400'
                                }`}
                            >
                                {active && (
                                    <motion.div
                                        layoutId="mobile-nav-indicator"
                                        className="absolute -top-0.5 w-6 h-1 bg-primary rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <Icon className="w-5 h-5" />
                                <span className="text-[10px] font-semibold">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
