"use client";
import React, { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { cn } from "../../../public/utils/cn"
import Link from "next/link";
import { FaBars, FaTimes, FaHome, FaUser, FaEnvelope, FaCode } from 'react-icons/fa';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (current > 0.05) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  });

  const iconMap = {
    Home: <FaHome />,
    About: <FaUser />,
    Contact: <FaEnvelope />,
    Projects: <FaCode />,
  };

  return (
    <>
      <motion.nav
        initial={{ height: 80, backgroundColor: "rgba(0, 0, 0, 0)" }}
        animate={{ 
          height: isScrolled ? 60 : 80,
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.0)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8",
          isScrolled ? "shadow-md backdrop-blur-sm" : "",
          className
        )}
      >
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={cn(
            "font-bold transition-all duration-300",
            isScrolled ? "text-2xl" : "text-3xl"
          )}>Jonny</span>
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
                className={cn(
                  "flex items-center",
                  isScrolled ? "text-sm py-1" : "text-base py-2"
                )}
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
            className="fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 z-50 p-4"
          >
            <motion.button
              className="absolute top-4 right-4 text-white text-2xl"
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
                    className="text-white hover:text-gray-300 transition-all duration-300 flex items-center text-lg"
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