// pages/planes/page.tsx
'use client'

import HeroSection from "@/components/planespremiun/hero.section";
import TextSection from "@/components/planespremiun/text-section";
import PricingSection from "@/components/planespremiun/pricing-section";
import PagoCard from "@/components/planes_c/pagocard";
import Link from "next/link"; // Importamos Link para navegación

export default function PlanesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
        {/* Flecha de navegación al inicio */}
    <Link href="/" passHref>
        <div className="absolute top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </Link>
       <HeroSection />
       <TextSection />
       <PricingSection />
       <PagoCard/>
    </main>
  );
}
