import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import useAppStore from "@/stores/useAppStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

const MapEvents = () => {
  const setBounds = useMapStore((state) => state.setBounds);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const bounds = useMapStore((state) => state.bounds);
  const view = useAppStore((state) => state.view);
  const searchArea = useQueryStore((state) => state.searchArea);
  const setImrValue = useQueryStore((state) => state.setImrValue);
  const imr = useQueryStore((state) => state.imr);

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
        console.log("here");
        setImrValue("a.v", bounds);
      } catch (e) {
        console.error("FEHLER");
      }
    }
  }, [bounds]);

  useEffect(() => {
    console.log(imr);
  }, [imr]);

  return null;
};

export default MapEvents;
