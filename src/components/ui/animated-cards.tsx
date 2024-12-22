'use client'

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface AnimatedCardProps {
  title: string
  route: string
  className?: string
  children: React.ReactNode
}

export function AnimatedCard({ title, route, className = "", children }: AnimatedCardProps) {
  const router = useRouter()

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(route)}
      className={`cursor-pointer rounded-xl bg-white/10 p-6 backdrop-blur-sm 
        transition-colors hover:bg-white/20 ${className}`}
    >
      <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>
      {children}
    </motion.div>
  )
}

