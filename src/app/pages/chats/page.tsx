"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/MultimediaCard/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  { id: 1, sender: "John", content: "Hey, how are you?", timestamp: "2023-05-01T10:00:00Z" },
  { id: 2, sender: "You", content: "I'm doing well, thanks! How about you?", timestamp: "2023-05-01T10:05:00Z" },
  { id: 3, sender: "John", content: "Great! Just working on some projects. Any plans for the weekend?", timestamp: "2023-05-01T10:10:00Z" },
  { id: 4, sender: "You", content: "Thinking of going hiking. Want to join?", timestamp: "2023-05-01T10:15:00Z" },
  { id: 5, sender: "John", content: "That sounds fun! I'd love to join. Where are you planning to go?", timestamp: "2023-05-01T10:20:00Z" },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Messages</h3>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">Chat with John</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                      <div className={`flex ${message.sender === 'You' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                          <AvatarFallback>{message.sender[0]}</AvatarFallback>
                        </Avatar>
                        <div className={`mx-2 py-2 px-4 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                          <p>{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <Separator className="my-4" />
                <div className="flex mt-4">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                    className="flex-1 mr-2"
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

