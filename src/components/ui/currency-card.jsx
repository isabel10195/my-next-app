import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export function CurrencyCard({ pair }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    async function fetchChartData() {
      try {
        const baseCurrency = pair.base.toLowerCase();
        const quoteCurrency = pair.quote.toLowerCase();
  
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${baseCurrency}/market_chart?vs_currency=${quoteCurrency}&days=7`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del gráfico");
        }
        const data = await response.json();
  
        const prices = data.prices.map((point) => point[1]);
        const labels = data.prices.map((point) =>
          new Date(point[0]).toLocaleDateString()
        );
  
        setChartData({
          labels,
          datasets: [
            {
              label: `${pair.base}/${pair.quote} Precio`,
              data: prices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.3,
            },
          ],
        });
        setError(null); // Resetear error si la llamada es exitosa
      } catch (error) {
        console.error("Error al cargar datos del gráfico:", error);
        setError("Error al cargar los datos. Intenta de nuevo.");
      }
    }
  
    fetchChartData();
  }, [pair.base, pair.quote]);
  
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
              <div className="h-60 rounded-lg bg-gray-100 dark:bg-gray-800">
                {chartData ? (
                  <Line data={chartData} />
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

      {/* Gráfico debajo de la información */}
      <div className="mt-4">
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <p className="text-center text-gray-500">Cargando gráfico...</p>
        )}
      </div>
    </motion.div>
  );
}
