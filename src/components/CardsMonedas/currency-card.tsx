"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTheme } from "next-themes";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Pair {
  base: string;
  quote: string;
  value: number;
  change: number;
}

interface CurrencyCardProps {
  pair: Pair;
}

const cacheKey = "currencyDataCache";

const getCurrentTimestamp = () => (typeof window !== "undefined" ? performance.now() : new Date().getTime());

async function fetchWithCache(url: string, cacheDuration = 600000) {
  const cachedData = sessionStorage.getItem(cacheKey);
  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (getCurrentTimestamp() - timestamp < cacheDuration) {
      return data;
    }
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: getCurrentTimestamp(), data }));
    return data;
  } catch (error) {
    console.warn("Error al obtener datos de la API, usando valores dummy.");
    return { prices: Array(7).fill([getCurrentTimestamp(), Math.random() * 100]) };
  }
}

export function CurrencyCard({ pair }: CurrencyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return; // Evitar ejecución en SSR

    async function fetchChartData() {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/${pair.base.toLowerCase()}/market_chart?vs_currency=${pair.quote.toLowerCase()}&days=7`;
        const data = await fetchWithCache(url);
        if (!data.prices) throw new Error("No hay datos disponibles.");

        setChartData({
          labels: data.prices.map((point: [number, number]) => format(new Date(point[0]), "dd MMM", { locale: es })),
          datasets: [
            {
              label: `${pair.base}/${pair.quote} Precio`,
              data: data.prices.map((point) => point[1]),
              borderColor: resolvedTheme === "dark" ? "#ffffff" : "#3b82f6",
              backgroundColor: resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(59, 130, 246, 0.2)",
              pointBackgroundColor: resolvedTheme === "dark" ? "#ffffff" : "#3b82f6",
              pointBorderColor: resolvedTheme === "dark" ? "#ffffff" : "#3b82f6",
            },
          ],
        });
      } catch (error: any) {
        console.error("Error al cargar datos del gráfico:", error.message);
        setError(`No se pudo obtener datos para ${pair.base}/${pair.quote}.`);
      }
    }

    fetchChartData();
  }, [pair.base, pair.quote, resolvedTheme]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: resolvedTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: resolvedTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
      y: {
        ticks: {
          color: resolvedTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
    },
  };

  return (
    <motion.div
      layout
      className="relative cursor-pointer rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
      whileHover={{ scale: 1.02 }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-full max-w-lg rounded-lg bg-white p-6 dark:bg-gray-900"
              layoutId={`currency-${pair.base}-${pair.quote}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {pair.base}/{pair.quote}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {pair.change.toFixed(4)}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-64 w-full">
                {chartData ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <p className="text-center text-gray-500">Cargando gráfico...</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {pair.base}/{pair.quote}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {pair.value.toFixed(1)}%
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {pair.change.toFixed(4)}
        </div>
      </div>

      <div className="mt-4 h-64 w-full">
        {chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-500">Cargando gráfico...</p>
        )}
      </div>
    </motion.div>
  );
}
