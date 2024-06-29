"use client"
import { FloatingNavDemo } from "@/components/Navbar";
import { Hero } from "../components/Hero";
import Image from "next/image";
import PricingSection from "@/components/Pricing";

export default function Home() {
  return (
    <>
    <FloatingNavDemo/>
    <Hero />
    <PricingSection/>
    </>
  );
}