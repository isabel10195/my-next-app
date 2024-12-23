"use client"

import { cn } from "../lib/utils"
import { Button } from "@/components/ui/button"

interface FeedTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  const tabs = [
    { id: "recents", label: "Recents" },
    { id: "friends", label: "Friends" },
    { id: "popular", label: "Popular" },
  ]

  return (
    <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "rounded-md text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "bg-white text-black shadow-sm"
              : "text-gray-600 hover:text-black hover:bg-white/40"
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

