import { create } from "zustand";

import MapStoreInterface from "@/types/stores/MapStore.interface";

const useMapStore = create<MapStoreInterface>((set) => ({
  bounds: [
    [50.896537040473284, 6.847057342529298],
    [50.97021104712801, 7.103862762451173],
  ],
  setBounds: (bounds) => set({ bounds }),
  mapCenter: { lat: 52.540906, lng: 13.383965 },
  mapZoom: 13,
  setMapZoom: (mapZoom) => set({ mapZoom }),
  tilesLayer: "osm",
  setTilesLayer: (newLayer: "vector" | "satellite" | "osm") =>
    set({ tilesLayer: newLayer }),
  initialize: (initialData) =>
    set({
      mapCenter: initialData.mapCenter,
      mapZoom: initialData.mapZoom,
      tilesLayer: initialData.tilesLayer,
      bounds: initialData.bounds,
    }),
  activeSpot: undefined,
  setActiveSpot: (activeSpot) => set({ activeSpot }),
}));

export default useMapStore;
