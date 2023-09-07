import { FeatureCollection } from "geojson";
import produce from "immer";
import { create } from "zustand";

import ResultsStoreInterface from "./interfaces/ResultsStore.interface";

const useResultsStore = create<ResultsStoreInterface>((set) => ({
  geoJSON: null,
  setGeoJSON: (geoJSON: FeatureCollection) => {
    set(
      produce((draft) => {
        draft.geoJSON = geoJSON;
      })
    );
  },
  clearGeoJSON: () => {
    set(
      produce((draft) => {
        draft.geoJSON = null;
        draft.sets = [];
      })
    );
  },
  sets: [],
  setSets: (
    sets: {
      id: string;
      name: string;
      visible: boolean;
      highlighted: boolean;
    }[]
  ) => {
    set(
      produce((draft) => {
        draft.sets = sets;
      })
    );
  },
  toggleVisible: (id: string) => {
    set(
      produce((draft) => {
        const set = draft.sets.find((set: { id: string }) => set.id === id);
        if (set) {
          set.visible = !set.visible;
        }
      })
    );
  },
  clearSets: () => {
    set(
      produce((draft) => {
        draft.sets = [];
      })
    );
  },
  toggleHighlighted: (id: string) => {
    set(
      produce((draft) => {
        const set = draft.sets.find((set: { id: string }) => set.id === id);
        if (set) {
          set.highlighted = !set.highlighted;
        }
      })
    );
  },
}));

export default useResultsStore;
