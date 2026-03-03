import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, [isVisible]);

    // Don't render cursor on mobile tablets/phones
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    // Hide until first movement to prevent spawning in top-left
    if (!isVisible) return null;

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-blue-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            variants={variants}
            animate="default"
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }} // Smooth minimal lag trailing effect
        />
    );
};

export default CustomCursor;
