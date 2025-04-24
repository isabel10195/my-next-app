"use client";
import React, { useState } from "react";
import MessagingSidebar from "@/components/message/MessagingSidebar";
import ChatWindow from "@/components/message/ChatWindow";
import BackButton from "@/components/ui/BackButton";
import { useAuth } from "@/app/context/AuthContext";

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center text-gray-700 dark:text-gray-300 mt-10">Cargando...</div>;

  if (!user) return <div className="text-center text-red-600 dark:text-red-400 mt-10">No autenticado</div>;

  const currentUserId = user.user_id;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
      {/* Sidebar de mensajes */}
      <div className="w-1/3 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="p-2">
          <BackButton href="/" />
        </div>
        <MessagingSidebar onSelectContact={(contact) => setSelectedContact(contact)} />
      </div>

      {/* Ventana de chat */}
      <div className="w-2/3 bg-white dark:bg-gray-900">
        {selectedContact ? (
          <ChatWindow contact={selectedContact} currentUserId={currentUserId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>Selecciona un contacto para iniciar el chat</p>
          </div>
        )}
      </div>
    </div>
  );
}
