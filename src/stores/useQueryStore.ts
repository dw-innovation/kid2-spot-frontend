import produce from "immer";
import { create } from "zustand";

import QueryStoreInterface from "@/types/stores/QueryStore.interface";

const useQueryStore = create<QueryStoreInterface>((set) => ({
  searchArea: "bbox",
  setSearchArea: (searchArea: "bbox" | "polygon") => {
    set(
      produce((draft) => {
        draft.searchArea = searchArea;
      })
    );
  },
  searchAreaBuffer: 500,
  setSearchAreaBuffer: (searchAreaBuffer: number) => {
    set(
      produce((draft) => {
        draft.searchAreaBuffer = searchAreaBuffer;
      })
    );
  },
  initialize: (initialData: any) => {
    set(
      produce((draft) => {
        draft.imr = initialData.imr;
        draft.naturalLanguagePrompt = initialData.naturalLanguagePrompt;
        draft.searchArea = initialData.searchArea;
        draft.areaBuffer = initialData.areaBuffer;
      })
    );
  },
}));

export default useQueryStore;
