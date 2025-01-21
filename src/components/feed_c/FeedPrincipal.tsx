"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/feed_c/tabs"
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"

interface Tweet {
  id: number
  author: string
  content: string
  avatar: string
}

const initialTweets: Tweet[] = [
  { id: 1, author: "Tim Cook", content: "Excited about our latest innovations!", avatar: "/tim-cook.jpg" },
  { id: 2, author: "Jony Ive", content: "Simplicity is the ultimate sophistication.", avatar: "/jony-ive.jpg" },
  {
    id: 3,
    author: "Craig Federighi",
    content: "Software and hairstyle, both on point.",
    avatar: "/craig-federighi.jpg",
  },
  { id: 4, author: "Steve Wozniak", content: "Remember, great things start small.", avatar: "/steve-wozniak.jpg" },
  {
    id: 5,
    author: "Angela Ahrendts",
    content: "Retail is not dead, but boring retail is.",
    avatar: "/angela-ahrendts.jpg",
  },
  { id: 6, author: "Eddy Cue", content: "Music is life, and we're here to amplify it.", avatar: "/eddy-cue.jpg" },
  {
    id: 7,
    author: "Phil Schiller",
    content: "Innovation is not about saying yes to everything.",
    avatar: "/phil-schiller.jpg",
  },
  {
    id: 8,
    author: "Lisa Jackson",
    content: "Sustainability is not a buzzword, it's a responsibility.",
    avatar: "/lisa-jackson.jpg",
  },
  { id: 9, author: "John Ternus", content: "Hardware that pushes software to its limits.", avatar: "/john-ternus.jpg" },
  {
    id: 10,
    author: "Johny Srouji",
    content: "Chips that change the game, one nanometer at a time.",
    avatar: "/johny-srouji.jpg",
  },
]

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>(initialTweets)
  const [newTweet, setNewTweet] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTweet.trim()) {
      setTweets([{ id: Date.now(), author: "You", content: newTweet, avatar: "/placeholder-user.jpg" }, ...tweets])
      setNewTweet("")
    }
  }

  const TweetList = () => (
    <div className="space-y-4 overflow-y-auto h-[calc(100vh-250px)]">
      <AnimatePresence>
        {tweets.map((tweet) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-4"
          >
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={tweet.avatar} alt={tweet.author} />
                <AvatarFallback>{tweet.author[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{tweet.author}</h3>
            </div>
            <p className="text-gray-700 mb-4">{tweet.content}</p>
            <div className="flex justify-between text-gray-500">
              <Button variant="ghost" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Comment
              </Button>
              <Button variant="ghost" size="sm">
                <Repeat2 className="mr-2 h-4 w-4" />
                Retweet
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 py-8 overflow-hidden mt-4">
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
          <form onSubmit={handleSubmit} className="mb-8">
            <Input
              type="text"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              placeholder="What's happening?"
              className="mb-2"
            />
            <Button type="submit" className="w-full">
              Tweet
            </Button>
          </form>
          <TweetList />
        </TabsContent>
        <TabsContent value="following">
          <p className="text-center text-gray-500 mt-4">Here you'll see tweets from people you follow.</p>
        </TabsContent>
        <TabsContent value="communities">
          <p className="text-center text-gray-500 mt-4">Explore and join communities based on your interests.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

