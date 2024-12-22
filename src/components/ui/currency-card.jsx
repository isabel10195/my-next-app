'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function CurrencyCard({ pair }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
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
              layoutId={`currency-${pair.base}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{pair.base}/{pair.quote}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{pair.change.toFixed(4)}</p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-60 rounded-lg bg-gray-100 dark:bg-gray-800">
                {/* Chart placeholder */}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Volume (24h)</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">${Math.floor(Math.random() * 1000000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">${Math.floor(Math.random() * 1000000000)}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{pair.base}/{pair.quote}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pair.value.toFixed(1)}%</p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {pair.change.toFixed(4)}
        </div>
      </div>
    </motion.div>
  )
}
