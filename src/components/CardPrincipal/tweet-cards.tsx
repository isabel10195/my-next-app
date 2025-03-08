import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

export function TweetCard({ tweet, showStats = false }) {
  const { isAuthenticated } = useAuth();
  const [realTimeStats, setRealTimeStats] = useState(tweet);

  useEffect(() => {
    if (isAuthenticated && tweet?.tweet_id) {
      const ws = new WebSocket(`wss://api.tuapp.com/realtime/${tweet.tweet_id}`);

      ws.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setRealTimeStats(prev => ({
          ...prev,
          num_likes: newData.likes || prev.num_likes,
          num_retweets: newData.retweets || prev.num_retweets,
          num_comments: newData.comments || prev.num_comments
        }));
      };

      ws.onerror = (error) => {
        console.error("Error en conexión WebSocket:", error);
      };

      return () => {
        ws.close();
      };
    }
  }, [isAuthenticated, tweet.tweet_id]);

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900 p-4">
      <div className="flex items-center gap-2">
        <img
          src={realTimeStats.avatar_url}
          alt="Avatar"
          className="h-8 w-8 rounded-full"
        />
        <div>
          <p className="font-bold text-gray-900 dark:text-white">
            {realTimeStats.user_handle}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {new Date(realTimeStats.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <p className="mt-2 text-gray-800 dark:text-gray-200">
        {realTimeStats.tweet_text}
      </p>

      {realTimeStats.image_url && (
        <img
          src={realTimeStats.image_url}
          alt="Tweet image"
          className="mt-2 w-full rounded-lg"
        />
      )}

      {showStats && (
        <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            ❤️{" "}
            <span className="font-medium">
              {realTimeStats.num_likes.toLocaleString()}
            </span>
          </span>
          <span className="flex items-center gap-1">
            🔄{" "}
            <span className="font-medium">
              {realTimeStats.num_retweets.toLocaleString()}
            </span>
          </span>
          <span className="flex items-center gap-1">
            💬{" "}
            <span className="font-medium">
              {realTimeStats.num_comments.toLocaleString()}
            </span>
          </span>
        </div>
      )}

      {isAuthenticated && (
        <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
          ✔️ Datos actualizándose en tiempo real
        </div>
      )}
    </div>
  );
}