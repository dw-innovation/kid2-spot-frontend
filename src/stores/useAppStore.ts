import produce from "immer";
import { create } from "zustand";

import AppStoreInterface from "./interfaces/AppStore.interface";

const useAppStore = create<AppStoreInterface>((set) => ({
    apiState: "idle",
    setApiState: (state: "idle" | "loading" | "error") => {
        set(
            produce((draft) => {
                draft.apiState = state;
            })
        );
    },
    showSuggestions: false,
    toggleShowSuggestions: (state?: boolean) => {
        set(
            produce((draft) => {
                draft.showSuggestions =
                    typeof state === "undefined"
                        ? !draft.showSuggestions
                        : state;
            })
        );
    },
}));

export default useAppStore;
