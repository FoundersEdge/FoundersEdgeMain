import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We begin with an in-depth consultation to understand your unique needs, goals, and vision for your project.",
    icon: "💬"
  },
  {
    number: "02",
    title: "Open Discussion",
    description: "We engage in an open dialogue, exploring various ideas and possibilities to shape the perfect solution for you.",
    icon: "🤝"
  },
  {
    number: "03",
    title: "Development",
    description: "Our expert team gets to work, bringing your vision to life with cutting-edge technology and best practices.",
    icon: "⚙️"
  },
  {
    number: "04",
    title: "Fine Tuning & Launch",
    description: "We meticulously refine every detail and prepare for a seamless launch, ensuring your project exceeds expectations.",
    icon: "🚀"
  }
];

const ProcessStep: React.FC<{ step: typeof steps[0]; isEven: boolean }> = ({ step, isEven }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row items-center md:items-start gap-8 py-16 md:py-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full md:w-1/2 flex justify-center">
        <span className="text-8xl">{step.icon}</span>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-3xl font-bold mb-2 text-indigo-600">
          {step.number}
        </h3>
        <h4 className="text-2xl font-semibold mb-4 text-gray-800">{step.title}</h4>
        <p className="text-gray-600 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-purple-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-5xl font-extrabold text-center mb-3 text-neutral-700 tracking-tight">
          How It Works
        </h2>
        <div className="space-y-16 md:space-y-0">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} isEven={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;