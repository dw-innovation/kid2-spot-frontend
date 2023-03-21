import React, { useCallback, useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import useKeyPress from "@/lib/hooks/useKeyPress";
import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";

type Props = {};

const MapKeyEvents = (props: Props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const togglePolygonMode = useMapStore((state) => state.togglePolygonMode);
  const clearPolygon = usePolygonStore((state) => state.clearPolygon);
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

  useKeyPress("p", () => isMouseOver && togglePolygonMode());
  useKeyPress("c", () => isMouseOver && clearPolygon());
  useKeyPress("-", () => isMouseOver && map.zoomOut());
  useKeyPress("+", () => isMouseOver && map.zoomIn());

  return <></>;
};

export default MapKeyEvents;
