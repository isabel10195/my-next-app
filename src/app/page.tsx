"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ArticleCard } from "@/components/CardPrincipal/article-card";
import { CurrencyCard } from "@/components/CardsMonedas/currency-card";
import { SocialLinks } from "@/components/CardRedesSociales/social-links";
import { CardPensamientos } from "@/components/CardPensamientos/CardPensamientos";

import CardAutorizacion from "@/components/ui/cardAutorizacion";
import CardEventos from "@/components/CardEventosPorUsuario/CardEventos";
import CardCerrarSesion from "@/components/CardCerrarSesion/card-cerrar-sesion";
import CardinnfoSesion from "@/components/CardInfoSesion/card-infosesion";
import CombinedNavbar from "@/components/navbar/combinednavbar";

import Footer from "@/components/footer";

// Definir el tipo de los objetos en currencyPairs
interface CurrencyPair {
  base: string;
  quote: string;
  value: number;
  change: number;
}

const currencyPairs: CurrencyPair[] = [
  { base: "bitcoin", quote: "usd", value: 5.2, change: 0.9715 },
  { base: "ethereum", quote: "usd", value: 3.8, change: 1.0937 },
  { base: "eur", quote: "usd", value: 1.1, change: 0.8745 }, // Agregada EUR/USD
  { base: "usd", quote: "eur", value: 0.92, change: 1.0321 }, // Agregada USD/EUR
];

export default function HomePage() {
  // El tipo del estado `expandedArticle` es `React.ReactNode | null` para aceptar cualquier tipo de contenido
  const [expandedArticle, setExpandedArticle] =
    useState<React.ReactNode | null>(null);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950">
      <CombinedNavbar />
      <AnimatePresence>
        {expandedArticle ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900"
          >
            <div className="container mx-auto p-4">
              <button
                onClick={() => setExpandedArticle(null)}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              {expandedArticle}
            </div>
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto p-4"
          >
            {/* Diseño ordenador y tablet */}
            <div className="hidden lg:grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <ArticleCard
                large
                title="Turn Your Devices From Distractions Into Time Savers Either"
                excerpt="Every January, I usually purge old snail mail, clothes and unwanted knickknacks to start the year anew. This time, I focused on my digital spaces instead."
                author="Yagami Souichirou"
                date="January 30, 2024"
                readTime="7 min read"
                views={38}
                image="https://img.freepik.com/vector-premium/fondo-gradiente-color-azul-sencillo-textura-suave_768131-988.jpg?semt=ais_hybrid"
                onClick={setExpandedArticle}
              />

              <div className="space-y-6">
                <ArticleCard
                  large
                  title="Draw Inspiration From Vibrancy"
                  excerpt="Finding beauty in the simplest forms of nature"
                  author="Lind Tailor"
                  date="January 28, 2024"
                  readTime="3 min read"
                  views={17}
                  image="https://e0.pxfuel.com/wallpapers/694/480/desktop-wallpaper-blue-color-gradient-1-data-id-navy-blue-dark-blue-gradient.jpg"
                  onClick={setExpandedArticle}
                />
                <CardPensamientos />
                <CardAutorizacion />
              </div>

              <div className="space-y-6">
              <CardEventos/>
              </div>
              <div className="relative grid grid-cols-2 gap-4">
                {currencyPairs.map((pair) => (
                  <CurrencyCard
                    key={`${pair.base}-${pair.quote}`}
                    pair={pair}
                  />
                ))}
              </div>

              <div>
                <CardinnfoSesion />
                <br />
                <CardCerrarSesion />
                <br />
                <SocialLinks />
              </div>
            </div>
 {/*---------------------------------------------------------------------------------------------------------------------- Diseño movil ----------------------------------------------------------------------------------------------------------------------*/}
            <div className="grid grid-cols-1 gap-6 lg:hidden">
              <div className="space-y-6">
                <ArticleCard
                  large
                  title="Turn Your Devices From Distractions Into Time Savers Either"
                  excerpt="Every January, I usually purge old snail mail, clothes and unwanted knickknacks to start the year anew. This time, I focused on my digital spaces instead."
                  author="Yagami Souichirou"
                  date="January 30, 2024"
                  readTime="7 min read"
                  views={38}
                  image="https://img.freepik.com/vector-premium/fondo-gradiente-color-azul-sencillo-textura-suave_768131-988.jpg?semt=ais_hybrid"
                  onClick={setExpandedArticle}
                />

                <ArticleCard
                  large
                  title="Draw Inspiration From Vibrancy"
                  excerpt="Finding beauty in the simplest forms of nature"
                  author="Lind Tailor"
                  date="January 28, 2024"
                  readTime="3 min read"
                  views={17}
                  image="https://e0.pxfuel.com/wallpapers/694/480/desktop-wallpaper-blue-color-gradient-1-data-id-navy-blue-dark-blue-gradient.jpg"
                  onClick={setExpandedArticle}
                />
                <CardPensamientos />
                <CardAutorizacion />

                <div className="space-y-6">
                
                  <h1>TIU MAMA</h1>
                </div>

                <div className="relative grid grid-cols-2 gap-4 mt-6">
                  {currencyPairs.map((pair) => (
                    <CurrencyCard
                      key={`${pair.base}-${pair.quote}`}
                      pair={pair}
                    />
                  ))}
                </div>
                    
                <div className="flex justify-center items-center">
                  <CardinnfoSesion />
                  <CardCerrarSesion />
                </div>
                <div className="flex justify-center items-center">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
