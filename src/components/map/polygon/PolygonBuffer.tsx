import React from "react";
import { Polygon } from "react-leaflet";

import { enlargePolygon } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";

const PolygonBuffer = () => {
  const polygon = useMapStore((state) => state.polygon);
  const areaBuffer = useQueryStore((state) => state.areaBuffer);

  return (
    <>
      {polygon.length > 2 && (
        <Polygon
          positions={enlargePolygon(polygon, areaBuffer)}
          pathOptions={{ color: "purple", fillOpacity: 0.2, stroke: false }}
        />
      )}
    </>
  );
};

export default PolygonBuffer;
