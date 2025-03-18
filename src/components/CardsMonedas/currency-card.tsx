"use client";

import { motion } from "framer-motion";
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

export function CurrencyCard({ pair }: CurrencyCardProps) {
  const [chartData, setChartData] = useState<any>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function fetchChartData() {
      let retries = 3; // 🔄 Intentar 3 veces antes de rendirse
      while (retries > 0) {
        try {
          const response = await fetch(`/api/crypto?base=${pair.base}&quote=${pair.quote}`);
          const data = await response.json();
    
          // ✅ Si la API devuelve un error, lo mostramos y detenemos intentos
          if (!response.ok || data.error || !data.prices.length) {
            throw new Error(data.error || "No se pudo obtener datos.");
          }
    
          setChartData({
            labels: data.prices.map((point) =>
              format(new Date(point.timestamp), "dd MMM", { locale: es })
            ),
            datasets: [
              {
                label: `${pair.base}/${pair.quote} Precio`,
                data: data.prices.map((point) => point.price),
                borderColor: resolvedTheme === "dark" ? "#ffffff" : "#3b82f6",
                backgroundColor: resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(59, 130, 246, 0.1)",
                pointBackgroundColor: resolvedTheme === "dark" ? "#ffffff" : "#3b82f6",
                pointBorderColor: resolvedTheme === "dark" ? "#ffffff" : "#3b82f6",
                tension: 0.3,
              },
            ],
          });
    
          return; // ✅ Éxito, salir del bucle
        } catch (error) {
          console.error("❌ Error al cargar datos del gráfico:", error);
          retries -= 1;
          if (retries === 0) {
            setChartData(null); // 💥 Limpiamos el gráfico si falla todo
          }
          await new Promise((res) => setTimeout(res, 2000)); // 🔄 Esperar antes de reintentar
        }
      }
    }
    fetchChartData();
  }, [pair.base, pair.quote, resolvedTheme]);

  return (
    <motion.div layout className="relative cursor-pointer rounded-lg bg-white dark:bg-gray-900 p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{pair.base.toUpperCase()}/{pair.quote.toUpperCase()}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pair.value.toFixed(2)}</p>
        </div>
      </div>

      <div className="h-64 w-full">
        {chartData ? <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p className="text-center text-gray-500">Cargando...</p>}
      </div>
    </motion.div>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

