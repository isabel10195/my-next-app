"use client";
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { fetchConversation, sendMessage as sendMsgService, markMessagesAsRead } from '@/server/service/messageService';

export default function ChatWindow({ contact, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (contact && messages.length > 0) {
      markMessagesAsRead(contact.user_id);
    }
  }, [contact, messages]);

  useEffect(() => {
    const loadConversation = async () => {
      if (contact) {
        try {
          const res = await fetchConversation(contact.user_id);
          setMessages(res.conversation);
        } catch (error) {
          console.error("Error al cargar la conversación:", error);
        }
      }
    };
    loadConversation();
  }, [contact]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const messageData = { receiverId: contact.user_id, content: newMessage };
      await sendMsgService(messageData);
      const sentMessage = { sender_id: currentUserId, content: newMessage, sent_at: new Date().toISOString() };
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  const isOwnMessage = (msg) => msg.sender_id === currentUserId;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow">
      <Card className="flex-1 bg-white dark:bg-gray-900 border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {contact ? `Chat con ${contact.user_handle}` : 'Selecciona un contacto'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <ScrollArea className="h-[600px] pr-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${isOwnMessage(msg) ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end ${isOwnMessage(msg) ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${msg.sender_id}`} />
                    <AvatarFallback>{String(msg.sender_id)[0] || "?"}</AvatarFallback>
                  </Avatar>
                  <div className={`mx-2 py-2 px-4 rounded-lg max-w-xs break-words
                    ${isOwnMessage(msg)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"}
                  `}>
                    <p>{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />

      <div className="flex items-center mt-2 p-2 bg-white dark:bg-gray-900">
        <Input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 mr-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <Button onPress={handleSendMessage}>Enviar</Button>
      </div>
    </div>
  );
}
