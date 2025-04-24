import { useState, useEffect } from 'react';
import { fetchFollowingStories, uploadStory } from '../../server/service/storyService';

export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStories = async () => {
    try {
      const { stories } = await fetchFollowingStories();
      setStories(stories);
    } catch (error) {
      console.error("Error cargando Stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleUpload = async (file, description) => {
    try {
      await uploadStory(file, description);
      await loadStories(); // Recargar Stories después de subir
    } catch (error) {
      throw error;
    }
  };

  return { stories, loading, uploadStory: handleUpload };
};