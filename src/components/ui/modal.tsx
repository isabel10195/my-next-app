"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ✖
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
