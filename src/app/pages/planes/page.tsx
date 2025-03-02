// pages/planes/page.tsx
'use client'

import HeroSection from "@/components/planespremiun/hero.section";
import TextSection from "@/components/planespremiun/text-section";
import PricingSection from "@/components/planespremiun/pricing-section";
import PagoCard from "@/components/planes_c/pagocard";
import Link from "next/link"; // Importamos Link para navegación
import BackButton from "@/components/ui/BackButton"; // Ajusta la ruta según tu estructura de carpetas

export default function PlanesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
    <BackButton href="/" />
    <HeroSection />
    <TextSection />
    <PricingSection />
    <PagoCard />
  </main>
  );
}
