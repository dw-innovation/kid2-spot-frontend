import produce from "immer";
import { LatLngLiteral } from "leaflet";
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
  mapCenter: LatLngLiteral | undefined;
  setMapCenter: (mapCenter: LatLngLiteral | undefined) => void;
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
    '// find all cafés that are no more than 200m from a subway entrance\n\n[out:json][timeout:25];\n  (node["amenity"="cafe"]({{bbox}});)->.cafes;\n\n  (node["railway"="subway_entrance"]({{bbox}});\n  way["railway"="subway_entrance"]({{bbox}});)->.subwayentrances;\n  nwr.cafes(around.subwayentrances:200);\nout body;\n>;\nout skel qt;',
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
  mapCenter: { lat: 52.540906, lng: 13.383965 },
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
  setMapCenter: (mapCenter: LatLngLiteral | undefined) => {
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
