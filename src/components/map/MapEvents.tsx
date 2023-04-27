import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";

const MapEvents = () => {
  const setBounds = useMapStore((state) => state.setBounds);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const bounds = useMapStore((state) => state.bounds);
  const view = useAppStore((state) => state.view);

  const map = useMap();

  const prevBoundsRef = useRef<[number, number][] | undefined>(undefined);

  const updateBounds = useCallback(() => {
    const bounds = map.getBounds();

    if (
      bounds.getSouthWest().lat === bounds.getNorthEast().lat ||
      bounds.getSouthWest().lng === bounds.getNorthEast().lng
    )
      return;

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
    if (
      JSON.stringify(prevBoundsRef.current) !== JSON.stringify(bounds) &&
      view === "map"
    ) {
      prevBoundsRef.current = bounds;
      map.flyToBounds(bounds);
    }
  }, [bounds, map, view]);

  return null;
};

export default MapEvents;
