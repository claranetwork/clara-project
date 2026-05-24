import HeroSection from "@/components/sections/hero";
import ContactSection from "@/components/sections/contact";
import SponsorSection from "@/components/sections/sponsor";
import PopularSection from "@/components/sections/popular";
import DiscoverSection from "@/components/sections/discover";
//import GettingStarted from "@/components/sections/get-started";
import Discord from "@/components/sections/joinDiscord";

export default function Home() {
  return (
    <main className="w-full flex flex-col relative overflow-hidden">
      <HeroSection />
      {/* <PopularSection /> */}
      <DiscoverSection />
      <Discord />
      {/* <GettingStarted /> */}
      {/* 
      
       
      <SponsorSection />
      <ContactSection /> */}
    </main>
  );
}
