"use client";

import { Edit, Trash, Check, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// 🔥 Definimos la estructura de los props
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
                    <p className="mt-1 text-gray-700 dark:text-gray-400">{tweet.tweet_text}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditTweet(tweet.tweet_id, tweet.tweet_text)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteTweet(tweet.tweet_id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
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