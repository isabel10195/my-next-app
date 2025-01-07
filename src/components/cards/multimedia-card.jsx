'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react"
import { HeartIcon, PauseCircleIcon, NextIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon } from './iconos'

const MultimediaCard = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [liked, setLiked] = useState(false)

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="max-w-md mx-auto my-2"
    >
      <Card
        isBlurred
        className="border-none bg-gradient-to-r from-blue-500 to-blue-950 shadow-lg rounded-xl"
      >
        <CardBody className="p-3">
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="relative col-span-4">
              <Image
                alt="Current Track"
                className="object-cover rounded-xl w-34 h-34"
                src="https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0"
              />
            </div>

            <div className="flex flex-col col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-white text-sm">Daily Mix</h3>
                  <p className="text-xs text-gray-200">12 Tracks</p>
                  <h1 className="text-base font-medium mt-1 text-white">Frontend Radio</h1>
                </div>
                <Button
                  isIconOnly
                  className="text-white data-[hover]:bg-white/10"
                  radius="full"
                  variant="light"
                  size="sm"
                  onPress={() => setLiked((v) => !v)}
                >
                  <HeartIcon
                    size={18}
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "currentColor" : "none"}
                  />
                </Button>
              </div>

              <div className="flex flex-col mt-2 gap-1">
                <Slider
                  aria-label="Music progress"
                  classNames={{
                    track: "bg-white/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-white",
                  }}
                  color="foreground"
                  defaultValue={33}
                  size="sm"
                />
                <div className="flex justify-between">
                  <p className="text-xs text-gray-200">1:23</p>
                  <p className="text-xs text-gray-200">4:32</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-1 mt-2">
                <Button
                  isIconOnly
                  className="data-[hover]:bg-white/10 text-white"
                  radius="full"
                  variant="light"
                  size="sm"
                >
                  <RepeatOneIcon size={16} />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-white/10 text-white"
                  radius="full"
                  variant="light"
                  size="sm"
                >
                  <PreviousIcon size={16} />
                </Button>
                <Button
                  isIconOnly
                  className="w-auto h-auto data-[hover]:bg-white/10 text-white"
                  radius="full"
                  variant="light"
                  onPress={togglePlayPause}
                >
                  {isPlaying ? (
                    <PauseCircleIcon size={32} />
                  ) : (
                    <NextIcon size={32} />
                  )}
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-white/10 text-white"
                  radius="full"
                  variant="light"
                  size="sm"
                >
                  <NextIcon size={16} />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-white/10 text-white"
                  radius="full"
                  variant="light"
                  size="sm"
                >
                  <ShuffleIcon size={16} />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

export default MultimediaCard

