import { useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";

import { getFlyToAnimationSpeed, transformBbox } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";

const MapEvents = () => {
  const setBbox = useMapStore((state) => state.setBbox);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const mapCenter = useMapStore((state) => state.mapCenter);

  const map = useMap();

  const updateBbox = useCallback(() => {
    // @ts-ignore
    setBbox(transformBbox(map.getBounds()));
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
