"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Share, Repeat1 } from "lucide-react"; // Importamos Repeat para el icono de retweeted
import CommentInput from "@/components/CommentInput/CommentInput";
import { commentTweet, fetchCommentsByTweet } from "@/server/service/tweetService";
import { toggleRetweet } from "@/server/service/tweetService";
import Link from "next/link"; // Import Link

const Tweet = ({ tweet, onLike, onComment, onRetweetChange }) => {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comments, setComments] = useState(tweet.comments || []);
    const [numComments, setNumComments] = useState(tweet.num_comments || 0);
    const [tweetState, setTweetState] = useState(tweet);
    const [isRetweetedLocal, setIsRetweetedLocal] = useState(tweet.retweeted || false); // Estado local para el retweet

    useEffect(() => {
        setTweetState(tweet);
        setIsRetweetedLocal(tweet.retweeted || false);
    }, [tweet]);

    useEffect(() => {
        if (showCommentInput && comments.length === 0) {
            fetchCommentsByTweet(tweet.tweet_id)
                .then((data) => {
                    setComments(data.comments);
                    setNumComments(data.comments.length);
                })
                .catch((error) => console.error("Error al obtener comentarios:", error));
        }
    }, [showCommentInput, tweet.tweet_id, comments.length]);

    const handleComment = async (tweetId, commentText) => {
        try {
            const response = await commentTweet(tweetId, commentText);
            const newComment = response.comment;
            setComments([...comments, newComment]);
            setNumComments((prev) => prev + 1);
            onComment(tweetId, numComments + 1);
        } catch (error) {
            console.error("Error al crear comentario:", error);
        }
    };

    const handleRetweet = async () => {
        try {
            const res = await toggleRetweet(tweetState.tweet_id);
            if (res.success) {
                const newRetweetState = {
                    ...tweetState,
                    num_retweets: isRetweetedLocal
                        ? tweetState.num_retweets - 1
                        : tweetState.num_retweets + 1,
                    retweeted: !isRetweetedLocal,
                };
                setTweetState(newRetweetState);
                setIsRetweetedLocal(!isRetweetedLocal); // Actualiza el estado local
                onRetweetChange(tweetState.tweet_id, !isRetweetedLocal); // Notifica al padre
            }
        } catch (error) {
            console.error("Error al hacer retweet:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-4"
        >
            {tweet.retweeter && (
                <p className="text-sm text-gray-500">
                    Retweteado por @{tweet.retweeter}
                </p>
            )} <br />
            <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={tweet.avatar_url || "/placeholder-user.jpg"} alt={tweet.user_handle} />
                    <AvatarFallback>{tweet.user_handle ? tweet.user_handle[0] : "U"}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">@{tweet.user_handle}</h3>
                    {tweet.community_id && (
                        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                            Tweet de comunidad
                        </span>
                    )}
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{tweet.tweet_text || tweet.comment_text}</p>
            <div className="flex items-center justify-start space-x-4 text-gray-500 dark:text-gray-400">
                <Button variant="ghost" size="sm" onClick={() => onLike(tweet)}>
                    <Heart className="mr-2 h-4 w-4" color={tweet.liked ? "red" : "currentColor"} fill={tweet.liked ? "red" : "none"} />
                    {tweet.num_likes || 0}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowCommentInput(!showCommentInput)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {numComments}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleRetweet}>
                    {isRetweetedLocal ? (
                        <Repeat1 className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                        <Repeat2 className="mr-2 h-4 w-4" />
                    )}
                    {tweetState.num_retweets || 0}
                </Button>
                <Button variant="ghost" size="sm">
                    <Share className="mr-2 h-4 w-4" />
                </Button>
            </div>
            {showCommentInput && <CommentInput tweetId={tweet.tweet_id} onCommentSubmit={handleComment} />}
            {comments.length > 0 && (
                <div className="mt-4 border-l-2 border-gray-300 pl-4">
                    {comments.map((comment) => (
                        <Tweet key={comment.comment_id || comment.tweet_id} tweet={comment} onLike={onLike} onComment={onComment} onRetweetChange={onRetweetChange} />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default Tweet;