"use client"

import { useState } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { UserProfile } from "@/components/layout/user-profile"
import { FeedCard } from "@/components/feed/feed-card"
import { VideoCard } from "@/components/feed/video.card"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { PostCreator } from "@/components/feed/post-creator"
import { SearchBar } from "@/components/search/search-bar"
import { RecommendationCarousel } from "@/components/recommendations/recommendation-carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [activeTab, setActiveTab] = useState("friends")

  return (
    <div className="grid grid-cols-[280px_1fr_280px] gap-4 p-4">
      <aside className="h-[calc(100vh-2rem)] flex flex-col rounded-xl border bg-card shadow-sm">
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
            <h1 className="text-xl font-semibold">Feeds</h1>
            <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <SearchBar />
        </div>

        <PostCreator
          userAvatar="/placeholder.svg?height=40&width=40"
          userName="Bogdan Nikitin"
        />

        <FeedCard
          author={{
            name: "George Lobko",
            avatarUrl: "/placeholder.svg?height=40&width=40",
            timestamp: "2 hours ago"
          }}
          content="Hi everyone, today I was on the most beautiful mountain in the world! I also want to say hi to Silena, Olya and Davis!"
          images={[
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300"
          ]}
          likes={355}
          views={1200}
          comments={42}
        />

        <VideoCard
          author={{
            name: "Sarah Wilson",
            avatarUrl: "/placeholder.svg?height=40&width=40",
            timestamp: "4 hours ago"
          }}
          content="Just finished editing this amazing sunset timelapse! 🌅 What do you think?"
          videoThumbnail="/placeholder.svg?height=400&width=600"
          likes={892}
          views={2400}
          comments={76}
        />
      </main>

      <aside className="space-y-4">
        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Stories</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative group">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Story preview"
                className="aspect-[4/5] rounded-xl object-cover w-full"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Avatar className="w-6 h-6 border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white font-medium">Anatoly Pr.</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Story preview"
                className="aspect-[4/5] rounded-xl object-cover w-full"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Avatar className="w-6 h-6 border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>LE</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white font-medium">Letia Earns</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Suggestions</h2>
          <div className="space-y-4">
            {["Nick Shelburne", "Brittni Lando", "Ivan Shevchenko"].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{name}</p>
                </div>
                <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-lg px-4">
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

