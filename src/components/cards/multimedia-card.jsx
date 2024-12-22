'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const MultimediaCard = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div
      className="max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-4"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Current Track"
            className="w-16 h-16 rounded-lg"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-white">Daily Mix</h3>
            <p className="text-sm text-gray-200">12 Tracks</p>
          </div>
        </div>
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.427 3.688A1 1 0 017 13.963V10.037a1 1 0 011.325-.962l6.427 3.688a1 1 0 010 1.776z"></path>
          </svg>
        </button>
      </div>
      <div className="mb-4">
        <h4 className="text-white text-sm">Frontend Radio</h4>
        <div className="relative w-full h-1 bg-gray-200 rounded">
          <div className="absolute top-0 h-1 w-1/3 bg-white rounded"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>1:23</span>
          <span>4:32</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-white">
        <button>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0l-7 7m7-7l-7-7"></path>
          </svg>
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.427 3.688A1 1 0 017 13.963V10.037a1 1 0 011.325-.962l6.427 3.688a1 1 0 010 1.776z"></path>
            </svg>
          )}
        </button>
        <button>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7"></path>
          </svg>
        </button>
        <button>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0l-7 7m7-7l-7-7"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

export default MultimediaCard
