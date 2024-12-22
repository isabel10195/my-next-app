'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Icons } from "./icons"

export function ArticleCard({ title, excerpt, author, date, readTime, views, image, large, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const content = (
    <>
      {image && (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <img
            src="/placeholder.svg"
            alt={author}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{author}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-300">{date}</p>
          </div>
        </div>
        <h2 className={`mb-2 font-serif ${large ? 'text-4xl' : 'text-2xl'} font-bold text-gray-900 dark:text-white`}>
          {title}
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">{excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Icons.views className="h-4 w-4" />
            {views}
          </div>
          <div className="flex items-center gap-1">
            <Icons.clock className="h-4 w-4" />
            {readTime}
          </div>
        </div>
      </div>
    </>
  )

  const handleClick = () => {
    if (onClick) {
      onClick(content)
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <AnimatePresence>
      <motion.div
        layout
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900 
          ${large ? 'col-span-2' : ''}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`relative ${isExpanded ? 'max-h-screen' : ''}`} // Expande la tarjeta al hacer clic
        >
          {content}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
