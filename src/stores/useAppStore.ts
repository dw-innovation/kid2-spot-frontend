import produce from "immer";
import { create } from "zustand";

import AppStoreInterface from "./interfaces/AppStore.interface";

const useAppStore = create<AppStoreInterface>((set) => ({
  showSuggestions: false,
  toggleShowSuggestions: (state?: boolean) => {
    set(
      produce((draft) => {
        draft.showSuggestions =
          typeof state === "undefined" ? !draft.showSuggestions : state;
      })
    );
  },
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
}));

export default useAppStore;
