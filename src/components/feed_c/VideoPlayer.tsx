import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (!video) return;

          if (entry.isIntersecting) {
            video.play().catch((error) => {
              if (error.name !== 'AbortError') {
                console.error('Error al reproducir:', error);
              }
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
    );

    observerRef.current = observer;

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <video
      ref={videoRef}
      controls
      muted
      playsInline
      onClick={handleVideoClick}
      className="w-full h-auto max-h-96 object-contain"
    >
      <source src={src} type="video/mp4" />
      Tu navegador no soporta videos HTML5
    </video>
  );
};

export default VideoPlayer;