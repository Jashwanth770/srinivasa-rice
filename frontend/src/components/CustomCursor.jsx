import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            // Only show cursor after first mouse movement to prevent it spawning top-left
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            // Check if we are hovering over an interactive element (button, link, input)
            const isInteractive = e.target.closest('a, button, input, textarea, [role="button"]');
            setIsHovering(!!isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    // Don't render cursor on mobile devices
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    // Hide until first movement
    if (!isVisible) return null;

    return (
        <div
            className="fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
            }}
        >
            {/* The main glowing orb */}
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                bg-[#8eaaff] bg-opacity-80 backdrop-blur-sm
                shadow-[0_0_20px_rgba(142,170,255,0.6),inset_0_0_10px_rgba(255,255,255,0.4)]
                transition-all duration-300 ease-in-out
                ${isHovering ? 'w-14 h-14 bg-opacity-40 backdrop-blur-md border border-[#8eaaff]' : ''}
            `}>
                {/* Center bright dot */}
                <div className={`
                    w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]
                    transition-all duration-300 ease-in-out
                    ${isHovering ? 'w-3 h-3 bg-[#8eaaff] shadow-none opacity-50' : ''}
                `} />
            </div>
        </div>
    );
};

export default CustomCursor;
