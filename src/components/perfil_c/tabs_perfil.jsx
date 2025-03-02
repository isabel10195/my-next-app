import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../lib/utils";

const UserTabs = ({ seguidores, seguidos, recomendaciones, followUser, unfollowUser }) => {
  return (
    <div className="flex-1 max-w-full mx-auto overflow-hidden p-2 bg-gray-200 dark:bg-gray-950 rounded-xl ">
      <TabsPrimitive.Root defaultValue="seguidores" className="w-full">
        <TabsPrimitive.List className="grid w-full grid-cols-3 bg-muted rounded-2xl p-1">
          <TabsPrimitive.Trigger
            value="seguidores"
            className={cn(
              "text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 rounded-2xl px-auto py-1.5 text-sm font-medium transition-all",
              "data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-800",
            )}
          >
            Seguidores
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger
            value="seguidos"
            className={cn(
              "text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 rounded-2xl px-auto py-1.5 text-sm font-medium transition-all",
              "data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-800",
            )}
          >
            Seguidos
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger
            value="sugerencias"
            className={cn(
              "text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 rounded-2xl px-auto py-1.5 text-sm font-medium transition-all",
              "data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-800",
            )}
          >
            Sugerencias
          </TabsPrimitive.Trigger>
        </TabsPrimitive.List>

        {/* Contenido de los Tabs */}
        <TabsPrimitive.Content value="seguidores" className="mt-4 p-4">
          <ul className="space-y-4">
            {seguidores.map((item) => (
              <li key={item.user_id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                  <img src={item.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{item.user_handle}</h4>
                    <p className="text-gray-500 dark:text-gray-400">@{item.user_handle.toLowerCase()}</p>
                  </div>
                </div>
                <button onClick={() => unfollowUser(item.user_id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Dejar de seguir
                </button>
              </li>
            ))}
          </ul>
        </TabsPrimitive.Content>

        <TabsPrimitive.Content value="seguidos" className="mt-4 p-4">
          <ul className="space-y-4">
            {seguidos.map((item) => (
              <li key={item.user_id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                  <img src={item.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{item.user_handle}</h4>
                    <p className="text-gray-500 dark:text-gray-400">@{item.user_handle.toLowerCase()}</p>
                  </div>
                </div>
                <button onClick={() => unfollowUser(item.user_id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Dejar de seguir
                </button>
              </li>
            ))}
          </ul>
        </TabsPrimitive.Content>

        <TabsPrimitive.Content value="sugerencias" className="mt-4 p-4">
          {recomendaciones.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">No hay recomendaciones disponibles.</p>
          ) : (
            <ul className="space-y-4">
              {recomendaciones.map((item) => (
                <li key={item.user_id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <div className="flex items-center space-x-3">
                    <img src={item.avatar_url || "default-avatar-url"} alt="Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{item.user_handle}</h4>
                      <p className="text-gray-500 dark:text-gray-400">@{item.user_handle.toLowerCase()}</p>
                    </div>
                  </div>
                  <button onClick={() => followUser(item.user_id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Seguir
                  </button>
                </li>
              ))}
            </ul>
          )}
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </div>
  );
};

export default UserTabs;