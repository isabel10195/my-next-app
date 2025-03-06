const API_URL = "/api/followers";

export const fetchRecommendations = async () => {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener recomendaciones");
  return response.json();
};

export const fetchFollowers = async () => {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener seguidores");
  return response.json();
};

export const fetchFollowing = async () => {
  const response = await fetch(`${API_URL}/following`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener seguidos");
  return response.json();
};

export const followUser = async (follow_user_id) => {
  const response = await fetch(`${API_URL}/follow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ follow_user_id }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al seguir al usuario");
  }
  return response.json();
};

export const unfollowUser = async (follow_user_id) => {
  const response = await fetch(`${API_URL}/unfollow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ follow_user_id }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al dejar de seguir al usuario");
  }
  return response.json();
};
