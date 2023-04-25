import * as L from "leaflet";
import React, { FC, useEffect } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { GeoJSON, GeoJSONProps } from "react-leaflet";

import useResultsStore from "@/stores/useResultsStore";

import Popup from "../Popup";

type GeoJSONResultsProps = Omit<GeoJSONProps, "data">;

const GeoJSONResults: FC<GeoJSONResultsProps> = (props) => {
  useEffect(() => {
    console.log("GeoJSONResults");
  }, []);
  const geoJSON = useResultsStore((state) => state.geoJSON);

  const pointToLayer = (
    _: GeoJSON.Feature<GeoJSON.Point>,
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
      const popupContainer = document.createElement("div");
      layer.bindPopup(popupContainer);

      layer.on("popupopen", () => {
        render(<Popup feature={feature} />, popupContainer);
      });

      layer.on("popupclose", () => {
        unmountComponentAtNode(popupContainer);
      });
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
