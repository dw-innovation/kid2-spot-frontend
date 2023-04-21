import * as L from "leaflet";
import React, { FC } from "react";
import { GeoJSON, GeoJSONProps } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

type GeoJSONResultsProps = Omit<GeoJSONProps, "data">;

const GeoJSONResults: FC<GeoJSONResultsProps> = (props) => {
  const geoJSON = useMapStore((state) => state.geoJSON);

  const pointToLayer = (
    feature: GeoJSON.Feature<GeoJSON.Point>,
    latlng: L.LatLng
  ) => {
    const markerOptions: L.CircleMarkerOptions = {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
    return L.circleMarker(latlng, markerOptions);
  };

  const key = geoJSON ? Date.now().toString() : "";

  return (
    <>
      {geoJSON && (
        <GeoJSON
          key={key}
          {...props}
          data={geoJSON}
          pointToLayer={pointToLayer}
        />
      )}
    </>
  );
};

export default GeoJSONResults;
