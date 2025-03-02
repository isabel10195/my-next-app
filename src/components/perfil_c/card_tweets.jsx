"use client"

import { useState } from "react"
import { Edit, Trash, Check, X } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function CardTweets({ tweets, handleDeleteTweet, handleEditTweet, handleSaveTweet }) {
  const [editingTweetId, setEditingTweetId] = useState(null)
  const [editedTweetText, setEditedTweetText] = useState("")

  const startEditing = (tweetId, text) => {
    setEditingTweetId(tweetId)
    setEditedTweetText(text)
  }

  const cancelEditing = () => {
    setEditingTweetId(null)
    setEditedTweetText("")
  }

  return (
    <Card className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none  shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Tweets</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {tweets.map((tweet) => (
            <li key={tweet.tweet_id} className="p-4 bg-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <img src={tweet.avatar_url || "/placeholder.svg"} alt="Avatar" className="w-12 h-12 rounded-full" />
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
                        onClick={() => handleSaveTweet(tweet.tweet_id, editedTweetText)}
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
                        onClick={() => handleDeleteTweet(tweet.tweet_id)}
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
      </CardContent>
    </Card>
  )
}

export default CardTweets

