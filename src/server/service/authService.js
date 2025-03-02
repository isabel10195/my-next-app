const API_URL = "http://localhost:3001/api/auth";

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al cerrar sesión");
  return response.text();
};