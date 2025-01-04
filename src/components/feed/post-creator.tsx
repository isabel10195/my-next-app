'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/cards/card"

interface PostCreatorProps {
  userAvatar: string
  userName: string
  onTweetSent: (newTweet: any) => void // Esta función se usará para actualizar los tweets en Home
}

export function PostCreator({ userAvatar, userName, onTweetSent }: PostCreatorProps) {
  const [tweetText, setTweetText] = useState("")

  const handleSendTweet = async () => {
    if (!tweetText.trim()) {
      alert("El tweet no puede estar vacío.")
      return
    }

    try {
      const response = await fetch("http://localhost:3001/create-tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
        body: JSON.stringify({ tweet_text: tweetText })
      })

      if (response.ok) {
        const data = await response.json()
        alert("Tweet enviado correctamente.")
        setTweetText("") 

        // Llamar a onTweetSent para agregar el nuevo tweet al estado de Home
        onTweetSent(data.newTweet); // Suponiendo que el backend retorna el nuevo tweet
      } else {
        alert("Error al enviar el tweet.")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <Card className="p-4 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-gray-50 dark:bg-gray-950 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Share something"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Button size="sm" className="bg-black text-white hover:bg-black/90 dark:bg-gray-700 dark:hover:bg-gray-600 ml-auto" onClick={handleSendTweet}>
          Send
        </Button>
      </div>
    </Card>
  )
}
