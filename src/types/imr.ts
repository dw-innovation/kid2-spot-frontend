export type Filter = {
  k: string;
  v: string;
  op: "=" | "<" | ">" | "~";
  n: string;
};

export type Cluster = {
  id: number;
  flts: Filter[]; // conditions
  t: "cluster";
  minPts: number; // minPoints
  maxDist: number; // maxDistance
};

export type NWR = {
  id: number;
  flts: Filter[];
  t: "nwr";
};

type Group = {
  id: number;
  t: "group";
  ns: (Cluster | NWR | Group)[]; // elements
  es: Edge[];
};

export type Edge =
  | {
      src: number;
      tgt: number;
      t: "dist";
      dist: number; // distance
    }
  | {
      src: number;
      tgt: number;
      t: "cnt";
    };

export type Node = Cluster | NWR | Group;

export interface IntermediateRepresentation {
  a: {
    t: "area" | "polygon" | "bbox";
    v: string | number[];
  };
  ns: (Cluster | NWR | Group)[]; // nodes
  es: Edge[];
}
