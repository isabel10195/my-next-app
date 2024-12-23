'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HomeIcon, MessageSquare, Users2, Layout, Image, Settings } from 'lucide-react'

const navItems = [
  {
    title: "News Feed",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    badge: 6,
  },
  {
    title: "Forums",
    href: "/forums",
    icon: Layout,
  },
  {
    title: "Friends",
    href: "/friends",
    icon: Users2,
    badge: 3,
  },
  {
    title: "Media",
    href: "/media",
    icon: Image,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-full">
      <div className="space-y-2 p-4">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname === item.href && "bg-primary"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              {item.title}
              {item.badge && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

