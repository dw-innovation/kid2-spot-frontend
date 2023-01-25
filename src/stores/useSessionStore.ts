import produce from "immer";
import { LatLngExpression } from "leaflet";
import { create } from "zustand";

interface SessionStore {
  bbox: number[];
  setBbox: (bbox: number[]) => void;
  mapZoom: number;
  setMapZoom: (mapZoom: number) => void;
  markers: any[];
  setMarkers: (markers: any[]) => void;
  clearMarkers: () => void;
  overpassQuery: string;
  setOverpassQuery: (overpassQuery: string) => void;
  apiState: "idle" | "loading" | "error";
  setApiState: (state: "idle" | "loading" | "error") => void;
  mapCenter: LatLngExpression | undefined;
  tilesServer: "osm" | "vector";
  toggleTilesServer: () => void;
}

const useSessionStore = create<SessionStore>((set) => ({
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
  overpassQuery:
    '[out:json][timeout:25];\n  (\n    node["amenity"="cafe"]({{bbox}});\n  );\n  out body;\n  >;\n  out skel qt;',
  setOverpassQuery: (overpassQuery: string) => {
    set(
      produce((draft) => {
        draft.overpassQuery = overpassQuery;
      })
    );
  },
  apiState: "idle",
  setApiState: (state: "idle" | "loading" | "error") => {
    set(
      produce((draft) => {
        draft.apiState = state;
      })
    );
  },
  mapCenter: [47.380219, 8.52951],
  mapZoom: 15,
  setMapZoom: (mapZoom: number) => {
    set(
      produce((draft) => {
        draft.mapZoom = mapZoom;
      })
    );
  },
  tilesServer: "osm",
  toggleTilesServer: () => {
    set(
      produce((draft) => {
        draft.tilesServer = draft.tilesServer === "osm" ? "vector" : "osm";
      })
    );
  },
}));

export default useSessionStore;
