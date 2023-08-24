import { BBox, bbox } from "@turf/turf";
import L from "leaflet";
import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import { isPolygonWithinBoundingBox } from "@/lib/geoSpatialHelpers";
import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useMapStore from "@/stores/useMapStore";

import { useMapAlert } from "../../Context";
import MapAlert from "../../MapAlert";

const PolygonOutsideAlert = () => {
  const customSearchArea = useCustomSearchAreaStore(
    (state) => state.customSearchArea
  );
  const setBounds = useMapStore((state) => state.setBounds);
  const map = useMap();
  const alertRef = useRef<HTMLDivElement>(null);
  const { setShowAlert } = useMapAlert();

  useEffect(() => {
    if (!alertRef.current) return;
    L.DomEvent.disableClickPropagation(alertRef.current);
    L.DomEvent.disableScrollPropagation(alertRef.current);
  });

  const handleFlyToBounds = () => {
    let newBBox = bbox({
      type: "Polygon",
      coordinates: [customSearchArea],
    });

    setBounds([
      [newBBox[0], newBBox[1]],
      [newBBox[2], newBBox[3]],
    ]);
  };

  useEffect(() => {
    const checkBounds = () => {
      const currentMapBoundsFlat = map
        .getBounds()
        .toBBoxString()
        .split(",")
        .map(Number);

      const currentMapBoundsBBox: BBox = [
        currentMapBoundsFlat[1],
        currentMapBoundsFlat[0],
        currentMapBoundsFlat[3],
        currentMapBoundsFlat[2],
      ];

      setShowAlert(
        !isPolygonWithinBoundingBox(customSearchArea, currentMapBoundsBBox)
      );
    };

    const onMoveEnd = () => {
      checkBounds();
    };

    map.on("moveend", onMoveEnd);

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [customSearchArea, map]);

  return (
    <MapAlert
      handleAction={handleFlyToBounds}
      buttonText="Fly to Area"
      alertText="Drawn search area is outside view."
    />
  );
};

export default PolygonOutsideAlert;
