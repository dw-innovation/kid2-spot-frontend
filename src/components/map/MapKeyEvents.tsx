import { useCallback, useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import useKeyPress from "@/lib/hooks/useKeyPress";

const MapKeyEvents = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const map = useMap();

  const handleMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsMouseOver(false);
  }, []);
  useEffect(() => {
    map.on("mouseover", () => handleMouseOver());
    map.on("mouseout", () => handleMouseOut());

    return () => {
      map.off("mouseover", () => handleMouseOver());
      map.off("mouseout", () => handleMouseOut());
    };
  }, [handleMouseOut, handleMouseOver, map]);

  useKeyPress("-", () => isMouseOver && map.zoomOut());
  useKeyPress("+", () => isMouseOver && map.zoomIn());

  return null;
};

export default MapKeyEvents;
