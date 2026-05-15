import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const GlassCard = ({
    children,
    className,
    variant = 'default',
    hover = true,
    animate = true,
    delay = 0,
    onClick,
    ...props
}) => {
    const variants = {
        default: 'glass-card',
        strong: 'glass-card-strong',
        premium: 'premium-card',
    };

    const baseClass = clsx(
        'rounded-2xl p-6',
        variants[variant],
        hover && 'hover-lift cursor-pointer',
        className
    );

    if (animate) {
        return (
            <motion.div
                className={baseClass}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                    duration: 0.5,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
                onClick={onClick}
                {...props}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className={baseClass} onClick={onClick} {...props}>
            {children}
        </div>
    );
};

export default GlassCard;
