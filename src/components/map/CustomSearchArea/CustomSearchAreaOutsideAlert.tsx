import { BBox, bbox } from "@turf/turf";
import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";

import PlusIcon from "@/assets/icons/PlusIcon";
import { isPolygonWithinBoundingBox } from "@/lib/geoSpatialHelpers";
import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useMapStore from "@/stores/useMapStore";

const PolygonOutsideAlert = () => {
  const customSearchArea = useCustomSearchAreaStore(
    (state) => state.customSearchArea
  );
  const setBounds = useMapStore((state) => state.setBounds);
  const map = useMap();
  const alertRef = useRef<HTMLDivElement>(null);

  const [showAlert, setShowAlert] = useState(false);

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

  const handleCloseClick = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div
          ref={alertRef}
          className="relative flex items-center justify-center gap-2 px-2 py-1 mr-2 text-black bg-orange-200 rounded-lg shadow-lg cursor-default  w-fit"
        >
          Your search area is outside the current view.
          <button
            onClick={handleFlyToBounds}
            className="p-1 bg-white rounded-lg hover:bg-slate-200"
          >
            fly to search area
          </button>
          <button
            className="absolute top-0 right-0 rotate-45 bg-white rounded-full translate-x-1/3 -translate-y-1/3 hover:bg-slate-200"
            onClick={handleCloseClick}
          >
            <PlusIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default PolygonOutsideAlert;
