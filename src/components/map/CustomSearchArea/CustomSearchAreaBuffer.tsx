import React from "react";
import { Polygon } from "react-leaflet";

import { expandPolygonByDistance } from "@/lib/geoSpatialHelpers";
import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useQueryStore from "@/stores/useQueryStore";

const PolygonBuffer = () => {
  const customSearchArea = useCustomSearchAreaStore(
    (state) => state.customSearchArea
  );
  const searchAreaBuffer = useQueryStore((state) => state.searchAreaBuffer);

  return (
    <>
      {customSearchArea.length > 2 && (
        <Polygon
          positions={expandPolygonByDistance(
            customSearchArea,
            searchAreaBuffer
          )}
          pathOptions={{ color: "purple", fillOpacity: 0.2, stroke: false }}
        />
      )}
    </>
  );
};

export default PolygonBuffer;
