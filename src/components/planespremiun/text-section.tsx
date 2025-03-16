'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TextSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-300 to-gray-100 dark:from-gray-800 dark:to-gray-950 dark:text-white px-4 py-24">
      <div ref={ref} className="mx-auto max-w-4xl space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Acceso a contenido original.
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 md:text-2xl">
            Mira todo el contenido con filtros avanzados y sin conexión.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            En cualquer sitio.
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 md:text-2xl">
            Comparte Lure+ con tu familia.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

