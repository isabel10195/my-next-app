"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserData {
  user_id: string;
  avatar_url?: string;
  user_handle: string;
}

interface UserTabsProps {
  user: any;
  seguidores: UserData[];
  following: UserData[];
  recomendaciones: UserData[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

const UserTabs: React.FC<UserTabsProps> = ({
  user,
  seguidores = [],
  following = [],
  recomendaciones = [],
  followUser,
  unfollowUser,
}) => {
  const [activeTab, setActiveTab] = React.useState("seguidores");
  const [localRecomendaciones, setLocalRecomendaciones] = React.useState(recomendaciones);

  const handleFollow = (userId: string) => {
    followUser(userId);
    setLocalRecomendaciones((prev) => prev.filter((u) => u.user_id !== userId));
  };

  if (!user) {
    return (
      <Card className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Conexiones</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">
            Inicia sesión para ver tu red de conexiones.
          </p>
        </CardContent>
      </Card>
    );
  }

  const renderList = (usuarios: UserData[], actionButton?: (id: string) => React.ReactNode) =>
    usuarios.map((user) => {
      const key = `user-${user.user_id}-${user.user_handle}`; // 👈 clave 100% única
      return (
        <div
          key={key}
          className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow mt-2"
        >
          <div className="flex items-center space-x-3">
            <Image
              src={user.avatar_url || "/placeholder-user.jpg"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <Link href={`/pages/profile/${user.user_handle}`} className="font-bold text-blue-500 hover:underline">
                @{user.user_handle}
              </Link>
            </div>
          </div>
          {actionButton && (
            <div key={`${key}-button`}>{actionButton(user.user_id)}</div>
          )}
        </div>
      );
    });
  

  return (
    <Card className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Conexiones</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        <div className="flex justify-around mb-4">
          {["seguidores", "following", "recomendaciones"].map((tab) => (
            <Button
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-2xl px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-300 dark:hover:bg-gray-600 ${
                activeTab === tab ? "bg-gray-300 dark:bg-gray-600" : ""
              }`}
            >
              {tab === "seguidores"
                ? "Seguidores"
                : tab === "following"
                ? "Siguiendo"
                : "Sugerencias"}
            </Button>
          ))}
        </div>

        <Separator className="bg-gray-300 dark:bg-gray-800" />

        {activeTab === "seguidores" && (
          <div>
            {seguidores.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-center">Aún no tienes seguidores.</p>
            ) : (
              renderList(seguidores)
            )}
          </div>
        )}

        {activeTab === "following" && (
          <div>
            {following.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-center">Aún no sigues a nadie.</p>
            ) : (
              renderList(following, (id) => (
                <Button
                  key={`unfollow-${id}`}
                  onPress={() => unfollowUser(id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Dejar de seguir
                </Button>
              ))
            )}
          </div>
        )}

        {activeTab === "recomendaciones" && (
          <div>
            {localRecomendaciones.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-center">
                No hay sugerencias disponibles.
              </p>
            ) : (
              renderList(localRecomendaciones, (id) => (
                <Button
                  key={`follow-${id}`}
                  onPress={() => handleFollow(id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Seguir
                </Button>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTabs;
