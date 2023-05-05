import produce from "immer";
import { create } from "zustand";

import CustomSearchAreaStoreInterface from "./interfaces/CustomSearchAreaStore.interface";

const useCustomSearchAreaStore = create<CustomSearchAreaStoreInterface>(
  (set) => ({
    customSearchArea: [],
    setCustomSearchArea: (polygon: [number, number][]) => {
      set(
        produce((draft) => {
          draft.customSearchArea = polygon;
        })
      );
    },
    clearCustomSearchArea: () => {
      set(
        produce((draft) => {
          draft.customSearchArea = [];
        })
      );
    },
    customSearchAreaOutsideBBox: false,
    toggleCustomSearchAreaOutsideBBox: (state?: boolean) => {
      set(
        produce((draft) => {
          draft.customSearchAreaOutsideBBox =
            typeof state === undefined
              ? !draft.customSearchAreaOutsideBBox
              : state;
        })
      );
    },
  })
);

export default useCustomSearchAreaStore;
