import produce from "immer";
import { create } from "zustand";

import QueryStoreInterface from "./interfaces/QueryStore.interface";

const useAppStore = create<QueryStoreInterface>((set) => ({
  overpassQuery:
    '// find all cafés that are no more than 200m from a subway entrance\n\n\n[out:json][timeout:250];\n\n(\n  nwr["railway"="subway_entrance"]({{AREA}})->.subwayentrances;\n  \n  nwr["amenity"="cafe"](around.subwayentrances:200)->.cafes;\n);\n\nout body;\n>;\nout skel qt;',
  setOverpassQuery: (overpassQuery: string) => {
    set(
      produce((draft) => {
        draft.overpassQuery = overpassQuery;
      })
    );
  },
  queryArea: "bbox",
  setQueryArea: (queryArea: "bbox" | "polygon") => {
    set(
      produce((draft) => {
        draft.queryArea = queryArea;
      })
    );
  },
}));

export default useAppStore;
