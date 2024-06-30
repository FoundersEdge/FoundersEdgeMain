import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-gradient-to-br bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold text-gray-800"
                >
                    Founders Edge
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-right"
                >
                    <p className="text-sm text-gray-600 mb-1">
                        Let's create something amazing
                    </p>
                    <p className="text-xs text-gray-500">
                        &copy; {currentYear} Created by Founders Edge
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;