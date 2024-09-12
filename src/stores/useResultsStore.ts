import { create } from "zustand";

import ResultsStoreInterface, {
  Spot,
} from "@/types/stores/ResultsStore.interface";

const useResultsStore = create<ResultsStoreInterface>((set) => ({
  geoJSON: null,
  setGeoJSON: (geoJSON) => set({ geoJSON }),
  clearGeoJSON: () => set({ geoJSON: null, sets: [], spots: [] }),
  sets: [],
  setSets: (sets) => set({ sets }),
  toggleVisible: (id) =>
    set((state) => ({
      sets: state.sets.map((set) =>
        set.id === id ? { ...set, visible: !set.visible } : set
      ),
    })),
  clearSets: () => set({ sets: [] }),
  toggleHighlighted: (id, isHighlighted) =>
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
  setSearchArea: (searchArea) => set({ searchArea }),
  showSearchArea: true,
  toggleSearchArea: (show) =>
    set((state) => ({ showSearchArea: show ? show : !state.showSearchArea })),
  highlightSearchArea: false,
  toggleHighlightSearchArea: (highlight) =>
    set((state) => ({
      highlightSearchArea: highlight ? highlight : !state.highlightSearchArea,
    })),
}));

export default useResultsStore;
