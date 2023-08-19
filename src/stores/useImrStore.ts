import produce from "immer";
import shortUUID from "short-uuid";
import { create } from "zustand";

import { Edge, IntermediateRepresentation, Node } from "@/types/imr";

import ImrStoreInterface from "./interfaces/ImrStore.interface";

const useImrStore = create<ImrStoreInterface>((set) => ({
  imr: {
    a: {
      t: "bbox",
      v: [12.399445, 52.170563, 14.475861, 52.79944],
    },
    ns: [
      {
        id: 1,
        t: "nwr",
        n: "cafes",
        flts: [
          {
            k: "amenity",
            v: "cafe",
            op: "=",
            n: "cafe",
          },
        ],
      },
      {
        id: 2,
        t: "nwr",
        n: "subwayEntrances",
        flts: [
          {
            k: "railway",
            v: "subway_entrance",
            op: "=",
            n: "subwayEntrances",
          },
        ],
      },
    ],
    es: [
      {
        src: 1,
        tgt: 2,
        t: "dist",
        dist: "50m",
      },
    ],
  },
  setImr: (imr: IntermediateRepresentation) => {
    set(
      produce((draft) => {
        draft.imr = imr;
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
