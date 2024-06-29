import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PricingTierProps {
  title: string;
  details: string;
  price: number;
  features: string[];
  emoji: string;
}

const PricingTier: React.FC<PricingTierProps> = ({ title, details, price, features, emoji }) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between w-full max-w-sm mx-auto"
    >
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">{emoji}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{details}</p>
        <div className="text-4xl font-bold text-indigo-600 mb-2">
          £{price}<span className="text-lg font-normal text-gray-500">/month</span>
        </div>
      </div>
      <ul className="text-sm text-gray-600 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className="mr-2 text-green-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={scrollToContact}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300"
      >
        Contact Us
      </button>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const tiers = [
    {
      title: "Basic",
      details: "test",
      price: 9,
      emoji: "🚀",
      features: [
        "Up to 5 projects",
        "1GB storage",
        "Basic analytics",
        "24/7 email support",
      ],
    },
    {
      title: "Pro",
      details: "test",
      price: 29,
      emoji: "💼",
      features: [
        "Unlimited projects",
        "10GB storage",
        "Advanced analytics",
        "Priority email support",
        "API access",
      ],
    },
    {
      title: "Enterprise",
      details: "test",
      price: 99,
      emoji: "🏢",
      features: [
        "Unlimited everything",
        "100GB storage",
        "Custom analytics",
        "24/7 phone support",
        "Dedicated account manager",
        "Custom integrations",
      ],
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4">Plan Pricing</h2>
        <p className="text-xl text-center text-gray-600 mb-12">Choose from different plans to suit your budget</p>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <PricingTier key={tier.title} {...tier} />
          ))}
        </div>
        
          
        
      </div>
    </section>
  );
};

export default PricingSection;