import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface PricingTierProps {
    title: string;
    details: string;
    price: number;
    features: string[];
    tier: 'bronze' | 'silver' | 'gold';
    emoji: string;
}

const PricingTier: React.FC<PricingTierProps> = ({ title, details, price, features, tier, emoji }) => {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getBackgroundColor = (tier: string) => {
        switch (tier) {
            case 'bronze': return 'bg-gradient-to-br from-orange-100 to-orange-50';
            case 'silver': return 'bg-gradient-to-br from-gray-100 to-gray-50';
            case 'gold': return 'bg-gradient-to-br from-yellow-100 to-yellow-50';
            default: return 'bg-white';
        }
    };

    const getTextColor = (tier: string) => {
        switch (tier) {
            case 'bronze': return 'text-orange-700';
            case 'silver': return 'text-gray-700';
            case 'gold': return 'text-yellow-700';
            default: return 'text-gray-700';
        }
    };

    const getFeatureStyle = (index: number) => {
        if (tier === 'bronze' && index > 1) return 'line-through text-gray-400';
        if (tier === 'silver' && index > 3) return 'line-through text-gray-400';
        return '';
    };

    const floatVariants = {
        float: {
            y: [0, -15, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            whileHover={{ y: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            className={`${getBackgroundColor(tier)} rounded-3xl shadow-lg p-8 flex flex-col justify-between w-full max-w-xs mx-auto relative overflow-hidden`}
        >
            <div className="text-center mb-6 relative z-10">
                <motion.div
                    className="text-6xl mb-4"
                    variants={tier === 'gold' ? floatVariants : {}}
                    animate={tier === 'gold' ? "float" : ""}
                >
                    {emoji}
                </motion.div>
                <h3 className={`text-3xl font-extrabold mb-2 ${getTextColor(tier)}`}>
                    {title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{details}</p>
                <div className={`text-4xl font-bold mb-4 ${getTextColor(tier)}`}>
                    £{price}<span className="text-xl font-normal">/month</span>
                </div>
            </div>
            <button
                onClick={scrollToContact}
                className={`w-full ${getTextColor(tier)} px-4 py-2 mb-10 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200`}
            >
                Contact us!
            </button>

            <ul className="text-sm space-y-2 text-gray-600">
                {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6'].map((feature, index) => (
                    <li key={index} className={`flex items-center ${getFeatureStyle(index)}`}>
                        <span className="mr-2 text-green-500">✅</span>
                        {feature}
                    </li>
                ))}
            </ul>

        </motion.div>
    );
};

const PricingSection: React.FC = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    const tiers = [
        {
            title: "Bronze",
            details: "Perfect for small businesses wanting to create their tech footprint.",
            price: 13.99,
            tier: 'bronze' as const,
            emoji: "🥉"
        },
        {
            title: "Silver",
            details: "For growing businesses who want to develop an online brand.",
            price: 24.99,
            tier: 'silver' as const,
            emoji: "🥈"
        },
        {
            title: "Gold",
            details: "For small-medium sized businesses who have detailed requirements.",
            price: 36,
            tier: 'gold' as const,
            emoji: "🥇"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section ref={ref} className="bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <motion.h2 variants={itemVariants} className="text-5xl font-extrabold text-center mb-3 text-neutral-700 tracking-tight">Choose Your Perfect Plan 🚀</motion.h2>
                    <motion.p variants={itemVariants} className="text-xl text-center text-gray-600 mb-12">Tailored plans to help your business</motion.p>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {tiers.map((tier) => (
                            <motion.div key={tier.title} variants={itemVariants}>
                                <PricingTier {...tier} features={[]} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;