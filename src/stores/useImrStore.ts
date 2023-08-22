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

import ImrStoreInterface from "./interfaces/ImrStore.interface";

const useImrStore = create<ImrStoreInterface>((set) => ({
  imr: {
    a: {
      t: "area",
      v: "Köln",
    },
    ns: [
      {
        id: 1,
        t: "nwr",
        n: "leisure_park",
        flts: [
          {
            k: "leisure",
            v: "park",
            op: "=",
            n: "parks",
          },
        ],
      },
      {
        id: 2,
        t: "nwr",
        n: "sport_table_tennis",
        flts: [
          {
            k: "sport",
            v: "table_tennis",
            op: "=",
            n: "table_tennis",
          },
        ],
      },
    ],
    es: [
      {
        id: 1,
        src: 1,
        tgt: 2,
        t: "cnt",
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
        draft.imr.ns.push({
          id: draft.imr.ns.length + 1,
          t: "nwr",
          n: shortUUID().generate(),
          flts: [],
        });
      })
    );
  },
  addClusterNode: () => {
    set(
      produce((draft) => {
        draft.imr.ns.push({
          id: draft.imr.ns.length + 1,
          t: "cluster",
          n: shortUUID().generate(),
          minPts: 2,
          maxDist: "50m",
          flts: [],
        });
      })
    );
  },
  removeNode: (id) => {
    set(
      produce((draft) => {
        draft.imr.es = draft.imr.es.filter(
          (edge: Edge) => edge.src !== id && edge.tgt !== id
        );
        draft.imr.ns = draft.imr.ns.filter((node: Node) => node.id !== id);
      })
    );
  },
  addDistanceEdge: () => {
    set(
      produce((draft) => {
        draft.imr.es.push({
          src: 1,
          tgt: 2,
          t: "dist",
          dist: "50m",
        });
      })
    );
  },
  addContainsEdge: () => {
    set(
      produce((draft) => {
        draft.imr.es.push({
          src: 1,
          tgt: 2,
          t: "cnt",
        });
      })
    );
  },
  removeEdge: (id) => {
    set(
      produce((draft) => {
        draft.imr.es = draft.imr.es.filter((edge: Edge) => edge.src !== id);
      })
    );
  },
  setImrBBox: (bbox) => {
    set(
      produce((draft) => {
        draft.imr.a = {
          t: "bbox",
          v: bbox,
        };
      })
    );
  },
  setImrPolygon: (polygon) => {
    set(
      produce((draft) => {
        draft.imr.a = {
          t: "area",
          v: polygon,
        };
      })
    );
  },
  setImrArea: (area) => {
    set(
      produce((draft) => {
        draft.imr.a = {
          t: "area",
          v: area,
        };
      })
    );
  },
  setFilterValue: (setId, filterId, key, value) => {
    set(
      produce((draft) => {
        let set = draft.imr.ns.findIndex((set: NWR) => set.id === setId);
        draft.imr.ns[set].flts[filterId][key] = value;
      })
    );
  },
  addFilter: (setId) => {
    set(
      produce((draft) => {
        let set = draft.imr.ns.findIndex((set: NWR) => set.id === setId);
        draft.imr.ns[set].flts.push({
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
        let set = draft.imr.ns.findIndex((set: NWR) => set.id === setId);
        draft.imr.ns[set].flts = draft.imr.ns[set].flts.filter(
          (_: Filter, index: number) => index !== filterId
        );
      })
    );
  },
  setSetName: (setId, name) => {
    set(
      produce((draft) => {
        let set = draft.imr.ns.findIndex((set: NWR) => set.id === setId);
        draft.imr.ns[set].n = name;
      })
    );
  },
  setRelationValue: (relationId, key, value) => {
    set(
      produce((draft) => {
        let relation = draft.imr.es.findIndex(
          (relation: Edge) => relation.id === relationId
        );
        draft.imr.es[relation][key] = value;
      })
    );
  },
  removeRelation: (relationId) => {
    set(
      produce((draft) => {
        draft.imr.es = draft.imr.es.filter(
          (relation: Edge) => relation.id !== relationId
        );
      })
    );
  },
  addContainsRelation: () => {
    set(
      produce((draft) => {
        draft.imr.es.push({
          id: draft.imr.es.length + 1,
          src: 1,
          tgt: 2,
          t: "cnt",
        });
      })
    );
  },
  addDistanceRelation: () => {
    set(
      produce((draft) => {
        draft.imr.es.push({
          id: draft.imr.es.length + 1,
          src: 1,
          tgt: 2,
          t: "dist",
          dist: "50m",
        });
      })
    );
  },
  setClusterProp: (id, key, value) => {
    set(
      produce((draft) => {
        let cluster = draft.imr.ns.findIndex(
          (cluster: Node) => cluster.id === id
        );
        draft.imr.ns[cluster][key] = value;
      })
    );
  },
}));

export default useImrStore;
