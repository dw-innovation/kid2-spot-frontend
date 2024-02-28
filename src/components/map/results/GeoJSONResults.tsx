"use client";

import * as L from "leaflet";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import { GeoJSON, GeoJSONProps, Pane } from "react-leaflet";

import { trackAction } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Popup from "../Popup";

type GeoJSONResultsProps = Omit<GeoJSONProps, "data">;

const GeoJSONResults: FC<GeoJSONResultsProps> = (props) => {
  const spots = useResultsStore((state) => state.spots);
  const activeSpot = useMapStore((state) => state.activeSpot);
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const sets = useResultsStore((state) => state.sets);
  const previousClickedLayer = useRef<L.CircleMarker | null>(null);
  const setStreetViewCoordinates = useStreetViewStore(
    (state) => state.setStreetViewCoordinates
  );
  const [spotNodes, setSpotNodes] = React.useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableKey = useMemo(() => Date.now().toString(), [geoJSON]);

  useEffect(() => {
    if (spots && activeSpot) {
      const spot = spots.find((spot) => spot.id === activeSpot);
      if (spot) {
        setSpotNodes(spot.nodes);
      }
    }
  }, [activeSpot, spots]);

  const getSetIndex = (setName: string | undefined) => {
    return sets.findIndex((set) => set.name === setName);
  };

  const getSetColor = (setIndex: number, currentNodeId: string) => {
    if (sets[setIndex] && sets[setIndex].visible) {
      if (sets[setIndex].highlighted || spotNodes.includes(currentNodeId)) {
        return "#C0392B";
      } else {
        return "#fff";
      }
    } else {
      return "transparent";
    }
  };

  const getSetFillOpacity = (setIndex: number) => {
    return sets[setIndex] && sets[setIndex].visible ? 0.8 : 0;
  };

  const getWeight = (setIndex: number, currentNodeId: string) => {
    return (sets[setIndex] && sets[setIndex].highlighted) ||
      spotNodes.includes(currentNodeId)
      ? 2.5
      : 1;
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
      radius: 12,
      fillColor: sets[setIndex].fillColor,
      color: "#fff",
      weight: 5,
      opacity: 1,
      fillOpacity: getSetFillOpacity(setIndex),
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
    const paneName =
      feature?.geometry?.type === "Point" ? "circleMarkers" : "polygons";

    return {
      fillColor: sets[setIndex].fillColor,
      color: getSetColor(setIndex, feature.properties?.osm_ids),
      weight: getWeight(setIndex, feature.properties?.osm_ids),
      opacity: 1,
      fillOpacity: getSetFillOpacity(setIndex),
      pane: paneName,
    };
  };

  return (
    <>
      <Pane name="circleMarkers" style={{ zIndex: 500 }} />
      <Pane name="polygons" style={{ zIndex: 400 }} />

      {geoJSON ? (
        <GeoJSON
          key={stableKey}
          {...props}
          data={geoJSON}
          pointToLayer={pointToLayer}
          style={styleFunction}
          onEachFeature={onEachFeature}
        />
      ) : null}
    </>
  );
};

export default GeoJSONResults;
