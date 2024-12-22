'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FeedHeader() {
  const router = useRouter()

  return (
    <div className="border-b bg-white dark:bg-gray-950 p-4">
      <div className="container mx-auto flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-serif text-gray-900 dark:text-white">Feed</h1>
      </div>
    </div>
  )
}