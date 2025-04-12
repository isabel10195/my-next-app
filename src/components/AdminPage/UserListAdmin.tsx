'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UserListAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Error al obtener usuarios');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error('Error al cargar usuarios', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) return <p className="text-zinc-500 dark:text-zinc-400">Cargando usuarios...</p>;
  if (users.length === 0) return <p className="text-zinc-500 dark:text-zinc-400">No hay usuarios registrados.</p>;

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.user_id} className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3 shadow">
          <span className="text-gray-900 dark:text-white">@{user.user_handle}</span>
          <div className="flex gap-2">
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded">Eliminar</button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded">Aislar</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded">Datos</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
