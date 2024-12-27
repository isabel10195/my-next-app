import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/cards/card"
import { MoreHorizontal, Eye, Heart, MessageSquare } from 'lucide-react'

interface FeedCardProps {
  author: {
    name: string
    avatarUrl: string
    timestamp: string
  }
  content: string
  images?: string[]
  likes: number
  views: number
  comments: number
}

export function FeedCard({ author, content, images, likes, views, comments }: FeedCardProps) {
  return (
    <Card className="rounded-xl shadow-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{author.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{author.timestamp}</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>
        {images && images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="rounded-xl object-cover aspect-square w-full"
              />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 border-gray-700 dark:border-gray-600">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Heart className="w-4 h-4" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Eye className="w-4 h-4" />
            {views}
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <MessageSquare className="w-4 h-4" />
            {comments}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
