import { useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";

import { getFlyToAnimationSpeed } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

const MapEvents = () => {
  const setBbox = useMapStore((state) => state.setBbox);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const mapCenter = useMapStore((state) => state.mapCenter);
  const polygonMode = useMapStore((state) => state.polygonMode);

  const map = useMap();

  const updateBbox = useCallback(() => {
    const bounds = map.getBounds();

    setBbox([
      [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
    ]);
  }, [map, setBbox]);

  const updateZoom = useCallback(() => {
    setMapZoom(map.getZoom());
  }, [map, setMapZoom]);

  const handleMapClick = useCallback(() => {
    console.log("map clicked");
  }, []);

  useEffect(() => {
    updateZoom();
    updateBbox();
    map.on("moveend", () => updateBbox());
    map.on("zoomlevelschange", () => updateZoom());
    map.on("click", () => handleMapClick());

    return () => {
      map.off("moveend", () => updateBbox());
      map.off("zoomlevelschange", () => updateZoom());
      map.off("click", () => handleMapClick());
    };
  }, [map, setBbox, updateBbox, updateZoom, handleMapClick]);

  useEffect(() => {
    if (polygonMode) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();
    } else {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      if (map.tap) map.tap.enable();
    }
  }, [polygonMode, map]);

  useEffect(() => {
    // @ts-ignore
    map.flyTo(mapCenter, undefined, {
      animate: true,
      // @ts-ignore
      duration: getFlyToAnimationSpeed(map.getCenter(), mapCenter),
    });
  }, [mapCenter, map]);

  return <></>;
};

export default MapEvents;
