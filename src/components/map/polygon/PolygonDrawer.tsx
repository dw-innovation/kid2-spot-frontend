import React, { useCallback, useEffect, useMemo } from "react";
import { Polygon, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";

import EdgeSquare from "./EdgeSquare";
import PolygonBuffer from "./PolygonBuffer";

const PolygonDrawer = () => {
  const map = useMap();

  const polygon = usePolygonStore((state) => state.polygon);
  const polygonMode = useMapStore((state) => state.polygonMode);
  const addPolygonPoint = usePolygonStore((state) => state.addPolygonPoint);

  const handleCreated = useCallback(
    (e: any) => {
      addPolygonPoint(e.layer.getLatLngs()[0]);
    },
    [addPolygonPoint]
  );

  const drawControl = useMemo(
    () => (
      <EditControl
        position="topleft"
        onCreated={handleCreated}
        draw={{
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false,
          polygon: {
            shapeOptions: { color: "purple" },
          },
        }}
      />
    ),
    [handleCreated]
  );

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
        <>
          {drawControl}
          <EdgeSquare position={polygon[0]} index={0} />
          <Polygon positions={polygon} pathOptions={{ color: "purple" }} />
          <PolygonBuffer />
        </>
      )}
    </>
  );
};

export default PolygonDrawer;
