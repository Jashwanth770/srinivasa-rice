import React, { useEffect, useState } from 'react';

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

    return (
        <div
            className="fixed pointer-events-none z-[9999] inset-0"
            style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: 'translate(-50%, -50%)'
            }}
        >
            {/* The Green Glowing Circle */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-[#00ff88] shadow-[0_0_15px_#00ff88,inset_0_0_10px_#00ff88]">
                {/* The Custom White Arrowhead Pointer */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute ml-[6px] mt-[6px]" // Offset slightly to match a natural pointer tip
                    style={{
                        filter: 'drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.8))'
                    }}
                >
                    <path
                        d="M3.75 22.5L2.25 1.5L21.75 10.5L12 12L3.75 22.5Z"
                        fill="white"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>
        </div>
    );
};

export default CustomCursor;
