"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import Draggable from "react-draggable"; // Import the react-draggable library
import { Resizable } from "react-resizable";

import FullScreenCloseIcon from "@/assets/icons/FullScreenCloseIcon";
import FullScreenExpandIcon from "@/assets/icons/FullScreenExpandIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { createGoogleMapsEmbedUrl } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const StreetViewPane = () => {
  const isStreetViewFullscreen = useGlobalStore(
    (state) => state.isStreetViewFullscreen
  );
  const toggleStreetViewFullscreen = useGlobalStore(
    (state) => state.toggleStreetViewFullscreen
  );
  const streetViewCoordinates = useStreetViewStore(
    (state) => state.streetViewCoordinates
  );
  const toggleStreetView = useStreetViewStore(
    (state) => state.toggleStreetView
  );
  const showStreetView = useStreetViewStore((state) => state.showStreetView);

  const handleFullscreenClick = () => {
    toggleStreetViewFullscreen();
  };
  const handleCloseClick = () => {
    toggleStreetView(false);
  };

  useEffect(() => {
    return () => toggleStreetViewFullscreen(false);
  }, [toggleStreetViewFullscreen]);

  return (
    <Draggable handle=".drag-handle">
      <Resizable width={600} height={300}>
        <div
          className={clsx(
            "rounded-lg bg-white shadow-md cursor-grab",
            isStreetViewFullscreen
              ? "fixed z-[10000] top-0 left-0 w-full h-full"
              : "absolute w-fit h-fit z-[10000] bottom-0 right-0 -translate-x-full -translate-y-full m-4",
            showStreetView ? "block" : "hidden"
          )}
        >
          <div className="drag-handle">
            <span className="p-2 font-sans font-semibold">
              Google Street View
            </span>
          </div>
          <div className="relative w-full h-full">
            <div className="absolute top-0 right-0 z-20 flex items-end gap-2 m-2">
              <Button onClick={handleFullscreenClick}>
                {isStreetViewFullscreen ? (
                  <FullScreenCloseIcon />
                ) : (
                  <FullScreenExpandIcon />
                )}
              </Button>
              <Button onClick={handleCloseClick} className="aspect-square">
                <div className="rotate-45">
                  <PlusIcon />
                </div>
              </Button>
            </div>
            <iframe
              src={createGoogleMapsEmbedUrl(streetViewCoordinates)}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default StreetViewPane;
