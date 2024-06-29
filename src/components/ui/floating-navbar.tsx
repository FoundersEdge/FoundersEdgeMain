"use client";
import React, { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../../public/utils/cn"
import Link from "next/link";

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

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (current > 0.05) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  });

  return (
    <motion.nav
      initial={{ height: 64, backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{ 
        height: isScrolled ? 48 : 64,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8",
        isScrolled ? "shadow-md backdrop-blur-sm" : "",
        className
      )}
    >
      <div className="flex items-center">
        <span className={cn(
          "font-bold transition-all duration-300",
          isScrolled ? "text-lg" : "text-xl"
        )}>Jonny</span>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {navItems.map((navItem, idx) => (
          <Link
            key={`nav-link-${idx}`}
            href={navItem.link}
            className={cn(
              "text-gray-800 hover:text-gray-600 transition-all duration-300",
              isScrolled ? "text-sm py-1" : "text-base py-2"
            )}
          >
            {navItem.name}
          </Link>
        ))}
        
      </div>
    </motion.nav>
  );
};