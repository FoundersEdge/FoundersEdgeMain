"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../../public/utils/cn";
import Link from "next/link";
import { FaBars, FaTimes, FaHome, FaUser, FaEnvelope, FaCode } from 'react-icons/fa';

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

const iconMap: Record<string, JSX.Element> = {
  Home: <FaHome />,
  About: <FaUser />,
  Contact: <FaEnvelope />,
  Projects: <FaCode />,
};

export const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className }) => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      if (current > lastScrollY && current > 100) {
        setIsVisible(false);
      } else if (current < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(current);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 bg-white shadow-md",
          className
        )}
      >
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl font-bold">Jonny</span>
        </motion.div>
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((navItem, idx) => (
            <motion.div
              whileHover={{ scale: 1.10 }}
              key={`nav-link-${idx}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={navItem.link}
                className="flex items-center text-sm py-1"
              >
                {iconMap[navItem.name]} <span className="ml-2">{navItem.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.button
          className="md:hidden text-2xl"
          onClick={() => setIsSidebarOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaBars />
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-4"
          >
            <motion.button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setIsSidebarOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
            <div className="mt-16 space-y-6">
              {navItems.map((navItem, idx) => (
                <motion.div
                  key={`sidebar-link-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={navItem.link}
                    className="text-gray-800 hover:text-gray-600 transition-all duration-300 flex items-center text-lg"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {iconMap[navItem.name]} <span className="ml-2">{navItem.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};