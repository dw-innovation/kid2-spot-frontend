import produce from "immer";
import { create } from "zustand";

interface SessionStore {
  bbox: number[];
  setBbox: (bbox: number[]) => void;
  results: any[];
  setResults: (results: any[]) => void;
  overpassQuery: string;
  setOverpassQuery: (overpassQuery: string) => void;
  apiLoading: boolean;
  setApiLoading: (apiLoading: boolean) => void;
  mapCenter: number[];
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
  results: [],
  setResults: (results: any[]) => {
    set(
      produce((draft) => {
        draft.results = results;
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
  apiLoading: false,
  setApiLoading: (apiLoading: boolean) => {
    set(
      produce((draft) => {
        draft.apiLoading = apiLoading;
      })
    );
  },
  mapCenter: [52.541389, 13.388171],
}));

export default useSessionStore;
