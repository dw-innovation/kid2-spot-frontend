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
  setMapCenter: (mapCenter: LatLngExpression | undefined) => void;
  tilesServer: "osm" | "vector";
  toggleTilesServer: () => void;
  searchAddress: string;
  setSearchAddress: (searchAddress: string) => void;
  currentAddress: Object;
  setCurrentAddress: (currentAddress: Object) => void;
  addressSuggestions: any[];
  setAddressSuggestions: (addressSuggestions: any[]) => void;
  showSuggestions: boolean;
  toggleShowSuggestions: (state?: boolean) => void;
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
  mapCenter: [52.540906, 13.383965],
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
  searchAddress: "",
  setSearchAddress: (searchAddress: string) => {
    set(
      produce((draft) => {
        draft.searchAddress = searchAddress;
      })
    );
  },
  addressSuggestions: [],
  setAddressSuggestions: (addressSuggestions: any[]) => {
    set(
      produce((draft) => {
        draft.addressSuggestions = addressSuggestions;
      })
    );
  },
  currentAddress: {},
  setCurrentAddress: (currentAddress: Object) => {
    set(
      produce((draft) => {
        draft.currentAddress = currentAddress;
      })
    );
  },
  setMapCenter: (mapCenter: LatLngExpression | undefined) => {
    set(
      produce((draft) => {
        draft.mapCenter = mapCenter;
      })
    );
  },
  showSuggestions: false,
  toggleShowSuggestions: (state?: boolean) => {
    set(
      produce((draft) => {
        draft.showSuggestions =
          typeof state === "undefined" ? !draft.showSuggestions : state;
      })
    );
  },
}));

export default useSessionStore;
