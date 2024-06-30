"use client"
import { FloatingNavDemo } from "@/components/Navbar";
import { Hero } from "../components/Hero";
import Image from "next/image";
import PricingSection from "@/components/Pricing";
import ContactSection from "@/components/ContactSection";
import HowItWorks from "@/components/HowItWorks";



export default function Home() {
  return (
    <>
    <FloatingNavDemo/>
    <Hero />
    <HowItWorks/>
    <PricingSection/>
    <ContactSection/>
    </>
  );
}