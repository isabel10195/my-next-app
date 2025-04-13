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

  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Error al eliminar usuario');
      setUsers((prev) => prev.filter((u) => u.user_id !== userId));
      toast.success('Usuario eliminado correctamente');
    } catch (error) {
      toast.error('No se pudo eliminar el usuario', {
        description: error.message,
      });
    }
  };

  const descargarPDF = async (userId) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/pdf`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Error al generar PDF');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `usuario_${userId}.pdf`;
      link.click();
    } catch (error) {
      toast.error('No se pudo generar el PDF', {
        description: error.message,
      });
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
            <button
              onClick={() => deleteUser(user.user_id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
            >
              Eliminar
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded">Aislar</button>
            <button
              onClick={() => descargarPDF(user.user_id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
            >
              Datos
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
