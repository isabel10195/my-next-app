"use client";

// el doble GET /api/tweets en la consola de frontend se debe a que React está renderizando el componente dos veces en modo desarrollo, 
// lo cual es un comportamiento esperado en React Strict Mode.

import { Edit, Trash } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Tweet {
  tweet_id: string;
  avatar_url?: string;
  user_handle: string;
  tweet_text: string;
}

interface CardTweetsProps {
  tweets: Tweet[];
  user: {
    name: string;
    user_handle: string;
    avatarUrl?: string;
    coverUrl?: string;
    bio?: string;
    location?: string;
    birthday?: string;
    email?: string;
    followers: number;
    following: number;
  } | null;
  handleDeleteTweet: (tweetId: string) => void;
  handleEditTweet: (tweetId: string, text: string) => void;
  handleSaveTweet: (tweetId: string, text: string) => void;
}

const CardTweets: React.FC<CardTweetsProps> = ({ tweets, user, handleDeleteTweet, handleEditTweet, handleSaveTweet }) => {
  console.log("🎥 Renderizando CardTweets con tweets:", tweets);

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
        {!tweets || tweets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-center">No hay tweets disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {tweets.map((tweet) => (
              <li key={tweet.tweet_id} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Image src={tweet.avatar_url || "/placeholder-user.jpg"} alt="Avatar" width={48} height={48} className="rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">{tweet.user_handle}</h4>
                    <p className="mt-1 text-gray-900 dark:text-white">{tweet.tweet_text}</p>
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
