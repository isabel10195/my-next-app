import { Metadata } from "next"
import { SettingsNav } from "@/components/settings_C/settings-nav"
import { ActivityHeatmap } from "@/components/settings_C/activity-heatmap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Settings",
  description: "User settings and preferences",
}

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="hidden w-64 border-r bg-gray-100/40 dark:bg-gray-900 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <span className="font-semibold text-4xl animate-hover">Settings</span> {/* Texto más grande y animación */}
          </div>
          <div className="flex-1 p-4">
            <SettingsNav />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Account Settings</h2>
        </div>

        <div className="grid gap-4">
          <ActivityHeatmap />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Content Filters</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Manage your content viewing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="nsfw" className="text-gray-900 dark:text-gray-100">NSFW Content</Label>
                  <Switch id="nsfw" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics" className="text-gray-900 dark:text-gray-100">Share Analytics</Label>
                  <Switch id="analytics" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing" className="text-gray-900 dark:text-gray-100">Marketing Emails</Label>
                  <Switch id="marketing" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Privacy</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Manage your privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="public-profile" className="text-gray-900 dark:text-gray-100">Public Profile</Label>
                  <Switch id="public-profile" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-activity" className="text-gray-900 dark:text-gray-100">Show Activity</Label>
                  <Switch id="show-activity" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="third-party" className="text-gray-900 dark:text-gray-100">Third-party Sharing</Label>
                  <Switch id="third-party" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Notifications</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Configure your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notif" className="text-gray-900 dark:text-gray-100">Email Notifications</Label>
                  <Switch id="email-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notif" className="text-gray-900 dark:text-gray-100">Push Notifications</Label>
                  <Switch id="push-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="updates" className="text-gray-900 dark:text-gray-100">Product Updates</Label>
                  <Switch id="updates" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
