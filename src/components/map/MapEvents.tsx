import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

const MapEvents = () => {
  const setBounds = useMapStore((state) => state.setBounds);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const bounds = useMapStore((state) => state.bounds);

  const map = useMap();

  const prevBoundsRef = useRef<[number, number][] | undefined>(undefined);

  useEffect(() => {
    prevBoundsRef.current = bounds;
  }, [bounds]);

  const updateBounds = useCallback(() => {
    const bounds = map.getBounds();

    setBounds([
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
    ]);
  }, [map, setBounds]);

  const updateZoom = useCallback(() => {
    setMapZoom(map.getZoom());
  }, [map, setMapZoom]);

  useEffect(() => {
    updateZoom();
    updateBounds();
    map.on("moveend", () => updateBounds());
    map.on("zoomlevelschange", () => updateZoom());

    return () => {
      map.off("moveend", () => updateBounds());
      map.off("zoomlevelschange", () => updateZoom());
    };
  }, [map, setBounds, updateBounds, updateZoom]);

  useEffect(() => {
    if (JSON.stringify(prevBoundsRef.current) !== JSON.stringify(bounds)) {
      map.flyToBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

export default MapEvents;
