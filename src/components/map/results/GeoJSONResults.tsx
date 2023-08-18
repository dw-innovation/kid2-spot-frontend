import * as L from "leaflet";
import React, { FC, useRef } from "react";
import { createRoot } from "react-dom/client";
import { GeoJSON, GeoJSONProps } from "react-leaflet";

import { FILL_COLORS } from "@/lib/const";
import useResultsStore from "@/stores/useResultsStore";

import Popup from "../Popup";

type GeoJSONResultsProps = Omit<GeoJSONProps, "data">;

const GeoJSONResults: FC<GeoJSONResultsProps> = (props) => {
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const sets = useResultsStore((state) => state.sets);
  const previousClickedLayer = useRef<L.CircleMarker | null>(null);

  const pointToLayer = (
    _: GeoJSON.Feature<GeoJSON.Point>,
    latlng: L.LatLng
  ) => {
    let setIndex = sets.findIndex((set) => set === _.properties?.setname);
    const markerOptions: L.CircleMarkerOptions = {
      radius: 8,
      fillColor: FILL_COLORS[setIndex],
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
    return L.circleMarker(latlng, markerOptions);
  };

  const key = geoJSON ? Date.now().toString() : "";

  const resetPreviousLayerStyle = () => {
    if (previousClickedLayer.current) {
      previousClickedLayer.current.setStyle({
        color: "#fff",
      });
    }
  };

  const onFeatureClick = (e: L.LeafletEvent) => {
    const layer = e.target as L.CircleMarker;
    resetPreviousLayerStyle();
    layer.setStyle({
      color: "#ff0000",
    });
    previousClickedLayer.current = layer;
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    if (feature.properties) {
      const popupContainer = document.createElement("div");
      const root = createRoot(popupContainer);

      layer.bindPopup(popupContainer, { maxWidth: 400 });

      layer.on("popupopen", () => {
        root.render(<Popup feature={feature} />);
      });

      layer.on("popupclose", () => {
        root.unmount();
      });
    }

    layer.on("click", onFeatureClick);
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
