"use client";

import { FeatureCollection } from "geojson";
import * as L from "leaflet";
import { pipe } from "lodash/fp";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { GeoJSON, GeoJSONProps, Pane } from "react-leaflet";

import { deflateGeoJSON } from "@/lib/geoSpatialHelpers";
import useMapZoom from "@/lib/hooks/useMapZoom";
import {
  onEachFeature,
  pointToLayer,
  styleFunction,
} from "@/lib/mapStyleUtils";
import useMapStore from "@/stores/useMapStore";
import useResultsStore from "@/stores/useResultsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

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
      setDeflatedFeatures(
        pipe(
          () => deflateGeoJSON(geoJSON, mapZoom),
          (data) => {
            // Get an array of all visible set names
            const visibleSetNames = sets
              .filter((set) => set.visible)
              .map((set) => set.name);

            // Filter the features based on whether their set name is in the visibleSetNames array
            const filteredFeatures = data.features.filter((feature) => {
              const setName = feature.properties && feature.properties.set_name;
              return visibleSetNames.includes(setName);
            });

            // Return the modified data with filtered features
            return { ...data, features: filteredFeatures };
          }
        )
      );
    }
  }, [geoJSON, mapZoom, sets]);

  useEffect(() => {
    if (spots && activeSpot) {
      const spot = spots.find((spot) => spot.id === activeSpot);
      if (spot) {
        setSpotNodes(spot.nodes);
      }
    }
  }, [activeSpot, spots]);

  return (
    <>
      <Pane name="points" style={{ zIndex: 500 }} />
      <Pane name="polygons" style={{ zIndex: 400 }} />
      <Pane name="lineStrings" style={{ zIndex: 400 }} />

      {deflatedFeatures ? (
        <GeoJSON
          key={stableKey}
          {...props}
          data={deflatedFeatures}
          pointToLayer={(point, latLng) => pointToLayer(point, latLng, sets)}
          style={(feature) => styleFunction(sets, spotNodes, feature)}
          onEachFeature={(feature, layer) =>
            onEachFeature(
              feature,
              layer,
              setStreetViewCoordinates,
              previousClickedLayer
            )
          }
        />
      ) : null}
    </>
  );
};

export default GeoJSONResults;
