import produce from "immer";
import { create } from "zustand";

import QueryStoreInterface from "./interfaces/QueryStore.interface";

const useAppStore = create<QueryStoreInterface>((set) => ({
  jsonQuery:
    '{\n	"nodes": [{\n			"name": "bbox",\n			"type": "area"\n		},\n		{\n			"name": "kiosk",\n			"type": "object",\n			"props": ["shop=kiosk"]\n		},\n		{\n			"name": "pharmacy",\n			"type": "object",\n			"props": ["amenity=pharmacy"]\n		},\n		{\n			"name": "hospital",\n			"type": "object",\n			"props": ["amenity=hospital", "material=wooden"]\n		}\n	],\n	"relations": [{\n			"from": "0",\n			"to": "1",\n			"weight": 10\n		},\n		{\n			"from": "1",\n			"to": "2",\n			"weight": 20\n		},\n		{\n			"from": "2",\n			"to": "3",\n			"weight": 40\n		}\n	],\n	"action": "search_within"\n}',
  setJsonQuery: (jsonQuery: any) => {
    set(
      produce((draft) => {
        draft.jsonQuery = jsonQuery;
      })
    );
  },
  overpassQuery:
    '// find all cafés that are no more than 200m from a subway entrance\n\n[out:json][timeout:250];\n\nnode({{bbox}})["railway"="subway_entrance"]->.subway_entrances;\nnode(around.subway_entrances:200)["amenity"="cafe"];\n\nout geom;',
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
  initialize: (initialData: any) => {
    set(
      produce((draft) => {
        draft.jsonQuery = initialData.jsonQuery;
        draft.overpassQuery = initialData.overpassQuery;
        draft.searchArea = initialData.searchArea;
        draft.areaBuffer = initialData.areaBuffer;
        draft.overpassAPIURL = initialData.overpassAPIURL;
      })
    );
  },
}));

export default useAppStore;
