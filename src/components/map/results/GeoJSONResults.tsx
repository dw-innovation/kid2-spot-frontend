"use client";

import * as L from "leaflet";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import { GeoJSON, GeoJSONProps, useMap } from "react-leaflet";

import { FILL_COLORS } from "@/lib/const/colors";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";

import Popup from "../Popup";

type GeoJSONResultsProps = Omit<GeoJSONProps, "data">;

const GeoJSONResults: FC<GeoJSONResultsProps> = (props) => {
  const spots = useResultsStore((state) => state.spots);
  const activeSpot = useMapStore((state) => state.activeSpot);
  const geoJSON = useResultsStore((state) => state.geoJSON);
  const sets = useResultsStore((state) => state.sets);
  const previousClickedLayer = useRef<L.CircleMarker | null>(null);
  const markerLayerGroup = useRef<L.LayerGroup | null>(null);
  const map = useMap();
  const [spotNodes, setSpotNodes] = React.useState<string[]>([]);

  const stableKey = useMemo(() => {
    return Date.now().toString();
  }, [geoJSON]);

  useEffect(() => {
    if (spots && activeSpot) {
      const spot = spots.find((spot) => spot.id === activeSpot);
      if (spot) {
        setSpotNodes(spot.nodes);
      }
    }
  }, [activeSpot, spots]);

  useEffect(() => {
    map.createPane("markerPane");
    const markerPane = map.getPane("markerPane");
    if (markerPane) {
      markerPane.style.zIndex = "500";
    }
  }, [map]);

  useEffect(() => {
    if (markerLayerGroup.current) {
      markerLayerGroup.current.eachLayer((layer) => {
        if ("bringToFront" in layer) {
          (layer as L.Path).bringToFront();
        }
      });
    }
  }, [geoJSON]);

  const getSetIndex = (setName: string | undefined) => {
    return sets.findIndex((set) => set.name === setName);
  };

  const getSetColor = (setIndex: number, currentNodeId: string) => {
    if (sets[setIndex] && sets[setIndex].visible) {
      if (sets[setIndex].highlighted || spotNodes.includes(currentNodeId)) {
        return "#fc5603";
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
      radius: 8,
      fillColor: FILL_COLORS[setIndex],
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: getSetFillOpacity(setIndex),
      pane: "markerPane",
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
      color: getSetColor(setIndex, feature.properties?.osm_ids),
      weight: getWeight(setIndex, feature.properties?.osm_ids),
      opacity: 1,
      fillOpacity: getSetFillOpacity(setIndex),
    };
  };

  return geoJSON ? (
    <GeoJSON
      key={stableKey}
      {...props}
      data={geoJSON}
      pointToLayer={pointToLayer}
      style={styleFunction}
      onEachFeature={onEachFeature}
    />
  ) : null;
};

export default GeoJSONResults;
