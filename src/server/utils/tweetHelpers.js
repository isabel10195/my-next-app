function decryptMediaUrls(tweet) {
    if (!tweet.media_urls) return tweet;
    
    try {
      // Si es un string, convertirlo a array
      const rawData = tweet.media_urls.startsWith('[') 
        ? JSON.parse(tweet.media_urls)
        : tweet.media_urls.split(',').map(url => url.trim().replace(/^"|"$/g, ''));
  
      const decryptedUrls = rawData.map(url => {
        return url.startsWith('enc:') ? decrypt(url.slice(4)) : url;
      });
      
      tweet.media_urls = decryptedUrls;
    } catch (error) {
      console.error("Error procesando medios:", error);
      tweet.media_urls = [];
    }
    return tweet;
  }