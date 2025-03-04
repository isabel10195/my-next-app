"use client";

import { useState, useEffect } from "react";
import { Edit, Trash, Check, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

// Definimos la estructura de los tweets
interface Tweet {
  tweet_id: string;
  avatar_url?: string;
  user_handle: string;
  tweet_text: string;
}

const CardTweets: React.FC = () => {
  const { user } = useAuth(); // 🔥 Obtenemos el usuario autenticado
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTweetId, setEditingTweetId] = useState<string | null>(null);
  const [editedTweetText, setEditedTweetText] = useState<string>("");

  // 🔥 Cargar tweets del usuario autenticado al montar el componente
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tweets", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error al obtener tweets: ${response.status}`);
        }

        const data = await response.json();
        setTweets(data.tweets || []);
      } catch (error) {
        console.error("❌ Error al obtener tweets:", error);
        setError("No se pudieron cargar los tweets.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTweets();
  }, [user]);

  const startEditing = (tweetId: string, text: string) => {
    setEditingTweetId(tweetId);
    setEditedTweetText(text);
  };

  const cancelEditing = () => {
    setEditingTweetId(null);
    setEditedTweetText("");
  };

  // 🔥 Si el usuario NO está logueado, mostramos un mensaje
  if (!user) {
    return (
      <Card className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Tweets</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300 dark:bg-gray-800" />
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-300">Inicia sesión para ver los tweets.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Tweets</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-300 text-center">Cargando tweets...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : tweets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-center">No hay tweets disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {tweets.map((tweet) => (
              <li key={tweet.tweet_id} className="p-4 bg-blue-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <Image
                    src={tweet.avatar_url || "/placeholder-user.jpg"}
                    alt="Avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-200">{tweet.user_handle}</h4>
                    {editingTweetId === tweet.tweet_id ? (
                      <Input
                        type="text"
                        value={editedTweetText}
                        onChange={(e) => setEditedTweetText(e.target.value)}
                        className="mt-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-white"
                        maxLength={280}
                      />
                    ) : (
                      <p className="mt-1 text-gray-700 dark:text-gray-400">{tweet.tweet_text}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editingTweetId === tweet.tweet_id ? (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-green-500 hover:text-green-400"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={cancelEditing}
                          className="text-red-500 hover:text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEditing(tweet.tweet_id, tweet.tweet_text)}
                          className="text-blue-500 hover:text-blue-400"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default CardTweets;
