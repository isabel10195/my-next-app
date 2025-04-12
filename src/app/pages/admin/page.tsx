'use client'

import { useEffect, useRef, useState } from "react";
import AdminLayout from "./layout";
import UserListAdmin from "@/components/AdminPage/UserListAdmin";
import TweetListAdmin from "@/components/AdminPage/TweetListAdmin";
import { Search } from "lucide-react";

export default function AdminPage() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  if (!isMounted) return null;

  return (
      <div className="grid grid-cols-2 gap-4 p-6 bg-white dark:bg-gray-900 min-h-screen">
        {/* Cuadro de Tweets */}
        <div className="bg-zinc-100 dark:bg-gray-800 rounded-xl p-4 shadow-md overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Todos los Tweets</h2>
          <TweetListAdmin />
        </div>

        {/* Cuadro de Usuarios */}
        <div className="bg-zinc-100 dark:bg-gray-800 rounded-xl p-4 shadow-md overflow-y-auto max-h-[80vh]">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-300" />
            <input
              ref={searchRef}
              type="search"
              placeholder="Buscar usuarios..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-zinc-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <UserListAdmin />
        </div>
      </div>
  );
}