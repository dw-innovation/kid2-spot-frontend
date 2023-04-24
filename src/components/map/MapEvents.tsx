import { useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";

import { checkPolygonBBoxIntersection } from "@/lib/geoSpatialHelpers";
import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";

const MapEvents = () => {
  const setBbox = useMapStore((state) => state.setBbox);
  const setMapZoom = useMapStore((state) => state.setMapZoom);
  const bounds = useMapStore((state) => state.bounds);
  const togglePolygonOutsideBBox = usePolygonStore(
    (state) => state.togglePolygonOutsideBBox
  );

  const map = useMap();

  const updateBbox = useCallback(() => {
    const bounds = map.getBounds();

    setBbox([
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
    ]);

    togglePolygonOutsideBBox(
      checkPolygonBBoxIntersection([
        [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
        [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
      ])
    );
  }, [map, setBbox, togglePolygonOutsideBBox]);

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
