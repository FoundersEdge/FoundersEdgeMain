"use client";
import React from "react";
import { SparklesCore } from "../components/ui/Sparkles";

export function SparklesPreview() {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full max-w-[50rem] flex flex-col items-center mt-40 justify-center">
        <h1 className="md:text-7xl text-4xl lg:text-8xl font-extrabold text-center text-gray-800 relative z-20 mb-8 tracking-tight">
          Founders Edge
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 text-center mb-12 max-w-2xl">
          Big old test
        </p>
        <div className="w-full h-[40vh] relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent h-px w-1/4" />

          {/* the sparkles */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.3}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFA500"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-gray-100 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  );
}