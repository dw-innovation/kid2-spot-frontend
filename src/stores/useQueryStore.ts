import produce from "immer";
import { create } from "zustand";

import QueryStoreInterface from "./interfaces/QueryStore.interface";

const useAppStore = create<QueryStoreInterface>((set) => ({
  overpassQuery:
    '// find all cafés that are no more than 200m from a subway entrance\n\n[out:json][timeout:250];\n(\n    node({{AREA}})["railway"="subway_entrance"]->.subway_entrances;\n    node(around.subway_entrances:200)["amenity"="cafe"]->.cafes;\n);\n\n.cafes out geom;',
  setOverpassQuery: (overpassQuery: string) => {
    set(
      produce((draft) => {
        draft.overpassQuery = overpassQuery;
      })
    );
  },
  searchArea: "bbox",
  setSearchArea: (searchArea: "bbox" | "polygon") => {
    set(
      produce((draft) => {
        draft.searchArea = searchArea;
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
