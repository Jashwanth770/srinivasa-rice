import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Track instant mouse movements
    useEffect(() => {
        const updatePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
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

    // Spring physics for trailing ring
    useEffect(() => {
        let animationFrameId;
        const speed = 0.2; // Adjust for trailing delay tightness

        const renderLoop = () => {
            setRingPosition(prev => {
                const dx = mousePosition.x - prev.x;
                const dy = mousePosition.y - prev.y;
                return {
                    x: prev.x + dx * speed,
                    y: prev.y + dy * speed
                };
            });
            animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [mousePosition]);

    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;
    if (!isVisible) return null;

    return (
        <div className="fixed pointer-events-none z-[9999] inset-0">
            {/* Trailing Outer Halo - Blue/Emerald Portfolio Theme */}
            <div
                className="absolute w-10 h-10 rounded-full transform -translate-x-1/2 -translate-y-1/2 will-change-transform shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                style={{
                    left: `${ringPosition.x}px`,
                    top: `${ringPosition.y}px`,
                    background: isHovering
                        ? 'linear-gradient(to right, rgba(96, 165, 250, 0.2), rgba(52, 211, 153, 0.2))'
                        : 'transparent',
                    border: '2px solid',
                    borderImage: 'linear-gradient(to right, #60A5FA, #34D399) 1',
                    borderRadius: '50%',
                    clipPath: 'circle(50% at 50% 50%)', // Enforce circular border image
                    transition: 'width 0.2s ease-out, height 0.2s ease-out',
                    width: isHovering ? '60px' : '40px',
                    height: isHovering ? '60px' : '40px',
                }}
            >
                {/* Inner Border Fallback for cross-browser border-image rounded support */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-400 to-emerald-400" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '2px' }}></div>
            </div>

            {/* Instant Inner Dot - Emerald/Blue */}
            <div
                className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 will-change-transform bg-gradient-to-r from-blue-500 to-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transition: 'opacity 0.2s ease-out',
                    opacity: isHovering ? 0 : 1 // Hide dot when hovering to focus on ring
                }}
            />
        </div>
    );
};

export default CustomCursor;
