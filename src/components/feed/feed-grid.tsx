'use client'

import { FeedCard } from "./feed-card"

const FEED_ITEMS = [
  {
    id: 1,
    title: "Morning Coffee Routine",
    image: "https://storage.googleapis.com/www-paredro-com/uploads/2020/02/6cf01be6-magic.png",
    likes: 324,
    comments: 42
  },
  {
    id: 2,
    title: "Sunset at the Beach",
    image: "https://storage.googleapis.com/www-paredro-com/uploads/2020/02/6cf01be6-magic.png",
    likes: 892,
    comments: 76
  },
  {
    id: 3,
    title: "City Lights",
    image: "https://storage.googleapis.com/www-paredro-com/uploads/2020/02/6cf01be6-magic.png",
    likes: 567,
    comments: 89
  }
]

export function FeedGrid() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEED_ITEMS.map((item) => (
          <FeedCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}