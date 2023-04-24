import { useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

const MapEvents = () => {
  const setBbox = useMapStore((state) => state.setBbox);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const bounds = useMapStore((state) => state.bounds);

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

  useEffect(() => {
    updateZoom();
    updateBbox();
    map.on("moveend", () => updateBbox());
    map.on("zoomlevelschange", () => updateZoom());

    return () => {
      map.off("moveend", () => updateBbox());
      map.off("zoomlevelschange", () => updateZoom());
    };
  }, [map, setBbox, updateBbox, updateZoom]);

  useEffect(() => {
    map.flyToBounds(bounds);
  }, [bounds, map]);

  return null;
};

export default MapEvents;
