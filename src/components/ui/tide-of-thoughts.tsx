'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface TideOfThoughtsProps {
  onClick?: (content: ReactNode) => void;
}

export function TideOfThoughts({ onClick }: TideOfThoughtsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const content = (
    <>
      <h3 className="mb-4 text-xl font-serif text-gray-900 dark:text-white">Tide of Thoughts</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        Get the View Island Journal's opinion columnists, editorials, op-eds, letters for €2.50
      </p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>2,830 articles</span>
        <span>175 authors</span>
      </div>
    </>
  );

  // const handleClick = () => {
  //   if (onClick) {
  //     onClick(content);
  //   }
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <AnimatePresence>
      <motion.div
        layout
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer rounded-lg bg-white p-6 dark:bg-gray-900"
        // onClick={handleClick}
      >
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              layout
              className="w-full max-w-lg rounded-lg bg-white p-6 dark:bg-gray-900"
            >
              {content}
            </motion.div>
          </motion.div>
        ) : (
          content
        )}
      </motion.div>
    </AnimatePresence>
  );
}
