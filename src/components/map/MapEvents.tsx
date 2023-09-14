import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";

const MapEvents = () => {
  const setBounds = useMapStore((state) => state.setBounds);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const bounds = useMapStore((state) => state.bounds);
  const view = useGlobalStore((state) => state.view);
  const searchArea = useImrStore((state) => state.imr.a.t);
  const setImrBBox = useImrStore((state) => state.setImrBBox);

  const map = useMap();

  const prevBoundsRef = useRef<[number, number][] | undefined>(undefined);

  const updateBounds = useCallback(() => {
    if (view !== "map") return;
    const mapBounds = map.getBounds();

    if (
      mapBounds.getSouthWest().lat === mapBounds.getNorthEast().lat ||
      mapBounds.getSouthWest().lng === mapBounds.getNorthEast().lng
    )
      return;

    setBounds([
      [mapBounds.getSouthWest().lat, mapBounds.getSouthWest().lng],
      [mapBounds.getNorthEast().lat, mapBounds.getNorthEast().lng],
    ]);
  }, [map, setBounds, view]);

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

  useEffect(() => {
    if (searchArea === "bbox") {
      try {
        setImrBBox([bounds[0][1], bounds[0][0], bounds[1][1], bounds[1][0]]);
      } catch (e) {}
    }
  }, [bounds, searchArea, setImrBBox]);

  return null;
};

export default MapEvents;
