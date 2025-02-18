import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { PlayCircleIcon, HeartIcon } from "lucide-react";
import axios from "axios";

const SpotifyRecommendationsCard = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    fetchSpotifyRecommendations();
  }, []);

  const fetchSpotifyRecommendations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/spotify/recommendations"); // 👈 Llama al backend
      setTracks(response.data);
      setCurrentTrack(response.data[0]);
    } catch (error) {
      console.error("❌ Error fetching Spotify recommendations:", error.response?.data || error);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="max-w-md mx-auto my-4">
      <Card isBlurred className="border-none bg-gradient-to-r from-green-500 to-green-900 shadow-lg rounded-xl">
        <CardBody className="p-4">
          {currentTrack && (
            <div className="grid grid-cols-12 gap-3 items-center">
              <Image
                alt="Current Track"
                className="object-cover rounded-xl col-span-4"
                src={currentTrack.album.images[0].url}
              />
              <div className="col-span-8">
                <h3 className="font-semibold text-white text-md">{currentTrack.name}</h3>
                <p className="text-xs text-gray-200">{currentTrack.artists[0].name}</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    isIconOnly
                    className="text-white bg-green-600 hover:bg-green-700"
                    radius="full"
                    size="sm"
                    onClick={() => window.open(currentTrack.external_urls.spotify, "_blank")}
                  >
                    <PlayCircleIcon size={20} />
                  </Button>
                  <Button isIconOnly className="text-white bg-white/10" radius="full" size="sm">
                    <HeartIcon size={20} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default SpotifyRecommendationsCard;
