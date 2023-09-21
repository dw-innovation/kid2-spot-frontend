import { FeatureCollection } from "geojson";
import produce from "immer";
import { create } from "zustand";

import ResultsStoreInterface, {
  Spot,
} from "../types/stores/ResultsStore.interface";

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
      fillColor: string;
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
  toggleHighlighted: (id: string, state?: boolean) => {
    set(
      produce((draft) => {
        const set = draft.sets.find((set: { id: string }) => set.id === id);
        if (set) {
          set.highlighted = state ? state : !set.highlighted;
        }
      })
    );
  },
  spots: [],
  setSpots: (spots: Spot[]) => {
    set(
      produce((draft) => {
        draft.spots = spots;
      })
    );
  },
  clearSpots: () => {
    set(
      produce((draft) => {
        draft.spots = [];
      })
    );
  },
  searchArea: null,
  setSearchArea: (searchArea: FeatureCollection) => {
    set(
      produce((draft) => {
        draft.searchArea = searchArea;
      })
    );
  },
}));

export default useResultsStore;
