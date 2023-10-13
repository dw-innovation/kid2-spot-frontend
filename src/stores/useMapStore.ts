import produce from "immer";
import { create } from "zustand";

import MapStoreInterface from "@/types/stores/MapStore.interface";

const useMapStore = create<MapStoreInterface>((set) => ({
  bounds: [
    [50.896537040473284, 6.847057342529298],
    [50.97021104712801, 7.103862762451173],
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
  tilesLayer: "vector",
  setTilesLayer: (newLayer: "vector" | "mapTilerHybrid" | "osm") => {
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
  activeSpot: undefined,
  setActiveSpot: (activeSpot: string | undefined) => {
    set(
      produce((draft) => {
        draft.activeSpot = activeSpot;
      })
    );
  },
}));

export default useMapStore;
