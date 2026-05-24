import React from "react";
import Image from "next/image";
import Link from "next/link";

const EarnSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-purple-950/10 to-black">
      {/* Background effects similar to hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            How it <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">works?</span>
          </h2>
          <p className="text-xl text-gray-300">Step-by-Step NFT Minting Process.</p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-20">
          
          {/* Step 1 */}
          <div className="relative w-full max-w-sm group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-900/40 backdrop-blur-sm">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white text-center mb-4">Connect Your Wallet</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Secure wallet connection to access rewards, staking and platform access.
              </p>
            </div>
          </div>

          {/* Arrow - Desktop */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md" />
              <svg className="w-12 h-12 text-purple-500 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative w-full max-w-sm group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-900/40 backdrop-blur-sm">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white text-center mb-4">Stake Clara Card</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Stake your Clara Card to earn Clara tokens.
              </p>
            </div>
          </div>

          {/* Arrow - Desktop */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-md" />
              <svg className="w-12 h-12 text-pink-500 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative w-full max-w-sm group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-900/40 backdrop-blur-sm">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white text-center mb-4">Earn Rewards & Join Giveaways</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Stake your assets and unlock exclusive rewards and giveaways.
              </p>
            </div>
          </div>
        </div>

        {/* Discord CTA */}
        <div className="mt-20">
          <div className="relative group max-w-4xl mx-auto">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Discord Icon */}
                <div className="p-8 lg:p-12 flex justify-center items-center bg-gradient-to-br from-purple-900/20 to-black/40">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl" />
                    <Image
                      src="/images/discord.svg"
                      width={160}
                      height={160}
                      alt="Discord Icon"
                      className="h-[120px] lg:h-[160px] w-auto relative z-10"
                    />
                  </div>
                </div>

                {/* Text and Button */}
                <div className="p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    Need <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Help?</span>
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-md">
                    Discover the possibilities of digital art and NFT innovation with us.
                  </p>
                  <Link
                    href="https://discord.gg/fsP6VrnD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white flex items-center gap-3"
                  >
                    <Image
                      src="/images/discord.svg"
                      alt="Discord"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    Join Discord
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarnSection;