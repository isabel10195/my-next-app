

"use client"
import { useState } from "react"
import { SettingsNav } from "@/components/settings_C/settings-nav"
import { ActivityHeatmap } from "@/components/settings_C/activity-heatmap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { HiMenu, HiX } from "react-icons/hi"


export default function SettingsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)

  }
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Aside para pantallas grandes oculto en pequeñas */}
      <aside className={`md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r dark:bg-gray-900 transition-all duration-300 ease-in-out ${isMenuOpen ? "block z-50" : "hidden"} md:block backdrop-blur-sm`}>
        {/* Boton X para cerrar menu */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close Menu" className="text-xl text-white">
            <HiX />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 text-sm sm:text-base">
          <SettingsNav />
        </div>
      </aside>

      {/* Capa de fondo */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-white/50 dark:bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Icono de hamburguesa solo en pantallas pequeñas */}
      {!isMenuOpen && (
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg md:hidden"
        >
          <HiMenu className="h-6 w-6 text-gray-900 dark:text-white" />
        </button>
      )}
    
      {/* Main content */}
      <main className="flex-1 w-full md:pl-64 p-4 ml-4">
        <div className="max-w-[1200px]">
          <div className="flex items-center space-x-4">

            {/* Título de la página (fuera del aside) */}
            <div className="flex ml-4 mt-2 mb-4 items-center px-4 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-white">
                <span className="font-semibold text-xl sm:text-2xl lg:text-4xl ">Settings account</span>
            </div>
          </div>

          <div className="grid gap-6 ">
            <ActivityHeatmap />

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <SettingsCard
                title="Content Filters"
                description="Manage your content viewing preferences"
                settings={[
                  { id: "nsfw", label: "NSFW Content" },
                  { id: "analytics", label: "Share Analytics", defaultChecked: true },
                  { id: "marketing", label: "Marketing Emails" },
                ]}
              />

              <SettingsCard
                title="Privacy"
                description="Manage your privacy settings"
                settings={[
                  { id: "public-profile", label: "Public Profile", defaultChecked: true },
                  { id: "show-activity", label: "Show Activity", defaultChecked: true },
                  { id: "third-party", label: "Third-party Sharing" },
                ]}
              />

              <SettingsCard
                title="Notifications"
                description="Configure your notification preferences"
                settings={[
                  { id: "email-notif", label: "Email Notifications", defaultChecked: true },
                  { id: "push-notif", label: "Push Notifications", defaultChecked: true },
                  { id: "updates", label: "Product Updates", defaultChecked: true },
                ]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SettingsCard({ title, description, settings }) {
  return (
    <Card className="bg-white dark:bg-gray-900 w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between gap-4">
            <Label htmlFor={setting.id} className="text-sm text-gray-900 dark:text-gray-100 truncate">
              {setting.label}
            </Label>
            <Switch id={setting.id} defaultChecked={setting.defaultChecked} className="shrink-0" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

