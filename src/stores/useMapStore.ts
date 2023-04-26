import produce from "immer";
import { create } from "zustand";

import MapStoreInterface from "./interfaces/MapStore.interface";

const useMapStore = create<MapStoreInterface>((set) => ({
  bounds: [
    [52.36973, 12.87323],
    [52.680545, 13.911438],
  ],
  setBounds: (bounds: [number, number][]) => {
    set(
      produce((draft) => {
        draft.bounds = bounds;
      })
    );
  },
  mapCenter: { lat: 52.540906, lng: 13.383965 },
  mapZoom: 13,
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
  initialize: (initialData: any) => {
    set(
      produce((draft) => {
        draft.mapCenter = initialData.mapCenter;
        draft.mapZoom = initialData.mapZoom;
        draft.tilesLayer = initialData.tilesLayer;
        draft.bounds = initialData.bounds;
      })
    );
  },
}));

export default useMapStore;
