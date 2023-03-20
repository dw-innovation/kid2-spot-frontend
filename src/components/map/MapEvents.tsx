import { useCallback, useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import useKeyPress from "@/lib/hooks/useKeyPress";
import { getFlyToAnimationSpeed } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

const MapEvents = () => {
  const setBbox = useMapStore((state) => state.setBbox);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const mapCenter = useMapStore((state) => state.mapCenter);
  const togglePolygonMode = useMapStore((state) => state.togglePolygonMode);
  const clearPolygon = useMapStore((state) => state.clearPolygon);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const map = useMap();

  const updateBbox = useCallback(() => {
    const bounds = map.getBounds();

    setBbox([
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
    ]);
  }, [map, setBbox]);

  const updateZoom = useCallback(() => {
    setMapZoom(map.getZoom());
  }, [map, setMapZoom]);

  const handleMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  useEffect(() => {
    updateZoom();
    updateBbox();
    map.on("moveend", () => updateBbox());
    map.on("zoomlevelschange", () => updateZoom());
    map.on("mouseover", () => handleMouseOver());
    map.on("mouseout", () => handleMouseOut());

    return () => {
      map.off("moveend", () => updateBbox());
      map.off("zoomlevelschange", () => updateZoom());
      map.off("mouseover", () => handleMouseOver());
      map.off("mouseout", () => handleMouseOut());
    };
  }, [handleMouseOut, handleMouseOver, map, setBbox, updateBbox, updateZoom]);

  /*   useEffect(() => {
    // @ts-ignore
    map.flyTo(mapCenter, undefined, {
      animate: true,
      // @ts-ignore
      duration: getFlyToAnimationSpeed(map.getCenter(), mapCenter),
    });
  }, [mapCenter, map]); */

  useKeyPress("p", () => isMouseOver && togglePolygonMode());
  useKeyPress("c", () => isMouseOver && clearPolygon());

  return <></>;
};

export default MapEvents;
