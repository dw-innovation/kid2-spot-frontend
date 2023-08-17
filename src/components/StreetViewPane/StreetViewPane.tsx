import clsx from "clsx";
import React, { useEffect } from "react";

import FullScreenCloseIcon from "@/assets/icons/FullScreenCloseIcon";
import FullScreenExpandIcon from "@/assets/icons/FullScreenExpandIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { createGoogleMapsEmbedUrl } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import { Button } from "../ui/button";

const StreetViewPane = () => {
  const isStreetViewFullscreen = useAppStore(
    (state) => state.isStreetViewFullscreen
  );

  const toggleStreetViewFullscreen = useAppStore(
    (state) => state.toggleStreetViewFullscreen
  );

  const streetViewCoordinates = useStreetViewStore(
    (state) => state.streetViewCoordinates
  );

  const toggleStreetView = useStreetViewStore(
    (state) => state.toggleStreetView
  );

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
    <div
      className={clsx(
        isStreetViewFullscreen
          ? "fixed z-[10000] top-0 left-0 w-full h-full"
          : "relative w-full h-full"
      )}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-0 right-0 z-20 flex items-end gap-2">
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
  );
};

export default StreetViewPane;
