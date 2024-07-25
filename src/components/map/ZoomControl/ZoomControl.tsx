"use client";

import { useDrag } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";

import useDisableMapInteraction from "@/stores/useDisableMapInteraction";

const ZoomControl = () => {
  const zoomLevels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const map = useMap();

  const handleZoomChange = () => {
    setCurrentZoom(map.getZoom());
  };

  useEffect(() => {
    map.on("zoomend", handleZoomChange);
    return () => {
      map.off("zoomend", handleZoomChange);
    };
  }, [map]);

  const [currentZoom, setCurrentZoom] = useState(0);
  const controlRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useDisableMapInteraction(controlRef);
  useDisableMapInteraction(containerRef);

  const snapToClosest = (y: number) => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const levelHeight = containerHeight / zoomLevels.length;
    const closest = zoomLevels.reduce((prev, curr) =>
      Math.abs((curr - 1) * levelHeight - y) <
      Math.abs((prev - 1) * levelHeight - y)
        ? curr
        : prev
    );
    return closest;
  };

  const bind = useDrag(
    ({ movement: [, my], memo = 0, last }) => {
      const containerHeight = containerRef.current?.clientHeight || 0;
      const levelHeight = containerHeight / zoomLevels.length;

      if (!memo) {
        const initialY = controlRef.current?.getBoundingClientRect().top || 0;
        memo =
          initialY - (containerRef.current?.getBoundingClientRect().top || 0);
      }

      const newY = memo + my;
      const zoomLevel = snapToClosest(newY);

      if (controlRef.current) {
        controlRef.current.style.transform = `translateY(${
          (zoomLevel - 1) * levelHeight
        }px) translateX(-50%)`;
      }

      if (last) {
        setCurrentZoom(zoomLevel);
        map.setZoom(zoomLevel);
      }

      return memo;
    },
    {
      axis: "y",
      bounds: {
        top: 0,
        bottom:
          (zoomLevels.length - 1) *
          ((containerRef.current?.clientHeight || 0) / zoomLevels.length),
      },
      rubberband: true,
    }
  );

  const handleClick = (e: React.MouseEvent) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const clickY = e.clientY - containerRect.top;
      const zoomLevel = snapToClosest(clickY);
      setCurrentZoom(zoomLevel);
      if (controlRef.current) {
        controlRef.current.style.transform = `translateY(${
          (zoomLevel - 1) * (containerRect.height / zoomLevels.length)
        }px) translateX(-50%)`;
      }
      map.setZoom(zoomLevel); // Set the map zoom level to the selected level
    }
  };

  useEffect(() => {
    if (controlRef.current && containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const levelHeight = containerHeight / zoomLevels.length;
      controlRef.current.style.transform = `translateY(${
        (currentZoom - 1) * levelHeight
      }px) translateX(-50%)`;
    }
  }, [currentZoom]);

  return (
    <div className="flex justify-center">
      <div
        className="relative w-2 bg-primary h-[180px] cursor-pointer"
        ref={containerRef}
        onClick={handleClick}
      >
        <div
          className="absolute h-2 bg-primary-foreground border-primary border-[1px] cursor-pointer w-5 left-1/2"
          {...bind()}
          ref={controlRef}
        />
      </div>
    </div>
  );
};

export default ZoomControl;
