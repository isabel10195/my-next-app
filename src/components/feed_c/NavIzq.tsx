"use client";

import { Home, User, Bell, Mail, Bookmark, List, MoreHorizontal, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/server/service/userService";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: List, label: "Lists" },
  { icon: MoreHorizontal, label: "More" },
];

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg xl:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed h-screen rounded-xl z-50 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto flex flex-col p-4 w-64 transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0  
          xl:block xl:translate-x-0 
        `}
      >
        <div className="flex items-center justify-between mb-6 mt-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={user?.avatar_url || "/placeholder-user.jpg"} alt={user?.user_handle || "Usuario"} />
              <AvatarFallback>{user ? `${user.first_name[0]}${user.last_name[0]}` : "UN"}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 dark:text-white">
                {user ? `${user.first_name} ${user.last_name}` : "Username"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {user ? `@${user.user_handle}` : "@username"}
              </p>
            </div>
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-900 dark:text-white xl:hidden"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center space-x-4 p-2 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600"
                >
                  <item.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-900 dark:text-white">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
