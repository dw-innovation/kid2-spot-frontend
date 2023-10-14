import produce from "immer";
import shortUUID from "short-uuid";
import { create } from "zustand";

import {
  Edge,
  Filter,
  IntermediateRepresentation,
  Node,
  NWR,
} from "@/types/imr";
import ImrStoreInterface from "@/types/stores/ImrStore.interface";

const useImrStore = create<ImrStoreInterface>((set) => ({
  nlSentence: "",
  setNlSentence: (nlSentence: string) => {
    set(
      produce((draft) => {
        draft.nlSentence = nlSentence;
      })
    );
  },
  imr: {
    area: {
      type: "area",
      value: "Köln",
    },
    edges: [
      {
        source: 0,
        target: 1,
        type: "dist",
        distance: "200 m",
      },
    ],
    nodes: [
      {
        id: 0,
        name: "hotel",
        type: "nwr",
        filters: [
          {
            or: [
              {
                key: "tourism",
                operator: "=",
                value: "hotel",
              },
            ],
          },
        ],
      },
      {
        id: 1,
        name: "train station",
        type: "nwr",
        filters: [
          {
            or: [
              {
                key: "railway",
                operator: "=",
                value: "station",
              },
            ],
          },
        ],
      },
    ],
  },
  setImr: (updatedImr: IntermediateRepresentation) => {
    set(
      produce((draft) => {
        draft.imr = updatedImr;
      })
    );
  },
  setSearchArea: (type: string, value: string | number[]) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: type,
          value: value,
        };
      })
    );
  },
  stringifiedImr: "",
  setStringifiedImr: (stringifiedImr: string) => {
    set(
      produce((draft) => {
        draft.stringifiedImr = stringifiedImr;
      })
    );
  },
  addNWRNode: () => {
    set(
      produce((draft) => {
        draft.imr.nodes.push({
          id: draft.imr.nodes.length + 1,
          type: "nwr",
          name: shortUUID().generate(),
          filters: [],
        });
      })
    );
  },
  addClusterNode: () => {
    set(
      produce((draft) => {
        draft.imr.nodes.push({
          id: draft.imr.nodes.length + 1,
          type: "cluster",
          name: shortUUID().generate(),
          minPoints: 2,
          maxDistance: "50m",
          filters: [],
        });
      })
    );
  },
  removeNode: (id) => {
    set(
      produce((draft) => {
        draft.imr.edges = draft.imr.edges.filter(
          (edge: Edge) => edge.source !== id && edge.target !== id
        );
        draft.imr.nodes = draft.imr.nodes.filter(
          (node: Node) => node.id !== id
        );
      })
    );
  },
  addDistanceEdge: () => {
    set(
      produce((draft) => {
        draft.imr.edges.push({
          source: 1,
          target: 2,
          type: "distance",
          distance: "50m",
        });
      })
    );
  },
  addContainsEdge: () => {
    set(
      produce((draft) => {
        draft.imr.edges.push({
          source: 1,
          target: 2,
          type: "contains",
        });
      })
    );
  },
  removeEdge: (index) => {
    set(
      produce((draft) => {
        draft.imr.edges.slice(index, 1);
      })
    );
  },
  setImrBBox: (bbox) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: "bbox",
          value: bbox,
        };
      })
    );
  },
  setImrPolygon: (polygon) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: "area",
          value: polygon,
        };
      })
    );
  },
  setImrArea: (area) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: "area",
          value: area,
        };
      })
    );
  },
  setFilterValue: (setId, filterId, key, value) => {
    set(
      produce((draft) => {
        let set = draft.imr.nodes.findIndex((set: NWR) => set.id === setId);
        draft.imr.nodes[set].filters[filterId][key] = value;
      })
    );
  },
  addFilter: (setId) => {
    set(
      produce((draft) => {
        let set = draft.imr.nodes.findIndex((set: NWR) => set.id === setId);
        draft.imr.nodes[set].filters.push({
          k: "",
          v: "",
          op: "=",
          n: "",
        });
      })
    );
  },
  removeFilter: (setId, filterId) => {
    set(
      produce((draft) => {
        let set = draft.imr.nodes.findIndex((set: NWR) => set.id === setId);
        draft.imr.nodes[set].filters = draft.imr.nodes[set].filters.filter(
          (_: Filter, index: number) => index !== filterId
        );
      })
    );
  },
  setSetName: (setId, name) => {
    set(
      produce((draft) => {
        let set = draft.imr.nodes.findIndex((set: NWR) => set.id === setId);
        draft.imr.nodes[set].n = name;
      })
    );
  },
  setRelationValue: (index, key, value) => {
    set(
      produce((draft) => {
        draft.imr.edges[index][key] = value;
      })
    );
  },
  removeRelation: (index) => {
    set(
      produce((draft) => {
        draft.imr.edges.slice(index, 1);
      })
    );
  },
  addContainsRelation: () => {
    set(
      produce((draft) => {
        draft.imr.edges.push({
          id: draft.imr.edges.length + 1,
          source: 1,
          target: 2,
          type: "cnt",
        });
      })
    );
  },
  addDistanceRelation: () => {
    set(
      produce((draft) => {
        draft.imr.edges.push({
          id: draft.imr.edges.length + 1,
          source: 1,
          target: 2,
          type: "dist",
          distance: "50m",
        });
      })
    );
  },
  setClusterProp: (id, key, value) => {
    set(
      produce((draft) => {
        let cluster = draft.imr.nodes.findIndex(
          (cluster: Node) => cluster.id === id
        );
        draft.imr.nodes[cluster][key] = value;
      })
    );
  },
  initialize: (initialData: any) => {
    set(
      produce((draft) => {
        draft.nlSentence = initialData.nlSentence;
        draft.imr = initialData.imr;
        draft.stringifiedImr = JSON.stringify(initialData.imr, null, 2);
      })
    );
  },
}));

export default useImrStore;
