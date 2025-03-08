export const fetchNews = async () => {
  try {
    const response = await fetch('https://magicloops.dev/api/loop/6743674f-6f2e-4738-8dd9-83b9d6ed76af/run');
    if (!response.ok) throw new Error('Error fetching news');
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      Deporte: [],
      Tecnología: [],
      Economía: [],
      "Noticias Generales": [],
      Salud: []
    };
  }
};