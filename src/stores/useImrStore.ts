import produce from "immer";
import shortUUID from "short-uuid";
import { create } from "zustand";

import { Edge, IntermediateRepresentation, Node } from "@/types/imr";

import ImrStoreInterface from "./interfaces/ImrStore.interface";

const useImrStore = create<ImrStoreInterface>((set) => ({
  imr: {
    a: {
      t: "bbox",
      v: [
        13.3689022064209, 52.531939622327705, 13.413662910461426,
        52.54979264830959,
      ],
    },
    ns: [
      {
        id: 1,
        t: "nwr",
        n: "parks",
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
        n: "table_tennis",
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
}));

export default useImrStore;
