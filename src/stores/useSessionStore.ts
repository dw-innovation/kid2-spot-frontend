import produce from "immer";
import { create } from "zustand";

interface SessionStore {
  bbox: number[];
  setBbox: (bbox: number[]) => void;
  results: any[];
  setResults: (results: any[]) => void;
  overpassQuery: string;
  serOverpassQuery: (overpassQuery: string) => void;
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
  overpassQuery: "",
  serOverpassQuery: (overpassQuery: string) => {
    set(
      produce((draft) => {
        draft.overpassQuery = overpassQuery;
      })
    );
  },
}));

export default useSessionStore;
