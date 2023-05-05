import { LatLng } from "leaflet";
import React, { useCallback, useMemo } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";

const PolygonDrawer: React.FC = () => {
  const customSearchArea = useCustomSearchAreaStore(
    (state) => state.customSearchArea
  );
  const setCustomSearchArea = useCustomSearchAreaStore(
    (state) => state.setCustomSearchArea
  );
  const clearCustomSearchArea = useCustomSearchAreaStore(
    (state) => state.clearCustomSearchArea
  );

  const handleCreated = useCallback(
    (e: any) => {
      const latLngs = e.layer.getLatLngs();
      setCustomSearchArea(
        latLngs[0].map((latLng: LatLng) => [latLng.lat, latLng.lng])
      );
    },
    [setCustomSearchArea]
  );

  const handleEdited = useCallback(
    (e: any) => {
      const layers = e.layers;
      const polygons = layers.getLayers().map((layer: any) => {
        const latLngs = layer.getLatLngs()[0];
        return latLngs.map((latLng: LatLng) => [latLng.lat, latLng.lng]);
      });
      setCustomSearchArea(polygons[0]);
    },
    [setCustomSearchArea]
  );

  const handleDeleted = useCallback(() => {
    clearCustomSearchArea();
  }, [clearCustomSearchArea]);

  const drawControl = useMemo(
    () => (
      <EditControl
        position="topleft"
        onCreated={handleCreated}
        onEdited={handleEdited}
        onDeleted={handleDeleted}
        edit={{
          featureGroup: true,
          remove: customSearchArea.length > 0,
          edit: customSearchArea.length > 0,
        }}
        draw={{
          polyline: false,
          rectangle: customSearchArea.length === 0,
          circle: false,
          marker: false,
          circlemarker: false,
          polygon:
            customSearchArea.length > 0
              ? false
              : {
                  shapeOptions: { color: "purple" },
                },
        }}
      />
    ),
    [handleCreated, handleDeleted, handleEdited, customSearchArea.length]
  );

  return <FeatureGroup>{drawControl}</FeatureGroup>;
};

export default PolygonDrawer;
