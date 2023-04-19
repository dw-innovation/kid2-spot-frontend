import produce from "immer";
import { create } from "zustand";

import QueryStoreInterface from "./interfaces/QueryStore.interface";

const useAppStore = create<QueryStoreInterface>((set) => ({
  overpassQuery:
    '// find all cafés that are no more than 200m from a subway entrance\n\n[out:json][timeout:250];\n\narea[name="Berlin"]->.berlin;\n(\n    nwr(area.berlin)["railway"="subway_entrance"]->.subway_entrances;\n    nwr(around.subway_entrances:200)["amenity"="cafe"]->.cafes;\n);\n\n.cafes out body;',
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
  areaBuffer: 500,
  setAreaBuffer: (areaBuffer: number) => {
    set(
      produce((draft) => {
        draft.areaBuffer = areaBuffer;
      })
    );
  },
  overpassAPIURL: "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  setOverpassAPIURL: (overpassAPIURL: string) => {
    set(
      produce((draft) => {
        draft.overpassAPIURL = overpassAPIURL;
      })
    );
  },
}));

export default useAppStore;
