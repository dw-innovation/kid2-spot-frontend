"use client";

import React, { useState } from "react";

import { Button } from "../ui/button";

type Props = {
  videoUrl: string;
};

const VideoPlayer = ({ videoUrl }: Props) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const handleClick = () => {
    setShowPlayer(true);
  };

  return (
    <>
      <div className="my-4 flex justify-center">
        {!showPlayer ? (
          <Button onClick={handleClick}>
            agree to YouTube privacy statement and show video
          </Button>
        ) : (
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
