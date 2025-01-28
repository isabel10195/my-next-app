"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const stories = [
  { id: 1, author: "Tim Cook", image: "/tim-cook.jpg" },
  { id: 2, author: "Jony Ive", image: "/jony-ive.jpg" },
  { id: 3, author: "Craig Federighi", image: "/craig-federighi.jpg" },
  { id: 4, author: "Angela Ahrendts", image: "/angela-ahrendts.jpg" },
]

const popularTopics = [
  "#AppleEvent",
  "#iOSUpdate",
  "#MacBookPro",
  "#AirPods",
  "#AppleWatch",
  "#iPhonePhotography",
  "#MacOSFeatures",
  "#ApplePencil",
]

const communities = [
  { name: "Apple Developers", members: 50000 },
  { name: "iOS Enthusiasts", members: 30000 },
  { name: "Mac Power Users", members: 25000 },
]

export default function RightSidebar() {
  const [currentTopic, setCurrentTopic] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopic((prev) => (prev + 1) % popularTopics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const nextTopic = () => {
    setCurrentTopic((prev) => (prev + 1) % popularTopics.length)
  }

  const prevTopic = () => {
    setCurrentTopic((prev) => (prev - 1 + popularTopics.length) % popularTopics.length)
  }

  return (
    <aside className="w-80 h-screen p-2 bg-apple-blur fixed right-24 top-20 rounded-2xl overflow-y-auto transition-apple">
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stories.map((story) => (
                <div key={story.id} className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.author}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <p className="text-white text-sm">{story.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
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
                  className="text-center text-xl font-bold text-blue-500 my-4"
                >
                  {popularTopics[currentTopic]}
                </motion.div>
              </AnimatePresence>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
                onClick={prevTopic}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={nextTopic}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {communities.map((community) => (
                <li key={community.name} className="flex items-center justify-between">
                  <span>{community.name}</span>
                  <span className="text-sm text-gray-500">{community.members.toLocaleString()} members</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </aside>
  )
}

