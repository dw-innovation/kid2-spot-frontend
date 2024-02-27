import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PersistedStoreInterface } from "@/types/stores/PersistedStore.interface";

const usePersistedStore = create(
  persist<PersistedStoreInterface>(
    (set, get) => ({
      trackingEnabled: true,
      toggleTracking: (newState) => {
        set(() => ({
          trackingEnabled:
            newState === undefined ? !get().trackingEnabled : newState,
        }));
      },
    }),
    {
      name: "dw-kid2-spot-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default usePersistedStore;
