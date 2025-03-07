"use client";

import * as React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// 🔥 Definimos la estructura de los props
interface UserData {
  user_id: string;
  avatar_url?: string;
  user_handle: string;
}

interface UserTabsProps {
  user: any;
  seguidores: UserData[];
  seguidos: UserData[];
  recomendaciones: UserData[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ user, seguidores, seguidos, recomendaciones, followUser, unfollowUser }) => {
  const [activeTab, setActiveTab] = React.useState("seguidores");

  if (!user) {
    return (
      <Card className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Conexiones</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">Inicia sesión para ver tu red de conexiones.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Conexiones</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        <div className="flex justify-around mb-4">
          <Button variant={activeTab === "seguidores" ? "default" : "outline"} onClick={() => setActiveTab("seguidores")}>
            Seguidores
          </Button>
          <Button variant={activeTab === "seguidos" ? "default" : "outline"} onClick={() => setActiveTab("seguidos")}>
            Seguidos
          </Button>
          <Button variant={activeTab === "sugerencias" ? "default" : "outline"} onClick={() => setActiveTab("sugerencias")}>
            Sugerencias
          </Button>
        </div>

        <Separator className="bg-gray-300 dark:bg-gray-800" />

        {activeTab === "seguidores" && (
          <div>
            {seguidores.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-center">Aún no tienes seguidores.</p>
            ) : (
              seguidores.map((user) => (
                <div key={user.user_id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <div className="flex items-center space-x-3">
                    <Image src={user.avatar_url || "/placeholder-user.jpg"} alt="Avatar" width={40} height={40} className="rounded-full" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{user.user_handle}</h4>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "seguidos" && (
          <div>
            {seguidos.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-center">Aún no sigues a nadie.</p>
            ) : (
              seguidos.map((user) => (
                <div key={user.user_id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <div className="flex items-center space-x-3">
                    <Image src={user.avatar_url || "/placeholder-user.jpg"} alt="Avatar" width={40} height={40} className="rounded-full" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{user.user_handle}</h4>
                    </div>
                  </div>
                  <Button onClick={() => unfollowUser(user.user_id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                    Dejar de seguir
                  </Button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "sugerencias" && (
          <div>
            {recomendaciones.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-center">No hay sugerencias disponibles.</p>
            ) : (
              recomendaciones.map((user) => (
                <div key={user.user_id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <div className="flex items-center space-x-3">
                    <Image src={user.avatar_url || "/placeholder-user.jpg"} alt="Avatar" width={40} height={40} className="rounded-full" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{user.user_handle}</h4>
                    </div>
                  </div>
                  <Button onClick={() => followUser(user.user_id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Seguir
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTabs;