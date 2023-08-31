"use client";

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

  const getSetIndex = (setName: string | undefined) => {
    return sets.findIndex((set) => set.name === setName);
  };

  const getColor = (setIndex: number) => {
    return sets[setIndex] && sets[setIndex].visible ? "#fff" : "transparent";
  };

  const getFillOpacity = (setIndex: number) => {
    return sets[setIndex] && sets[setIndex].visible ? 0.8 : 0;
  };

  const resetPreviousLayerStyle = () => {
    if (previousClickedLayer.current) {
      previousClickedLayer.current.setStyle({
        color: "#3388ff",
      });
    }
  };

  const pointToLayer = (
    _: GeoJSON.Feature<GeoJSON.Point>,
    latlng: L.LatLng
  ) => {
    const setIndex = getSetIndex(_.properties?.set_name);
    const markerOptions: L.CircleMarkerOptions = {
      radius: 8,
      fillColor: FILL_COLORS[setIndex],
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: getFillOpacity(setIndex),
    };
    return L.circleMarker(latlng, markerOptions);
  };

  const onFeatureClick = (e: L.LeafletEvent) => {
    const layer = e.target as L.CircleMarker;
    resetPreviousLayerStyle();
    layer.setStyle({ color: "#ff0000" });
    previousClickedLayer.current = layer;
  };

  const bindPopupToLayer = (feature: GeoJSON.Feature, layer: L.Layer) => {
    let popupContainer = document.createElement("div");
    let root = createRoot(popupContainer);

    layer.bindPopup(popupContainer, { maxWidth: 400 });

    layer.on("popupopen", () => {
      root.render(<Popup feature={feature} />);
    });
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    if (feature.properties) {
      bindPopupToLayer(feature, layer);
    }
    layer.on("click", onFeatureClick);
  };

  const styleFunction: L.StyleFunction<GeoJSON.Geometry> = (
    feature?: GeoJSON.Feature
  ) => {
    if (!feature) return {};

    const setIndex = getSetIndex(feature.properties?.set_name);
    return {
      fillColor: FILL_COLORS[setIndex],
      color: getColor(setIndex),
      weight: 1,
      opacity: 1,
      fillOpacity: getFillOpacity(setIndex),
    };
  };

  return geoJSON ? (
    <GeoJSON
      key={Date.now().toString()}
      {...props}
      data={geoJSON}
      pointToLayer={pointToLayer}
      style={styleFunction}
      onEachFeature={onEachFeature}
    />
  ) : null;
};

export default GeoJSONResults;
