"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable } from "react-resizable";

import FullScreenCloseIcon from "@/assets/icons/FullScreenCloseIcon";
import FullScreenExpandIcon from "@/assets/icons/FullScreenExpandIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { createGoogleMapsEmbedUrl } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

const StreetViewPane = () => {
  const [dragData, setDragData] = useState({ x: 0, y: 0 });
  const [memoizedDragData, setMemoizedDragData] = useState<{
    x: number;
    y: number;
  } | null>(null);
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
    if (isStreetViewFullscreen) {
      if (memoizedDragData) {
        setDragData(memoizedDragData);
      }
    } else {
      setMemoizedDragData(dragData);
      setDragData({ x: 0, y: 0 });
    }
    toggleStreetViewFullscreen();
  };

  const handleCloseClick = () => {
    toggleStreetView(false);
  };

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    setDragData({ x: data.x, y: data.y });
  };

  useEffect(() => {
    return () => toggleStreetViewFullscreen(false);
  }, [toggleStreetViewFullscreen]);

  return (
    <Draggable handle=".drag-handle" position={dragData} onDrag={handleDrag}>
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
