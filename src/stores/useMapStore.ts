import produce from "immer";
import { LatLngBounds, LatLngBoundsLiteral, LatLngLiteral } from "leaflet";
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
  polygon: [],
  addPolygonPoint: (point: number[]) => {
    set(
      produce((draft) => {
        draft.polygon.push(point);
      })
    );
  },
  removePolygonPoint: (point: number[]) => {
    set(
      produce((draft) => {
        draft.polygon = draft.polygon.filter((p: number[]) => p !== point);
      })
    );
  },
  clearPolygon: () => {
    set(
      produce((draft) => {
        draft.polygon = [];
      })
    );
  },
  polygonMode: false,
  togglePolygonMode: (newState?: boolean) => {
    set(
      produce((draft) => {
        draft.polygonMode =
          newState !== undefined ? newState : !draft.polygonMode;
      })
    );
  },
  updatePolygonPoint: (index: number, newLatLng: [number, number]) =>
    set((state) => {
      const newPolygon = [...state.polygon];
      newPolygon[index] = newLatLng;
      return { polygon: newPolygon };
    }),
}));

export default useMapStore;
