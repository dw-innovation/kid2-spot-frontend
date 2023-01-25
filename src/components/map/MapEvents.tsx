import { transformBbox } from "@/lib/utils";
import { use, useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";
import useSessionStore from "src/stores/useSessionStore";

const MapEvents = () => {
  const setBbox = useSessionStore((state) => state.setBbox);
  const setMapZoom = useSessionStore((state) => state.setMapZoom);

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

  return <></>;
};
export default MapEvents;
