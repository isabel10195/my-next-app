"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/feed_c/tabs";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { 
  fetchForYouTweets, 
  fetchFollowingTweets, 
  createTweet,
  likeTweet
} from "@/server/service/tweetService";

export default function Feed() {
  const [forYouTweets, setForYouTweets] = useState([]);
  const [followingTweets, setFollowingTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [activeTab, setActiveTab] = useState("for-you");

  // Carga los tweets de la pestaña "For You"
  const loadForYouTweets = async () => {
    try {
      const tweets = await fetchForYouTweets();
      setForYouTweets(tweets);
    } catch (error) {
      console.error(error);
    }
  };

  // Carga los tweets de los usuarios seguidos
  const loadFollowingTweets = async () => {
    try {
      const tweets = await fetchFollowingTweets();
      setFollowingTweets(tweets);
    } catch (error) {
      console.error(error);
    }
  };

  // Al montar el componente se cargan ambos conjuntos de tweets
  useEffect(() => {
    loadForYouTweets();
    loadFollowingTweets();
  }, []);

  useEffect(() => {
    if (activeTab === "for-you") {
      loadForYouTweets();
    } else {
      loadFollowingTweets();
    }
  }, [activeTab]);

  // Cuando cambia a la pestaña "Following", se recargan sus tweets
  useEffect(() => {
    if (activeTab === "following") {
      loadFollowingTweets();
    }
  }, [activeTab]);

  // Crea un tweet al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTweet.trim()) {
      try {
        await createTweet(newTweet);
        setNewTweet("");
        loadForYouTweets();
        loadFollowingTweets();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Función para alternar el like
  const toggleLike = async (tweet) => {
    try {
      let updatedTweet = { 
        ...tweet, 
        liked: !tweet.liked, 
        num_likes: tweet.liked ? tweet.num_likes - 1 : tweet.num_likes + 1 
      };
  
      setForYouTweets((prev) => prev.map((t) => (t.tweet_id === tweet.tweet_id ? updatedTweet : t)));
      setFollowingTweets((prev) => prev.map((t) => (t.tweet_id === tweet.tweet_id ? updatedTweet : t)));
  
      await likeTweet(tweet.tweet_id); // Siempre llamamos a likeTweet
    } catch (error) {
      console.error(error);
    }
  };  

  // Componente para listar tweets
  const TweetList = ({ tweets }) => (
    <div>
      <AnimatePresence>
        {tweets.map((tweet) => (
          <motion.div
            key={tweet.tweet_id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-4"
          >
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage
                  src={tweet.avatar_url || "/placeholder-user.jpg"}
                  alt={tweet.user_handle || "User"}
                />
                <AvatarFallback>
                  {tweet.user_handle ? tweet.user_handle[0] : "U"}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                @{tweet.user_handle}
              </h3>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{tweet.tweet_text}</p>
            <div className="flex items-center justify-start space-x-4 text-gray-500 dark:text-gray-400">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleLike(tweet)}
              >
                <Heart 
                  className="mr-2 h-4 w-4" 
                  color={tweet.liked ? "red" : "currentColor"}
                  fill={tweet.liked ? "red" : "none"}
                />
                {tweet.num_likes || 0}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Comment
              </Button>
              <Button variant="ghost" size="sm">
                <Repeat2 className="mr-2 h-4 w-4" />
                Retweet
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex-1 max-w-full ml-8 mr-5 mx-auto overflow-hidden mt-4 bg-gray-200 dark:bg-gray-950 rounded-2xl ">
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="for-you" className="text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 rounded-2xl">For You</TabsTrigger>
          <TabsTrigger value="following" className="text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 rounded-2xl">Following</TabsTrigger>
          <TabsTrigger value="communities" className="text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 rounded-2xl">Communities</TabsTrigger>
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
            <Button type="submit" className="w-full bg-blue-500 text-white dark:bg-blue-800">
              Tweet
            </Button>
          </form>
          <TweetList tweets={forYouTweets} />
        </TabsContent>
        <TabsContent value="following">
          <TweetList tweets={followingTweets} />
        </TabsContent>
        <TabsContent value="communities">
          <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
            Explore and join communities based on your interests.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
