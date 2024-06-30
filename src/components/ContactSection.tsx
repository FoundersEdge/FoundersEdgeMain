"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  const inputVariants = {
    initial: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0.1)" },
    hover: { scale: 1.02, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" },
    focus: { scale: 1.02, boxShadow: "0px 5px 10px rgba(0,0,0,0.2)" }
  };

  return (
    <section id="contact" className="py-20 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
  
    <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          className="text-3xl font-bold text-center text-gray-800 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Lets book in a call!
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Let me know your vision and I will be in touch within 24 hours to discuss your needs
        </motion.p>
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-4">
            <motion.div className="relative flex-1"
              initial="initial"
              whileHover="hover"
              animate={focusedField === 'name' ? "focus" : "initial"}
              variants={inputVariants}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-transparent transition duration-200"
              />
              <AnimatePresence>
                {(focusedField !== 'name' && !formData.name) && (
                  <motion.label
                    htmlFor="name"
                    className="absolute left-4 top-2 text-gray-500 pointer-events-none"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    Full Name
                  </motion.label>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div className="relative flex-1"
              initial="initial"
              whileHover="hover"
              animate={focusedField === 'email' ? "focus" : "initial"}
              variants={inputVariants}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-transparent transition duration-200"
              />
              <AnimatePresence>
                {(focusedField !== 'email' && !formData.email) && (
                  <motion.label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-gray-500 pointer-events-none"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    Email
                  </motion.label>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <motion.div className="relative"
            initial="initial"
            whileHover="hover"
            animate={focusedField === 'message' ? "focus" : "initial"}
            variants={inputVariants}
          >
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-transparent transition duration-200 resize-none"
            ></textarea>
            <AnimatePresence>
              {(focusedField !== 'message' && !formData.message) && (
                <motion.label
                  htmlFor="message"
                  className="absolute left-4 top-2 text-gray-500 pointer-events-none"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Your message here...
                </motion.label>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full px-4 py-2 mb-10 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>
        
        <AnimatePresence>
  {isSubmitted && (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-0 left-0 right-0 mt-40 mx-auto max-w-md p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 10 }}
          className="mr-3 text-2xl"
        >
          🎉
        </motion.div>
        <div>
          <p className="font-bold text-lg">Woohoo! Message sent!</p>
          <p className="text-sm">We will make sure to get back to you within 24hours! 🐆☕</p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </section>
  );
};

export default ContactSection;