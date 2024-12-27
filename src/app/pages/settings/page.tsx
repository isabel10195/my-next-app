import { Metadata } from "next"
import { SettingsNav } from "@/components/settings_C/settings-nav"
import { ActivityHeatmap } from "@/components/settings_C/activity-heatmap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/cards/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Settings",
  description: "User settings and preferences",
}

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 border-r bg-gray-100/40 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <span className="font-semibold">Settings</span>
          </div>
          <div className="flex-1 p-4">
            <SettingsNav />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
        </div>

        <div className="grid gap-4">
          <ActivityHeatmap />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Content Filters</CardTitle>
                <CardDescription>
                  Manage your content viewing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="nsfw">NSFW Content</Label>
                  <Switch id="nsfw" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics">Share Analytics</Label>
                  <Switch id="analytics" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing">Marketing Emails</Label>
                  <Switch id="marketing" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>
                  Manage your privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="public-profile">Public Profile</Label>
                  <Switch id="public-profile" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-activity">Show Activity</Label>
                  <Switch id="show-activity" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="third-party">Third-party Sharing</Label>
                  <Switch id="third-party" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <Switch id="email-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notif">Push Notifications</Label>
                  <Switch id="push-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="updates">Product Updates</Label>
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

