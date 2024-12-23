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
    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 p-1 rounded-lg">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "rounded-md text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "bg-white text-black dark:bg-gray-600 dark:text-gray-100 shadow-sm"
              : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white/40 dark:hover:bg-gray-500/40"
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

