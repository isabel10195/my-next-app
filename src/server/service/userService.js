const API_URL = "/api/users";

export const fetchUserData = async () => {
  const response = await fetch(`${API_URL}/data`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener los datos del perfil");
  return response.json();
};

export const fetchUserDetails = async () => {
  const response = await fetch(`${API_URL}/details`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener los detalles del usuario");
  return response.json();
};
