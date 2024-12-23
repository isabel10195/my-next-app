"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input 
        placeholder="Search users, posts, etc..." 
        className="pl-9 w-[300px] bg-gray-50 border-none rounded-lg"
      />
    </div>
  )
}

