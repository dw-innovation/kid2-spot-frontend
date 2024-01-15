import { create } from "zustand";

import QueryStoreInterface from "@/types/stores/QueryStore.interface";

const useQueryStore = create<QueryStoreInterface>((set) => ({
  searchArea: "bbox",
  setSearchArea: (searchArea: "bbox" | "polygon") => set({ searchArea }),
  searchAreaBuffer: 500,
  setSearchAreaBuffer: (searchAreaBuffer: number) => set({ searchAreaBuffer }),
  initialize: (initialData: any) =>
    set({
      searchArea: initialData.searchArea,
      searchAreaBuffer: initialData.searchAreaBuffer,
    }),
}));

export default useQueryStore;
