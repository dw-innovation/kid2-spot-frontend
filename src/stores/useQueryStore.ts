import produce from "immer";
import { set as lodashSet } from "lodash";
import { create } from "zustand";

import QueryStoreInterface from "./interfaces/QueryStore.interface";

const useQueryStore = create<QueryStoreInterface>((set) => ({
  naturalLanguagePrompt:
    "Find all cafés that are no more than 50m from a subway entrance.",
  setNaturalLanguagePrompt: (naturalLanguagePrompt: string) => {
    set(
      produce((draft) => {
        draft.naturalLanguagePrompt = naturalLanguagePrompt;
      })
    );
  },
  imr: '{\n  "a": {\n    "t": "area",\n    "v": "Bonn"\n  },\n  "ns": [\n    {\n      "id": 1,\n      "t": "nwr",\n      "n": "cafes",\n      "flts": [\n        {\n          "k": "amenity",\n          "v": "cafe",\n          "op": "=",\n          "n": "cafe"\n        }\n      ]\n    },\n    {\n      "id": 2,\n      "t": "nwr",\n      "n": "subwayEntrances",\n      "flts": [\n        {\n          "k": "railway",\n          "v": "subway_entrance",\n          "op": "=",\n          "n": "subwayEntrances"\n        }\n      ]\n    }\n  ],\n  "es": [\n    {\n      "src": 1,\n      "tgt": 2,\n      "t": "dist",\n      "dist": "50m"\n    }\n  ]\n}\n',
  setImr: (imr: any) => {
    set(
      produce((draft) => {
        draft.imr = imr;
      })
    );
  },
  setImrValue: (path: string, value: any) => {
    produce((draft) => {
      lodashSet(draft, path, value);
    });
  },
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
