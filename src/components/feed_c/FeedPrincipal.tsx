"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/feed_c/tabs";
import Communities from "@/components/Communities/Communities";
import ChatIA from "@/components/IA/ChatIA";
import {
  fetchForYouTweets, 
  fetchFollowingTweets, 
  createTweet,
  likeTweet
} from "@/server/service/tweetService";
import Tweet from "@/components/tweet/tweet";
import { ProfileProvider } from "@/app/context/ProfileContext";
import { toast } from "sonner";

export default function Feed() {
  const [forYouTweets, setForYouTweets] = useState([]);
  const [followingTweets, setFollowingTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [activeTab, setActiveTab] = useState("for-you");

  const handleRetweetChange = (tweetId, isRetweeted) => {
    setForYouTweets(prevTweets => prevTweets.map(tweet => {
        if (tweet.tweet_id === tweetId) {
            return { ...tweet, num_retweets: isRetweeted ? tweet.num_retweets + 1 : tweet.num_retweets - 1 };
        }
        return tweet;
    }));
    setFollowingTweets(prevTweets => prevTweets.map(tweet => {
        if (tweet.tweet_id === tweetId) {
            return { ...tweet, num_retweets: isRetweeted ? tweet.num_retweets + 1 : tweet.num_retweets - 1 };
        }
        return tweet;
    }));
    // Notificación de retweet
    toast[isRetweeted ? "success" : "warning"](`Retweet ${isRetweeted ? "realizado" : "eliminado"}`, {
      description: isRetweeted 
        ? "Has compartido este tweet" 
        : "Has dejado de compartir este tweet",
    });
  };

  // Cargar tweets de For You y Following
  const loadForYouTweets = async () => {
    try {
      const tweets = await fetchForYouTweets();
      setForYouTweets(tweets);
    } catch (error) {
      console.error(error);
    }
  };

  const loadFollowingTweets = async () => {
    try {
      const tweets = await fetchFollowingTweets();
      setFollowingTweets(tweets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadForYouTweets();
    loadFollowingTweets();
  }, []);

  useEffect(() => {
    if (activeTab === "for-you") {
      loadForYouTweets();
    } else if (activeTab === "following") {
      loadFollowingTweets();
    }
  }, [activeTab]);

  // Crear un nuevo tweet
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTweet.trim()) {
      try {
        toast.loading("Publicando tweet...", { id: "tweet-loading" });
        await createTweet(newTweet);
        setNewTweet("");
        // Notificación de éxito
        toast.success("¡Tweet publicado!", {
          description: "Tu mensaje se ha compartido correctamente",
          id: "tweet-loading" // Reemplazar la notificación de carga
        });
        loadForYouTweets();
        loadFollowingTweets();
      } catch (error) {
        // Notificación de error
        toast.error("Error al publicar", {
          description: error.message || "No se pudo enviar el tweet",
          id: "tweet-loading" // Reemplazar la notificación de carga
        });
      }
    }
  };

  // Función para alternar el like de un tweet
  const toggleLike = async (tweet) => {
    try {
      const updatedTweet = { 
        ...tweet, 
        liked: !tweet.liked, 
        num_likes: tweet.liked ? tweet.num_likes - 1 : tweet.num_likes + 1 
      };
  
      setForYouTweets((prev) =>
        prev.map((t) => (t.tweet_id === tweet.tweet_id ? updatedTweet : t))
      );
      setFollowingTweets((prev) =>
        prev.map((t) => (t.tweet_id === tweet.tweet_id ? updatedTweet : t))
      );
  
      await likeTweet(tweet.tweet_id);
      // Notificación de like
      toast[tweet.liked ? "warning" : "success"](`Like ${tweet.liked ? "eliminado" : "añadido"}`, {
        description: tweet.liked 
          ? "Has quitado tu me gusta" 
          : "¡Has dado me gusta a este tweet!",
      });

    } catch (error) {
      toast.error("Error al actualizar like", {
        description: error.message || "No se pudo actualizar tu interacción"
      });
    }
  };

  // Función para manejar comentarios (puedes ampliar la lógica para actualizar el estado global o llamar a una API)
  const handleComment = (tweetId, commentText) => {
    console.log("Nuevo comentario en tweet", tweetId, commentText);
  };

  // Lista de tweets usando el componente Tweet
  const TweetList = ({ tweets, onRetweetChange  }) => (
    <div>
      <AnimatePresence>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.tweet_id}
            tweet={tweet}
            onLike={toggleLike}
            onComment={handleComment}
            onRetweetChange={onRetweetChange}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex-1 max-w-full ml-8 mr-5 mx-auto overflow-hidden mt-4 bg-gray-200 dark:bg-gray-900 rounded-2xl ">
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="for-you" className="text-gray-900 dark:text-white data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl">
            For You
          </TabsTrigger>
          <TabsTrigger value="following" className="text-gray-900 dark:text-white data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl">
            Following
          </TabsTrigger>
          <TabsTrigger value="communities" className="text-gray-900 dark:text-white data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl">
            Communities
          </TabsTrigger>
          <TabsTrigger value="ChatIA" className="text-gray-900 dark:text-white data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl">
            ChatIA
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
          <form onSubmit={handleSubmit} className="mb-8">
            <Input
              type="text"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              placeholder="What's happening?"
              className="mb-2 bg-gray-100 text-black"
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Publicar
            </Button>
          </form>
          <TweetList tweets={forYouTweets} onRetweetChange={handleRetweetChange} />
        </TabsContent>
        <TabsContent value="following">
          <TweetList tweets={followingTweets} onRetweetChange={handleRetweetChange} />
        </TabsContent>
        <TabsContent value="communities">
        <ProfileProvider>
          <Communities />
        </ProfileProvider>
        </TabsContent>
        <TabsContent value="ChatIA">
          <ChatIA />
        </TabsContent>
      </Tabs>
    </div>
  );
}