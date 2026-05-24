"use client";

import { Home, Sparkles, Clock, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function ClaraCardPage() {
  const features = [
    { icon: <Shield className="w-6 h-6" />, text: "Secure Digital Identity" },
    { icon: <Sparkles className="w-6 h-6" />, text: "Exclusive NFT Badges" },
    { icon: <Users className="w-6 h-6" />, text: "Community Recognition" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950/20 via-black to-purple-950/20 flex flex-col items-center justify-center px-4 pt-32 pb-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Animated text */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Clara Card
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Coming Soon
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 max-w-lg mx-auto">
          We&apos;re working hard to bring you an amazing Clara Card experience. Stay tuned!
        </p>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-purple-900/30 to-black/50 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-400/60 transition-all duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl">
                  {feature.icon}
                </div>
                <p className="text-gray-300">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="text-gray-400 text-sm mb-2">Development Progress</div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '85%' }}></div>
          </div>
          <div className="text-gray-400 text-sm mt-2">85% Complete</div>
        </div>

        {/* Back to home button */}
        <div className="mt-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}