import { bbox } from "@turf/turf";
import React from "react";

import useMapStore from "@/stores/useMapStore";
import usePolygonStore from "@/stores/usePolygonStore";

const PolygonOutsideHandler = () => {
  const polygonOutsideBBox = usePolygonStore(
    (state) => state.polygonOutsideBBox
  );
  const polygon = usePolygonStore((state) => state.polygon);
  const setBounds = useMapStore((state) => state.setBounds);

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

  return (
    <>
      {polygonOutsideBBox && (
        <span className="flex items-center justify-center gap-2 px-2 py-1 mr-2 text-black bg-orange-400 rounded-lg">
          Polygon outside bounding box!
          <button
            onClick={handleFlyToBounds}
            className="p-1 bg-white rounded-lg hover:bg-slate-200"
          >
            fly to polygon
          </button>
        </span>
      )}
    </>
  );
};

export default PolygonOutsideHandler;
