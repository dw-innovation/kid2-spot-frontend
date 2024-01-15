import { create } from "zustand";

import CustomSearchAreaStoreInterface from "@/types/stores/CustomSearchAreaStore.interface";

const useCustomSearchAreaStore = create<CustomSearchAreaStoreInterface>(
  (set) => ({
    customSearchArea: [],
    setCustomSearchArea: (polygon) =>
      set({
        customSearchArea: polygon,
      }),
    clearCustomSearchArea: () => set({ customSearchArea: [] }),
    customSearchAreaOutsideBBox: false,
    toggleCustomSearchAreaOutsideBBox: (isOutside) =>
      set((state) => ({
        customSearchAreaOutsideBBox:
          isOutside || !state.customSearchAreaOutsideBBox,
      })),
  })
);

export default useCustomSearchAreaStore;
