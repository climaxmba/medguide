import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/pages/landing/HeroSection";
import { FeaturesSection } from "@/components/pages/landing/FeaturesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
      </main>
    </>
  );
}
