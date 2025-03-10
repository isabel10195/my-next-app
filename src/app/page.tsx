"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";

import { ArticleCard } from "@/components/CardPrincipal/article-card";
import { CurrencyCard } from "@/components/CardsMonedas/currency-card";
import { SocialLinks } from "@/components/CardRedesSociales/social-links";
import { CardPensamientos } from "@/components/CardPensamientos/CardPensamientos";

import CardAutorizacion from "@/components/ui/cardAutorizacion";
import CardEventos from "@/components/CardEventosPorUsuario/CardEventos";
import CardCerrarSesion from "@/components/CardCerrarSesion/card-cerrar-sesion";
import CardinnfoSesion from "@/components/CardInfoSesion/card-infosesion";
import CombinedNavbar from "@/components/navbar/combinednavbar";
import { TweetCard } from "@/components/CardPrincipal/tweet-cards"
import { fetchTweets, fetchPopularTweets } from "@/server/service/tweetService";
import Footer from "@/components/footer";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  { base: "eur", quote: "usd", value: 1.1, change: 0.8745 },
  { base: "usd", quote: "eur", value: 0.92, change: 1.0321 },
];

export default function HomePage() {
  // Usar el AuthContext para obtener el usuario
  const { user, loading: authLoading } = useAuth();
  const isAuthenticated = Boolean(user);

  // Estado para la vista expandida de un ArticleCard
  const [expandedArticle, setExpandedArticle] = useState<React.ReactNode | null>(null);
  // Estados para los tweets y la carga
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar tweets según la autenticación
  useEffect(() => {
    if (typeof window === "undefined") return; // Evitar ejecución en SSR
    
    async function loadTweets() {
      setTweets([]); // Evitar datos inconsistentes
      setLoading(true);
      try {
        let data = isAuthenticated ? await fetchTweets() : await fetchPopularTweets();
        setTweets(data.tweets.sort((a, b) => b.num_likes - a.num_likes));
      } catch (error) {
        console.error("Error al cargar los tweets:", error);
      } finally {
        setLoading(false);
      }
    }
  
    if (!authLoading) {
      loadTweets();
    }
  }, [isAuthenticated, authLoading]);
  

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
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              {expandedArticle}
            </div>
          </motion.div>
        ) : (
          <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto p-4">
            {/* Diseño para ordenador y tablet */}
            <div className="hidden lg:grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {loading || tweets.length < 1 ? (
                <>
                  <ArticleCard
                    key={`static-article-${isAuthenticated}`}
                    large
                    title="Turn Your Devices From Distractions Into Time Savers Either"
                    excerpt="Every January, I usually purge old snail mail, clothes and unwanted knickknacks to start the year anew. This time, I focused on my digital spaces instead."
                    author="Yagami Souichirou"
                    date="January 30, 2024"
                    readTime="7 min read"
                    views={38}
                    image="https://img.freepik.com/vector-premium/fondo-gradiente-color-azul-sencillo-textura-suave_768131-988.jpg?semt=ais_hybrid"
                    onClick={setExpandedArticle}
                    isAuthenticated={isAuthenticated}
                  />
                  <div className="space-y-6">
                    <ArticleCard
                      key={`static-article2-${isAuthenticated}`}
                      large
                      title="Draw Inspiration From Vibrancy"
                      excerpt="Finding beauty in the simplest forms of nature"
                      author="Lind Tailor"
                      date="January 28, 2024"
                      readTime="3 min read"
                      views={17}
                      image="https://e0.pxfuel.com/wallpapers/694/480/desktop-wallpaper-blue-color-gradient-1-data-id-navy-blue-dark-blue-gradient.jpg"
                      onClick={setExpandedArticle}
                      isAuthenticated={isAuthenticated}
                    />
                    <CardPensamientos key={`pensamientos-${isAuthenticated}`} isAuthenticated={isAuthenticated} />
                    <CardAutorizacion />
                  </div>
                </>
              ) : (
                <>
                  <ArticleCard
                    key={`dynamic-article-${isAuthenticated}`}
                    large
                    title="Turn Your Devices From Distractions Into Time Savers Either"
                    excerpt="Every January, I usually purge old snail mail, clothes and unwanted knickknacks to start the year anew. This time, I focused on my digital spaces instead."
                    author="Yagami Souichirou"
                    date="January 30, 2024"
                    readTime="7 min read"
                    views={38}
                    image="https://img.freepik.com/vector-premium/fondo-gradiente-color-azul-sencillo-textura-suave_768131-988.jpg?semt=ais_hybrid"
                    onClick={setExpandedArticle}
                    isAuthenticated={isAuthenticated}
                  />
                  <div className="space-y-6">
                    <ArticleCard
                      key={`tweet-article-${isAuthenticated}`}
                      large
                      tweet={tweets[0]}
                      previewTitle={
                        !isAuthenticated ? "Tweets más populares" : "Tus tweets más populares"
                      }
                      onClick={() => {
                        // Definir tweetData para el gráfico de evolución de likes
                        const tweetData = tweets.map((tweet) => ({
                          name: new Date(tweet.created_at).toLocaleDateString(),
                          likes: tweet.num_likes || 0, // Asegurar que 'num_likes' es un número válido
                        }));

                        // Calcular el ranking de usuarios más influyentes
                        const userInfluence = tweets.reduce<Record<string, number>>((acc, tweet) => {
                          acc[tweet.user_handle] = (acc[tweet.user_handle] || 0) + (tweet.num_likes || 0);
                          return acc;
                        }, {});

                        const sortedUsers = Object.entries(userInfluence)
                          .sort((a, b) => Number(b[1]) - Number(a[1])) // Convertir a número explícitamente
                          .slice(0, 3);

                        setExpandedArticle(
                          <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {!isAuthenticated ? "Tweets más populares" : "Tus tweets más populares"}
                            </h2>

                            {/* Mostrar Top 3 tweets más populares */}
                            {tweets.slice(0, 3).map((tweet) => (
                              <TweetCard key={tweet.tweet_id} tweet={tweet} showStats={true} />
                            ))}

                            {/* Gráfico de evolución de likes */}
                            <h2 className="text-xl font-bold">Gráfico de evolución de likes</h2>
                            <ResponsiveContainer width="100%" height={200}>
                              <LineChart data={tweetData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="likes" stroke="#8884d8" />
                              </LineChart>
                            </ResponsiveContainer>

                            {/* Ranking de usuarios más influyentes */}
                            <h2 className="text-xl font-bold">Usuarios más influyentes</h2>
                            <ul>
                              {sortedUsers.map(([user, likes]) => (
                                <li key={user} className="text-sm text-gray-600 dark:text-gray-300">
                                  🏆 {user}: {Number(likes)} likes totales
                                </li>
                              ))}
                            </ul>
                            
                          </div>
                        );
                      }}
                    />
                    <CardPensamientos key={`pensamientos2-${isAuthenticated}`} isAuthenticated={isAuthenticated} />
                    <CardAutorizacion />
                  </div>
                </>
              )}
              <div className="space-y-6">
                <CardEventos />
              </div>
              <div className="relative grid grid-cols-2 gap-4">
                {currencyPairs.map((pair) => (
                  <CurrencyCard key={`${pair.base}-${pair.quote}`} pair={pair} />
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
            {/* Diseño para móvil */}
            <div className="grid grid-cols-1 gap-6 lg:hidden">
              <div className="space-y-6">
                {loading || tweets.length < 2 ? (
                  <>
                    <ArticleCard
                      key={`mobile-static-article-${isAuthenticated}`}
                      large
                      title="Turn Your Devices From Distractions Into Time Savers Either"
                      excerpt="Every January, I usually purge old snail mail, clothes and unwanted knickknacks to start the year anew. This time, I focused on my digital spaces instead."
                      author="Yagami Souichirou"
                      date="January 30, 2024"
                      readTime="7 min read"
                      views={38}
                      image="https://img.freepik.com/vector-premium/fondo-gradiente-color-azul-sencillo-textura-suave_768131-988.jpg?semt=ais_hybrid"
                      onClick={setExpandedArticle}
                      isAuthenticated={isAuthenticated}
                    />
                    <ArticleCard
                      key={`mobile-static-article2-${isAuthenticated}`}
                      large
                      title="Draw Inspiration From Vibrancy"
                      excerpt="Finding beauty in the simplest formas de la naturaleza"
                      author="Lind Tailor"
                      date="January 28, 2024"
                      readTime="3 min read"
                      views={17}
                      image="https://e0.pxfuel.com/wallpapers/694/480/desktop-wallpaper-blue-color-gradient-1-data-id-navy-blue-dark-blue-gradient.jpg"
                      onClick={setExpandedArticle}
                      isAuthenticated={isAuthenticated}
                    />
                  </>
                ) : (
                  <>
                    <ArticleCard
                      key={`mobile-tweet-article-${isAuthenticated}`}
                      large
                      tweet={tweets[0]}
                      onClick={setExpandedArticle}
                      isAuthenticated={isAuthenticated}
                    />
                    <ArticleCard
                      key={`mobile-tweet-article2-${isAuthenticated}`}
                      large
                      tweet={tweets[1]}
                      onClick={setExpandedArticle}
                      isAuthenticated={isAuthenticated}
                    />
                  </>
                )}
                <CardPensamientos key={`mobile-pensamientos-${isAuthenticated}`} isAuthenticated={isAuthenticated} />
                <CardAutorizacion />
                <div className="relative grid grid-cols-2 gap-4 mt-6">
                  {currencyPairs.map((pair) => (
                    <CurrencyCard key={`${pair.base}-${pair.quote}`} pair={pair} />
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