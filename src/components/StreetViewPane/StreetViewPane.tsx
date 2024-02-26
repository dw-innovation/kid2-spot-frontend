"use client";

import { Cross1Icon, MoveIcon, SizeIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable } from "react-resizable";

import { cn, createGoogleMapsEmbedUrl } from "@/lib/utils";
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
    toggleStreetViewFullscreen(false);
    toggleStreetView(false);
  };

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    setDragData({ x: data.x, y: data.y });
  };

  useEffect(() => {
    return () => toggleStreetViewFullscreen(false);
  }, [toggleStreetViewFullscreen]);

  return (
    <div
      className={cn(
        isStreetViewFullscreen ? "relative" : "absolute bottom-0 right-0"
      )}
    >
      <Draggable handle=".drag-handle" position={dragData} onDrag={handleDrag}>
        <Resizable width={600} height={400}>
          <div
            className={clsx(
              "rounded-lg bg-white shadow-md cursor-grab",
              isStreetViewFullscreen
                ? "fixed z-[10000] top-0 left-0 w-screen h-screen p-2"
                : "absolute w-[400px] h-[250px] z-[10000] bottom-0 right-0 -translate-x-full -translate-y-full m-4",
              showStreetView ? "block" : "hidden"
            )}
          >
            <div
              className={cn(
                "drag-handle",
                isStreetViewFullscreen && "hidden",
                "flex justify-between px-2 cursor-grab"
              )}
            >
              <div className="flex items-center gap-1">
                <MoveIcon scale={20} />
                <span className="p-2 font-sans font-semibold">
                  Google Street View
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={handleFullscreenClick}>
                  <SizeIcon scale={20} />
                </button>
                <button onClick={handleCloseClick}>
                  <Cross1Icon scale={20} />
                </button>
              </div>
            </div>
            <div className="relative w-full h-full">
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
    </div>
  );
};

export default StreetViewPane;
