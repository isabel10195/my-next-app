"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const popularTopics = [
  "#AppleEvent",
  "#iOSUpdate",
  "#MacBookPro",
  "#AirPods",
  "#AppleWatch",
  "#iPhonePhotography",
  "#MacOSFeatures",
  "#ApplePencil",
];

export default function TopicsSection() {
  const [currentTopic, setCurrentTopic] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopic((prev) => (prev + 1) % popularTopics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-6 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Popular Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentTopic}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
              className="text-center text-xl font-bold text-blue-500 dark:text-blue-300 my-4"
            >
              {popularTopics[currentTopic]}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
