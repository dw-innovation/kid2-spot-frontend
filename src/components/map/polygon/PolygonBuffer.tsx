import React from "react";
import { Polygon } from "react-leaflet";

import { expandPolygonByDistance } from "@/lib/geoSpatialHelpers";
import usePolygonStore from "@/stores/usePolygonStore";
import useQueryStore from "@/stores/useQueryStore";

const PolygonBuffer = () => {
  const polygon = usePolygonStore((state) => state.polygon);
  const areaBuffer = useQueryStore((state) => state.areaBuffer);

  return (
    <>
      {polygon.length > 2 && (
        <Polygon
          positions={expandPolygonByDistance(polygon, areaBuffer)}
          pathOptions={{ color: "purple", fillOpacity: 0.2, stroke: false }}
        />
      )}
    </>
  );
};

export default PolygonBuffer;
