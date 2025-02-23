"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TweetList() {
  const [editTweet, setEditTweet] = useState<Tweet | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Tweet | null>(null)

  const tweets = [
    {
      id: 1,
      content: "Just launched our new feature! Check it out 🚀",
      author: "Sarah Wilson",
      username: "@sarahw",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2h ago",
      likes: 24,
      retweets: 5,
    },
    {
      id: 2,
      content: "Working on something exciting. Can't wait to share it with you all! 👨‍💻",
      author: "Michael Chen",
      username: "@mchen",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "4h ago",
      likes: 15,
      retweets: 2,
    },
    {
      id: 3,
      content: "Beautiful day for a coffee and some coding ☕️",
      author: "Jessica Brown",
      username: "@jbrown",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "6h ago",
      likes: 42,
      retweets: 8,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Tweets</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Refresh
          </Button>
          <Button size="sm">New Tweet</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 divide-y divide-zinc-200">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="p-4 flex gap-4">
            <img src={tweet.avatar || "/placeholder.svg"} alt={tweet.author} className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{tweet.author}</span>{" "}
                  <span className="text-zinc-500">{tweet.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">{tweet.date}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-zinc-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => setEditTweet(tweet)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => setDeleteConfirm(tweet)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="mt-1 text-zinc-800">{tweet.content}</p>
              <div className="mt-2 text-sm text-zinc-500">
                {tweet.likes} likes · {tweet.retweets} retweets
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editTweet} onOpenChange={() => setEditTweet(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tweet</DialogTitle>
            <DialogDescription>Make changes to the tweet content below.</DialogDescription>
          </DialogHeader>
          <Textarea className="min-h-[100px]" defaultValue={editTweet?.content} placeholder="Tweet content..." />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTweet(null)}>
              Cancel
            </Button>
            <Button onClick={() => setEditTweet(null)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tweet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirm(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => setDeleteConfirm(null)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

interface Tweet {
  id: number
  content: string
  author: string
  username: string
  avatar: string
  date: string
  likes: number
  retweets: number
}

