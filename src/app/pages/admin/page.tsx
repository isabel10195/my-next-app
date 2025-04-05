'use client'

import { useEffect, useRef, useState } from "react";
import AdminLayout from "./layout"
import UserList from "@/components/AdminPage/user-list"
import TweetList from "@/components/AdminPage/tweet-list"
import { Search } from "lucide-react"
export default function AdminPage() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  if (!isMounted) return null; // 🔥 Evita el error de hidratación

  return (
    <div className="h-screen bg-zinc-50">
      <AdminLayout>
        <div className="grid grid-cols-[300px,1fr] h-full divide-x divide-zinc-200">
          <div className="p-4 bg-white">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <UserList />
          </div>
          <div className="p-6">
            <TweetList />
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
