"use client";
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Importa tus funciones de service
import { 
  fetchUserByQuery, 
  addContact as addContactService, 
  fetchFollowing, 
  fetchRecentChats  // Usaremos este endpoint para obtener los contactos
} from '@/server/service/messageService';

export default function MessagingSidebar({ onSelectContact }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [userResult, setUserResult] = useState(null);
  const [error, setError] = useState('');
  const [following, setFollowing] = useState([]);
  const [contacts, setContacts] = useState([]); // Renombramos "recentChats" a "contacts"

  // Búsqueda de usuario
  const handleSearch = async () => {
    try {
      const user = await fetchUserByQuery(searchTerm);
      if (user) {
        setUserResult(user);
        setError('');
      } else {
        setUserResult(null);
        setError('Usuario no encontrado');
      }
    } catch (err) {
      setError('Error en la búsqueda');
    }
  };

  const handleAddContact = async () => {
    try {
      await addContactService(userResult.user_id);
      setUserResult(null);
      // Actualizamos la lista de contactos
      await updateContacts();
      onSelectContact(userResult);
    } catch (err) {
      console.error("Error al agregar contacto", err);
    }
  };
  
  const updateContacts = async () => {
    try {
      const chatsData = await fetchRecentChats();
      console.log("Datos actualizados de contactos:", chatsData);
      setContacts(chatsData);
    } catch (err) {
      console.error("Error al actualizar contactos", err);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    const loadLists = async () => {
      try {
        const followingData = await fetchFollowing();
        setFollowing(followingData);
        await updateContacts();
      } catch (err) {
        console.error("Error al cargar las listas", err);
      }
    };

    loadLists();
  }, []);

  return (
    <div className="p-4 border-r border-gray-300">
      {/* Buscador */}
      <div className="mb-4">
        <Input
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {userResult && (
        <div className="mb-4 p-2 border rounded">
          <p className="font-bold">{userResult.user_handle}</p>
          <div className="flex gap-2">
            <Button onClick={handleAddContact}>Agregar a Contactos</Button>
            <Button onClick={() => onSelectContact(userResult)}>Iniciar Chat</Button>
          </div>
        </div>
      )}

      {/* Listado de Seguidos */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Seguidos</h3>
        {following.length > 0 ? (
          following.map((user) => (
            <div key={user.user_id} className="p-2 border-b hover:bg-gray-50 cursor-pointer" onClick={() => onSelectContact(user)}>
              <p>{user.user_handle}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No sigues a nadie.</p>
        )}
      </div>

      {/* Bloque de Contactos (antes "Chasts Recientes") */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Contactos</h3>
        {contacts.map((contact) => (
          <div key={contact.user_id} className="p-2 border-b hover:bg-gray-50 cursor-pointer relative" 
              onClick={() => onSelectContact(contact)}>
            <div className="flex justify-between items-center">
              <p>{contact.user_handle}</p>
              {contact.unread_count > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {contact.unread_count}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{contact.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}