import Link from "next/link"
import { cn } from "../lib/utils"
import { User, Bell, Shield, BarChart3, Eye, Globe, Key, CreditCard, MessageSquare, Database, Home } from 'lucide-react'

const settingsNav = [
  {
    section: "Account",
    items: [
     {
        name: "Home",
        href: "/",
        icon: Home,
     },
     {
        name: "Profile",
        href: "/pages/profile",
        icon: User,
      },
      {
        name: "Notifications",
        href: "/settings/notifications",
        icon: Bell,
      },
      {
        name: "Privacy & Safety",
        href: "/settings/privacy",
        icon: Shield,
      },
    ],
  },
  {
    section: "Preferences",
    items: [
      {
        name: "Content Filters",
        href: "/settings/filters",
        icon: Eye,
      },
      {
        name: "Language & Region",
        href: "/settings/language",
        icon: Globe,
      },
      {
        name: "Accessibility",
        href: "/settings/accessibility",
        icon: MessageSquare,
      },
    ],
  },
  {
    section: "Data & Analytics",
    items: [
      {
        name: "Usage Data",
        href: "/settings/usage",
        icon: BarChart3,
      },
      {
        name: "Data Export",
        href: "/settings/export",
        icon: Database,
      },
    ],
  },
  {
    section: "Billing",
    items: [
      {
        name: "Payment Methods",
        href: "/settings/payment",
        icon: CreditCard,
      },
      {
        name: "API Keys",
        href: "/settings/api-keys",
        icon: Key,
      },
    ],
  },
]

interface SettingsNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function SettingsNav({ className, ...props }: SettingsNavProps) {
  return (
    <nav className={cn("space-y-6", className)} {...props}>
  {settingsNav.map((section) => (
    <div key={section.section} className="rounded-lg bg-white dark:bg-gray-900 p-4 shadow-lg">
      <h3 className="px-3 text-sm font-semibold text-gray-900 dark:text-gray-400 mb-2">
        {section.section}
      </h3>
      <div className="space-y-1">
        {section.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-600 hover:text-white transition-colors ease-in-out duration-200 dark:text-gray-200 dark:hover:bg-blue-500"
          >
            <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-white transition-colors ease-in-out duration-200 dark:text-gray-400 dark:group-hover:text-white" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  ))}
</nav>

  )
}
