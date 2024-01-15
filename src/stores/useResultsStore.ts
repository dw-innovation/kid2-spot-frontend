import { FeatureCollection } from "geojson";
import produce from "immer";
import { create } from "zustand";

import ResultsStoreInterface, {
  Spot,
} from "@/types/stores/ResultsStore.interface";

const useResultsStore = create<ResultsStoreInterface>((set) => ({
  geoJSON: null,
  setGeoJSON: (geoJSON: FeatureCollection) => set({ geoJSON }),
  clearGeoJSON: () => set({ geoJSON: null, sets: [] }),
  sets: [],
  setSets: (
    sets: {
      id: string;
      name: string;
      visible: boolean;
      highlighted: boolean;
      fillColor: string;
    }[]
  ) => set({ sets }),
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
  clearSets: () => set({ sets: [] }),
  toggleHighlighted: (id: string, isHighlighted?: boolean) =>
    set((state) => ({
      sets: state.sets.map((set) => ({
        ...set,
        highlighted: set.id === id && isHighlighted ? isHighlighted : false,
      })),
    })),
  spots: [],
  setSpots: (spots: Spot[]) => set({ spots }),
  clearSpots: () => set({ spots: [] }),
  searchArea: null,
  setSearchArea: (searchArea: FeatureCollection) => set({ searchArea }),
}));

export default useResultsStore;
