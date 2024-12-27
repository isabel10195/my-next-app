'use client'

import * as React from "react"
import { Card } from "@/components/cards/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Recommendation {
  id: string
  title: string
  icon: string
  color: string
}

const recommendations: Recommendation[] = [
  { id: "1", title: "UI/UX", icon: "🎨", color: "bg-blue-100" },
  { id: "2", title: "Music", icon: "🎵", color: "bg-pink-100" },
  { id: "3", title: "Cooking", icon: "🍳", color: "bg-yellow-100" },
  { id: "4", title: "Hiking", icon: "🏃‍♂️", color: "bg-purple-100" },
  { id: "5", title: "Photography", icon: "📸", color: "bg-green-100" },
  { id: "6", title: "Gaming", icon: "🎮", color: "bg-red-100" },
]

export function RecommendationCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const itemsToShow = 4

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < recommendations.length - itemsToShow

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <Card className="p-4 rounded-xl shadow-sm dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Recommendations</h2>
      <div className="relative">
        <div className="flex gap-2 overflow-hidden">
          {recommendations.slice(currentIndex, currentIndex + itemsToShow).map((item) => (
            <div
              key={item.id}
              className={`flex-1 ${item.color} p-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[100px] aspect-square`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
            </div>
          ))}
        </div>
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full dark:bg-gray-700 dark:text-gray-100"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full dark:bg-gray-700 dark:text-gray-100"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}
