import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const OpeningPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 2500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 bg-white flex items-center justify-center flex-col min-h-screen"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center"
                >
                    <img
                        src="/logo.png"
                        alt="Sri Srinivasa"
                        className="h-24 md:h-32 w-auto mb-4"
                    />
                    <div className="flex flex-col items-center">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="font-bold text-3xl md:text-4xl text-secondary leading-tight text-center font-serif"
                        >
                            Sri Srinivasa
                        </motion.span>
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-xl md:text-2xl font-bold text-primary tracking-[0.2em] leading-tight text-center mt-1"
                        >
                            CANVASSING
                        </motion.span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OpeningPage;
