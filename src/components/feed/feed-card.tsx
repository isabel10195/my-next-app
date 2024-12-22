'use client'

import { Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface FeedCardProps {
  title: string
  image: string
  likes: number
  comments: number
}

export function FeedCard({ title, image, likes, comments }: FeedCardProps) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{comments}</span>
          </div>
        </div>
      </div>
    </div>
  )
}