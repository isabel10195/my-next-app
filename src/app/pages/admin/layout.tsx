import type { ReactNode } from "react";
import { Bell, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <header className="h-12 bg-white border-b border-zinc-200 flex items-center justify-between px-4">
        <h1 className="text-lg font-medium">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="p-1.5 rounded-full hover:bg-zinc-100">
            <Bell className="h-5 w-5 text-zinc-600" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-zinc-100">
            <Settings className="h-5 w-5 text-zinc-600" />
          </button>
          <div className="h-8 w-8 rounded-full bg-zinc-200" />
        </div>
      </header>
      <main className="h-[calc(100%-3rem)]">{children}</main>
    </div>
  );
}
