"use client";

import React from "react";

import useGlobalStore from "@/stores/useGlobalStore";

import { Button } from "../ui/button";

type Props = {
  videoUrl: string;
  posterUrl: string;
};

const VideoPlayer = ({ videoUrl, posterUrl }: Props) => {
  const youTubeConsent = useGlobalStore((state) => state.youTubeConsent);
  const toggleYouTubeConsent = useGlobalStore(
    (state) => state.toggleYouTubeConsent
  );

  const handleClick = () => {
    toggleYouTubeConsent();
  };

  return (
    <>
      <div className="my-4 flex justify-center">
        {!youTubeConsent ? (
          <div className="relative">
            <img
              src={posterUrl}
              alt="preview image of the video"
              className="w-1/2"
              style={{
                filter: "blur(4px)",
              }}
            />
            <div className="absolute z-10 h-full w-1/2 flex items-center justify-center top-0 left-0">
              <Button onClick={handleClick}>
                I agree with YouTube privacy statement, please show the video
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-1/2 aspect-video relative">
            <iframe
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-1/2 h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
