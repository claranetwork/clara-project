import { Flex } from "@/components/elements";
import AnimatedCategoryList from "./tab-items";
import { FadeIn } from "@/components/animated/fade-in";
import nftData from "@/configs/nfts.json";

export default function DiscoverSection() {
  const nfts = nftData;
  
  return (
    <section className="relative py-20">
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-purple-950/20" />
      
      {/* Additional gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-purple-900/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <Flex className="flex-col items-center gap-16">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Explore <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NFTs</span>
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl text-gray-400">
                Discover unique digital collectibles and start your NFT journey
              </p>
            </FadeIn>
          </div>

          {/* NFT Grid */}
          <AnimatedCategoryList items={nfts} />
        </Flex>
      </div>
    </section>
  );
}