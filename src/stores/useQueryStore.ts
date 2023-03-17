import produce from "immer";
import { create } from "zustand";

import QueryStoreInterface from "./interfaces/QueryStore.interface";

const useAppStore = create<QueryStoreInterface>((set) => ({
  overpassQuery:
    '// find all cafés that are no more than 200m from a subway entrance\n\n[out:json][timeout:25];\n  (node["amenity"="cafe"]({{bbox}});)->.cafes;\n\n  (node["railway"="subway_entrance"]({{bbox}});\n  way["railway"="subway_entrance"]({{bbox}});)->.subwayentrances;\n  nwr.cafes(around.subwayentrances:200);\nout body;\n>;\nout skel qt;',
  setOverpassQuery: (overpassQuery: string) => {
    set(
      produce((draft) => {
        draft.overpassQuery = overpassQuery;
      })
    );
  },
}));

export default useAppStore;