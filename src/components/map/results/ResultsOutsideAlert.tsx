import { BBox, bbox } from "@turf/turf";
import * as turf from "@turf/turf";
import { GeoJsonProperties } from "geojson";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import PlusIcon from "@/assets/icons/PlusIcon";
import { allFeaturesWithinBoundingBox } from "@/lib/geoSpatialHelpers";
import useCustomSearchAreaStore from "@/stores/useCustomSearchAreaStore";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

const ResultsOutsideAlert = () => {
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const setBounds = useMapStore((state) => state.setBounds);
  const customSearchArea = useCustomSearchAreaStore(
    (state) => state.customSearchArea
  );
  const map = useMap();

  const [showAlert, setShowAlert] = useState(false);

  const handleFlyToBounds = () => {
    let newBBox = bbox(geoJSON);

    setBounds([
      [newBBox[1], newBBox[0]],
      [newBBox[3], newBBox[2]],
    ]);
  };

  useEffect(() => {
    !geoJSON && setShowAlert(false);
  }, [geoJSON]);

  useEffect(() => {
    const checkBounds = () => {
      if (!geoJSON) {
        setShowAlert(false);
        return;
      }
      const currentMapBoundsFlat = map
        .getBounds()
        .toBBoxString()
        .split(",")
        .map(Number);

      const currentMapBoundsBBox: BBox = [
        currentMapBoundsFlat[0],
        currentMapBoundsFlat[1],
        currentMapBoundsFlat[2],
        currentMapBoundsFlat[3],
      ];

      setShowAlert(
        !allFeaturesWithinBoundingBox(
          geoJSON as turf.FeatureCollection<turf.Geometry, GeoJsonProperties>,
          currentMapBoundsBBox
        )
      );
    };

    const onMoveEnd = () => {
      checkBounds();
    };

    map.on("moveend", onMoveEnd);

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [customSearchArea, map, geoJSON]);

  const handleCloseClick = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <span className="relative flex items-center justify-center gap-2 px-2 py-1 mr-2 text-black bg-orange-400 rounded-lg shadow-lg">
          Results outside bounding box!
          <button
            onClick={handleFlyToBounds}
            className="p-1 bg-white rounded-lg hover:bg-slate-200"
          >
            fly to results
          </button>
          <button
            className="absolute top-0 right-0 rotate-45 bg-white rounded-full hover:bg-slate-200"
            onClick={handleCloseClick}
          >
            <PlusIcon />
          </button>
        </span>
      )}
    </>
  );
};

export default ResultsOutsideAlert;
