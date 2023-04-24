import { FeatureCollection } from "geojson";
import produce from "immer";
import { LatLngBoundsLiteral } from "leaflet";
import { create } from "zustand";

import MapStoreInterface from "./interfaces/MapStore.interface";

const useMapStore = create<MapStoreInterface>((set) => ({
  bounds: [
    [52.33827102775772, 13.088344819843767],
    [52.67550876677678, 13.761160857975483],
  ],
  setBounds: (bounds: [number, number][]) => {
    set(
      produce((draft) => {
        draft.bounds = bounds;
      })
    );
  },
  bbox: [
    [0, 0],
    [0, 0],
  ],
  setBbox: (bbox: LatLngBoundsLiteral) => {
    set(
      produce((draft) => {
        draft.bbox = bbox;
      })
    );
  },
  geoJSON: null,
  setGeoJSON: (geoJSON: FeatureCollection) => {
    set(
      produce((draft) => {
        draft.geoJSON = geoJSON;
      })
    );
  },
  clearGeoJSON: () => {
    set(
      produce((draft) => {
        draft.geoJSON = null;
      })
    );
  },
  mapCenter: { lat: 52.540906, lng: 13.383965 },
  mapZoom: 15,
  setMapZoom: (mapZoom: number) => {
    set(
      produce((draft) => {
        draft.mapZoom = mapZoom;
      })
    );
  },
  tilesLayer: "mapTilerVector",
  setTilesLayer: (newLayer: "mapTilerVector" | "mapTilerHybrid" | "osm") => {
    set(
      produce((draft) => {
        draft.tilesLayer = newLayer;
      })
    );
  },
}));

export default useMapStore;
