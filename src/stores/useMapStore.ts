import produce from "immer";
import { LatLngLiteral } from "leaflet";
import { create } from "zustand";

import MapStoreInterface from "./interfaces/MapStore.interface";

const useMapStore = create<MapStoreInterface>((set) => ({
  bbox: [],
  setBbox: (bbox: number[]) => {
    set(
      produce((draft) => {
        draft.bbox = bbox;
      })
    );
  },
  markers: [],
  setMarkers: (markers: any[]) => {
    set(
      produce((draft) => {
        draft.markers = markers;
      })
    );
  },
  clearMarkers: () => {
    set(
      produce((draft) => {
        draft.markers = [];
      })
    );
  },
  mapCenter: { lat: 52.540906, lng: 13.383965 },
  setMapCenter: (mapCenter: LatLngLiteral | undefined) => {
    set(
      produce((draft) => {
        draft.mapCenter = mapCenter;
      })
    );
  },
  mapZoom: 15,
  setMapZoom: (mapZoom: number) => {
    set(
      produce((draft) => {
        draft.mapZoom = mapZoom;
      })
    );
  },
  tilesServer: "vector",
  toggleTilesServer: () => {
    set(
      produce((draft) => {
        draft.tilesServer = draft.tilesServer === "osm" ? "vector" : "osm";
      })
    );
  },
}));

export default useMapStore;
