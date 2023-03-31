import produce from "immer";
import { create } from "zustand";

import StreetViewStoreInterface from "./interfaces/StreetViewStore.interface";

const useAppStore = create<StreetViewStoreInterface>((set) => ({
  showStreetView: false,
  toggleStreetView: (newState?: boolean) => {
    set(
      produce((draft) => {
        draft.showStreetView = newState ?? !draft.showStreetView;
      })
    );
  },
  streetViewProvider: "google",
}));

export default useAppStore;
