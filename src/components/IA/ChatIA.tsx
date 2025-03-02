"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchAuthenticatedUser, sendMessageToAI } from "@/server/service/chatService"; // Importamos las funciones del servicio

const ChatIA = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cargar usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      const authenticatedUser = await fetchAuthenticatedUser();
      if (authenticatedUser) {
        setUser(authenticatedUser);
        const userChatKey = `chatConversation_${authenticatedUser.user_id}`;
        const savedMessages = localStorage.getItem(userChatKey);
        setMessages(savedMessages ? JSON.parse(savedMessages) : []);
      }
    };
    fetchUser();
  }, []);

  // Guardar mensajes en localStorage cada vez que cambien
  useEffect(() => {
    if (user) {
      localStorage.setItem(`chatConversation_${user.user_id}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  // Enviar mensaje
  const sendMessage = async () => {
    if (!input.trim() || !user) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const data = await sendMessageToAI(input);
    setMessages((prev) => [...prev, { sender: "ia", text: data.reply }]);

    setIsLoading(false);
  };

  // Manejo de Enter para enviar mensaje
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return user ? (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Chat con IA</h2>
      <div className="h-80 overflow-y-auto p-2 border mb-4">
        {messages.length === 0 ? (
          <p>No hay mensajes en la conversación.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === "ia" ? "text-blue-600" : "text-green-600"}`}>
              <strong>{msg.sender === "ia" ? "IA:" : "Tú:"}</strong> {msg.text}
            </div>
          ))
        )}
        {isLoading && <div className="text-gray-500">La IA está respondiendo...</div>}
      </div>
      <div className="flex">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-grow mr-2"
          onKeyDown={handleKeyDown}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          Enviar
        </Button>
      </div>
    </div>
  ) : (
    <p>Cargando...</p>
  );
};

export default ChatIA;
