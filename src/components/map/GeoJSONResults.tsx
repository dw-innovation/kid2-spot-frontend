import * as L from "leaflet";
import React, { FC, useState } from "react";
import { GeoJSON, GeoJSONProps } from "react-leaflet";

import useMapStore from "@/stores/useMapStore";

type GeoJSONResultsProps = Omit<GeoJSONProps, "data">;

const GeoJSONResults: FC<GeoJSONResultsProps> = (props) => {
  const geoJSON = useMapStore((state) => state.geoJSON);
  const [lastClickedLayer, setLastClickedLayer] = useState<L.Layer | null>(
    null
  );

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

  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    if (feature.properties) {
      const tags = Object.keys(feature.properties).map(
        (key) =>
          `<span><strong>${key}</strong>: ${feature.properties![key]}</span>`
      );
      const popupContent = `<h3>${feature.id}</h3><br>${tags.join("<br>")}`;
      layer.bindPopup(popupContent);
    }
  };

  return (
    <>
      {geoJSON && (
        <GeoJSON
          key={key}
          {...props}
          data={geoJSON}
          pointToLayer={pointToLayer}
          onEachFeature={onEachFeature}
        />
      )}
    </>
  );
};

export default GeoJSONResults;
