import { bbox } from "@turf/turf";
import React, { useEffect, useState } from "react";

import PlusIcon from "@/assets/icons/PlusIcon";
import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";

const PolygonOutsideAlert = () => {
  const polygonOutsideBBox = usePolygonStore(
    (state) => state.polygonOutsideBBox
  );
  const polygon = usePolygonStore((state) => state.polygon);
  const setBounds = useMapStore((state) => state.setBounds);

  const [showAlert, setShowAlert] = useState(false);

  const handleFlyToBounds = () => {
    let newBBox = bbox({
      type: "Polygon",
      coordinates: [polygon],
    });
    setBounds([
      [newBBox[0], newBBox[1]],
      [newBBox[2], newBBox[3]],
    ]);
  };

  useEffect(() => {
    setShowAlert(polygonOutsideBBox);
  }, [polygonOutsideBBox]);

  const handleCloseClick = () => {
    setShowAlert(false);
  };

  return (
    <>
      {polygonOutsideBBox && showAlert && (
        <span className="relative flex items-center justify-center gap-2 px-2 py-1 mr-2 text-black bg-orange-400 rounded-lg shadow-lg">
          Polygon outside bounding box!
          <button
            onClick={handleFlyToBounds}
            className="p-1 bg-white rounded-lg hover:bg-slate-200"
          >
            fly to polygon
          </button>
          <button
            className="absolute top-0 right-0 rotate-45 bg-white rounded-full translate-x-1/3 -translate-y-1/3 hover:bg-slate-200"
            onClick={handleCloseClick}
          >
            <PlusIcon />
          </button>
        </span>
      )}
    </>
  );
};

export default PolygonOutsideAlert;
