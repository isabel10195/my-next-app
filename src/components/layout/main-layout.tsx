'use client';

import { motion } from "framer-motion";
import { NextUIProvider } from "@nextui-org/react";


export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto p-4"
        >
          {children}
        </motion.div>
      </div>
    </NextUIProvider>
  );
}
