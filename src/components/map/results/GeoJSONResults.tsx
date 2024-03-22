"use client";

import { FeatureCollection } from "geojson";
import * as L from "leaflet";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { GeoJSON, GeoJSONProps, Pane } from "react-leaflet";

import { deflateGeoJSON } from "@/lib/geoSpatialHelpers";
import useMapZoom from "@/lib/hooks/useMapZoom";
import {
  getSetColor,
  getSetFillOpacity,
  getSetIndex,
  getWeight,
  resetPreviousLayerStyle,
} from "@/lib/mapStyleUtils";
import { trackAction } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Popup from "../Popup";

export type GeoJSONResultsProps = Omit<GeoJSONProps, "data">;

const GeoJSONResults: FC<GeoJSONResultsProps> = (props) => {
  const spots = useResultsStore((state) => state.spots);
  const activeSpot = useMapStore((state) => state.activeSpot);
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const [deflatedFeatures, setDeflatedFeatures] =
    useState<FeatureCollection | null>(null);
  const sets = useResultsStore((state) => state.sets);
  const previousClickedLayer = useRef<L.CircleMarker | null>(null);
  const setStreetViewCoordinates = useStreetViewStore(
    (state) => state.setStreetViewCoordinates
  );
  const [spotNodes, setSpotNodes] = React.useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableKey = useMemo(() => Date.now().toString(), [deflatedFeatures]);

  const mapZoom = useMapZoom();

  useEffect(() => {
    if (geoJSON) {
      setDeflatedFeatures(deflateGeoJSON(geoJSON, mapZoom));
    }
  }, [geoJSON, mapZoom]);

  useEffect(() => {
    if (spots && activeSpot) {
      const spot = spots.find((spot) => spot.id === activeSpot);
      if (spot) {
        setSpotNodes(spot.nodes);
      }
    }
  }, [activeSpot, spots]);

  const pointToLayer = (
    _: GeoJSON.Feature<GeoJSON.Point>,
    latlng: L.LatLng
  ) => {
    const setIndex = getSetIndex(_.properties?.set_name, sets);
    const markerOptions: L.CircleMarkerOptions = {
      radius: 12,
      fillColor: sets[setIndex].fillColor,
      color: "#fff",
      weight: 5,
      opacity: 1,
      fillOpacity: getSetFillOpacity(setIndex, sets),
    };

    return L.circleMarker(latlng, markerOptions);
  };

  const onFeatureClick = (e: L.LeafletEvent) => {
    const layer = e.target as L.CircleMarker;

    if (layer.feature && layer.feature.properties.center) {
      trackAction("click", "mapFeature", layer.feature.properties.osm_ids);
      setStreetViewCoordinates({
        lat: layer.feature.properties.center.coordinates[1],
        lng: layer.feature.properties.center.coordinates[0],
      });
    }

    resetPreviousLayerStyle(previousClickedLayer);
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

    const setIndex = getSetIndex(feature.properties?.set_name, sets);
    const paneName =
      feature?.geometry?.type === "Point" ? "circleMarkers" : "polygons";

    return {
      fillColor: sets[setIndex].fillColor,
      color: getSetColor(
        setIndex,
        feature.properties?.osm_ids,
        sets,
        spotNodes
      ),
      weight: getWeight(setIndex, feature.properties?.osm_ids, sets, spotNodes),
      opacity: 1,
      fillOpacity: getSetFillOpacity(setIndex, sets),
      pane: paneName,
    };
  };

  return (
    <>
      <Pane name="circleMarkers" style={{ zIndex: 500 }} />
      <Pane name="polygons" style={{ zIndex: 400 }} />

      {deflatedFeatures ? (
        <GeoJSON
          key={stableKey}
          {...props}
          data={deflatedFeatures}
          pointToLayer={pointToLayer}
          style={styleFunction}
          onEachFeature={onEachFeature}
        />
      ) : null}
    </>
  );
};

export default GeoJSONResults;
