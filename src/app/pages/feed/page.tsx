"use client"

import { useState } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { UserProfile } from "@/components/layout/user-profile"
import { FeedCard } from "@/components/feed/feed-card"
import { VideoCard } from "@/components/feed/video-card"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { PostCreator } from "@/components/feed/post-creator"
import { SearchBar } from "@/components/search/search-bar"
import { RecommendationCarousel } from "@/components/recommendations/recommendation-carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const recentsPosts = [
  {
    type: 'image',
    author: {
      name: "George Lobko",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      timestamp: "2 hours ago"
    },
    content: "Hi everyone, today I was on the most beautiful mountain in the world! I also want to say hi to Silena, Olya and Davis!",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tiCWz_uYWkcAKdCRU5oxcYJ_TRM7KXrrVQ&s?height=300&width=300",
      "https://static.vecteezy.com/system/resources/previews/004/493/289/large_2x/green-yellow-pink-and-purple-gradient-background-free-photo.jpg?height=300&width=300",
      "https://img.freepik.com/fotos-premium/ilustracion-fondo-degradado-azul-marron-abstracto-su-diseno_900706-8778.jpg?height=300&width=300"
    ],
    likes: 355,
    views: 1200,
    comments: 42
  },
  {
    type: 'video',
    author: {
      name: "Sarah Wilson",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      timestamp: "4 hours ago"
    },
    content: "Just finished editing this amazing sunset timelapse! 🌅 What do you think?",
    videoThumbnail: "/placeholder.svg?height=400&width=600",
    likes: 892,
    views: 2400,
    comments: 76
  }
]

const friendsPosts = [
  {
    type: 'image',
    author: {
      name: "Emma Johnson",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      timestamp: "1 day ago"
    },
    content: "Had an amazing time at the beach with friends! 🏖️ Summer vibes all around!",
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300"
    ],
    likes: 423,
    views: 1500,
    comments: 58
  },
  {
    type: 'video',
    author: {
      name: "Michael Brown",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      timestamp: "2 days ago"
    },
    content: "Check out this cool drone footage of the city skyline! 🏙️",
    videoThumbnail: "/placeholder.svg?height=400&width=600",
    likes: 756,
    views: 3100,
    comments: 92
  }
]

const popularPosts = [
  {
    type: 'image',
    author: {
      name: "Sophia Lee",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      timestamp: "3 days ago"
    },
    content: "Just climbed Mount Everest! A dream come true. 🏔️",
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300"
    ],
    likes: 15355,
    views: 50200,
    comments: 1042
  },
  {
    type: 'video',
    author: {
      name: "David Miller",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      timestamp: "1 week ago"
    },
    content: "My latest song just hit 1 million views! Thank you all for the support! 🎵🎉",
    videoThumbnail: "/placeholder.svg?height=400&width=600",
    likes: 28892,
    views: 1000000,
    comments: 3576
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("recents")

  const getPostsForTab = () => {
    switch (activeTab) {
      case "recents":
        return recentsPosts
      case "friends":
        return friendsPosts
      case "popular":
        return popularPosts
      default:
        return recentsPosts
    }
  }

  return (
    <div className="grid grid-cols-[280px_1fr_280px] gap-4 p-4 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <aside className="h-[calc(100vh-2rem)] flex flex-col rounded-xl border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm">
        <UserProfile
          name="Bogdan Nikitin"
          username="nikitinteam"
          avatarUrl="/placeholder.svg?height=40&width=40"
        />
        <ScrollArea className="flex-1">
          <MainNav />
        </ScrollArea>
      </aside>
      
      <main className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Feeds</h1>
            <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex items-center gap-2">
            <SearchBar />
          </div>
        </div>

        <PostCreator
          userAvatar="/placeholder.svg?height=40&width=40"
          userName="Bogdan Nikitin"
        />

        {getPostsForTab().map((post, index) => (
          post.type === 'image' ? (
            <FeedCard
              key={index}
              author={post.author}
              content={post.content}
              images={post.images}
              likes={post.likes}
              views={post.views}
              comments={post.comments}
            />
          ) : (
            <VideoCard
              key={index}
              author={post.author}
              content={post.content}
              videoThumbnail={post.videoThumbnail}
              likes={post.likes}
              views={post.views}
              comments={post.comments}
            />
          )
        ))}
      </main>

      <aside className="space-y-4">
        <section className="rounded-xl border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Stories</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative group">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Story preview"
                className="aspect-[4/5] rounded-xl object-cover w-full"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Avatar className="w-6 h-6 border-2 border-gray-800 dark:border-gray-700">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white dark:text-gray-200 font-medium">Anatoly Pr.</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Story preview"
                className="aspect-[4/5] rounded-xl object-cover w-full"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Avatar className="w-6 h-6 border-2 border-gray-800 dark:border-gray-700">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>LE</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white dark:text-gray-200 font-medium">Letia Earns</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Suggestions</h2>
          <div className="space-y-4">
            {["Nick Shelburne", "Brittni Lando", "Ivan Shevchenko"].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</p>
                </div>
                <Button size="sm" variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </section>

        <RecommendationCarousel />
      </aside>
    </div>
  )
}
