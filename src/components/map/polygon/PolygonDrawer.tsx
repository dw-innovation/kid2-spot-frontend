import { LatLng } from "leaflet";
import React, { useCallback, useMemo } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import usePolygonStore from "@/stores/usePolygonStore";

const PolygonDrawer: React.FC = () => {
  const polygon = usePolygonStore((state) => state.polygon);
  const setPolygon = usePolygonStore((state) => state.setPolygon);
  const clearPolygon = usePolygonStore((state) => state.clearPolygon);

  const handleCreated = useCallback(
    (e: any) => {
      const latLngs = e.layer.getLatLngs();
      setPolygon(latLngs[0].map((latLng: LatLng) => [latLng.lat, latLng.lng]));
    },
    [setPolygon]
  );

  const handleEdited = useCallback(
    (e: any) => {
      const layers = e.layers;
      const polygons = layers.getLayers().map((layer: any) => {
        const latLngs = layer.getLatLngs()[0];
        return latLngs.map((latLng: LatLng) => [latLng.lat, latLng.lng]);
      });
      setPolygon(polygons[0]);
    },
    [setPolygon]
  );

  const handleDeleted = useCallback(
    (e: any) => {
      clearPolygon();
    },
    [clearPolygon]
  );

  const drawControl = useMemo(
    () => (
      <EditControl
        position="topleft"
        onCreated={handleCreated}
        onEdited={handleEdited}
        onDeleted={handleDeleted}
        draw={{
          polyline: false,
          rectangle: polygon.length === 0,
          circle: false,
          marker: false,
          circlemarker: false,
          polygon:
            polygon.length > 0
              ? false
              : {
                  shapeOptions: { color: "purple" },
                },
        }}
      />
    ),
    [handleCreated, handleEdited, polygon.length]
  );

  return <FeatureGroup>{drawControl}</FeatureGroup>;
};

export default PolygonDrawer;
