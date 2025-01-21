"use client"

import { Home, User, Bell, Mail, Bookmark, List, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: List, label: "Lists" },
  { icon: MoreHorizontal, label: "More" },
]

export default function LeftSidebar() {
  return (
    <aside className="w-64 h-screen p-4 bg-apple-blur fixed left-4 top-4 bottom-4 rounded-2xl overflow-y-auto transition-apple flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Username</p>
            <p className="text-sm text-gray-500">@username</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a href="#" className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-200 transition-apple">
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </aside>
  )
}

