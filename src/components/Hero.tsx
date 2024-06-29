"use client";

import React from "react";
import { Highlight } from "./ui/hero-highlight";
import { motion, useInView, useAnimation } from 'framer-motion';

export function Hero() {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const reasons = [
        { emoji: "🚀", title: "Fast Results", description: "Waht to add here?" },
        { emoji: "🤝", title: "Personalized Approach", description: "Waht to add here?" },
        { emoji: "💡", title: "Forward Thinking", description: "Waht to add here?" },
        { emoji: "🌟", title: "Affordable Solutions", description: "Waht to add here?" },
    ];

    return (
        <section ref={ref} className="bg-[#D0E6F6] min-h-screen py-40">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-700"><Highlight>Four quick reasons to choose us:</Highlight></h3>
                            <div className="grid grid-cols-2 gap-4">
                                {reasons.map((reason, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                        <span className="text-2xl mb-2 block">{reason.emoji}</span>
                                        <h4 className="font-semibold mb-1 text-gray-800">{reason.title}</h4>
                                        <p className="text-sm text-gray-600">{reason.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-neutral mb-4">Elevate Your Success</h3>
                        <p className="text-lg text-gray-600">
                            Think of what content to put here ??
                        </p>

                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => controls.start({
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.3 }
                    })}
                    className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
                >
                    Book A Consultation
                </motion.button>
            </div>
        </section>
    );
}