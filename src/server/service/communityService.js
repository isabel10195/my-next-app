const API_URL = "http://localhost:3001/api/community";

export const fetchUserCommunities = async () => {
  const response = await fetch(`${API_URL}/user`, { credentials: "include" });
  if (!response.ok) throw new Error("Error al obtener tus comunidades");
  const data = await response.json();
  return data.communities;
};

export const fetchExploreCommunities = async (category = "") => {
  let url = `${API_URL}/explore`;
  if (category) url += `?category=${category}`;
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Error al obtener las comunidades");
  const data = await response.json();
  return data.communities;
};

export const joinCommunity = async (communityId) => {
  const response = await fetch(`${API_URL}/join`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ communityId }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al unirse a la comunidad");
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`, { credentials: "include" });
  if (!response.ok) throw new Error("Error al obtener las categorías");
  const data = await response.json();
  return data.categories;
};