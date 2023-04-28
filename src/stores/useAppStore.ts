import produce from "immer";
import { create } from "zustand";

import AppStoreInterface from "./interfaces/AppStore.interface";

const useAppStore = create<AppStoreInterface>((set) => ({
  view: "map",
  setView: (view: "map" | "data") => {
    set(
      produce((draft) => {
        draft.view = view;
      })
    );
  },
  initialize: (initialData: {
    showSuggestions: boolean;
    view: "map" | "data";
  }) => {
    set(
      produce((draft) => {
        draft.showSuggestions = initialData.showSuggestions;
        draft.view = initialData.view;
      })
    );
  },
  isStreetViewFullscreen: false,
  toggleStreetViewFullscreen: (state?: boolean) => {
    set(
      produce((draft) => {
        draft.isStreetViewFullscreen =
          typeof state === "undefined" ? !draft.isStreetViewFullscreen : state;
      })
    );
  },
}));

export default useAppStore;
