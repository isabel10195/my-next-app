'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FeedHeader() {
  const router = useRouter()

  return (
    <div className="border-b bg-gray-50 dark:bg-gray-950 p-4">
      <div className="container mx-auto flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-serif text-gray-900 dark:text-gray-100">Feed</h1>
      </div>
    </div>
  )
}
