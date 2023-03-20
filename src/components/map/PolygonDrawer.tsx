import React, { useCallback, useEffect } from "react";
import { Polygon, useMap } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

type Props = {};

const PolygonDrawer = (props: Props) => {
  const map = useMap();

  const polygon = useMapStore((state) => state.polygon);
  const polygonMode = useMapStore((state) => state.polygonMode);
  const addPolygonPoint = useMapStore((state) => state.addPolygonPoint);

  const handleMapClick = useCallback(
    (e: any) => {
      if (polygonMode) addPolygonPoint([e.latlng.lat, e.latlng.lng]);
    },
    [addPolygonPoint, polygonMode]
  );

  useEffect(() => {
    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, handleMapClick]);

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

  return (
    <>
      {polygon.length > 0 && (
        <Polygon positions={polygon} pathOptions={{ color: "purple" }} />
      )}
    </>
  );
};

export default PolygonDrawer;
