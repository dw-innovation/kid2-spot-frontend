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
  overpassQuery: '[out:json][timeout:25];\n  (\n    node["amenity"="cafe"](51.50241835525635,-0.09687066078186037,51.50758054572385,-0.08313775062561037);\n  );\n  out body;\n  >;\n  out skel qt;',
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
}));

export default useSessionStore;
