'use client'


import { FeedHeader } from "@/components/feed/feed-header"
import { FeedGrid } from "@/components/feed/feed-grid"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <FeedHeader />
      <FeedGrid />
    </div>
  )
}