// pages/planes/index.tsx
'use client'
import ReactPlayer from 'react-player';
import HeroSection from "@/components/planespremiun/hero.section";
import TextSection from "@/components/planespremiun/text-section";
import PricingSection from "@/components/planespremiun/pricing-section";

export default function PlanesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <HeroSection />
      <TextSection />
      <PricingSection />
    </main>
  );
}
