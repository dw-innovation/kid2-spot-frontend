export type Filter = {
  k: string;
  v: string;
  op: "=" | "<" | ">" | "~";
  n: string;
};

export type Cluster = {
  id: number;
  flts: Filter[];
  t: "cluster";
  minPts: number;
  maxDist: string;
  n: string;
};

export type NWR = {
  id: number;
  flts: Filter[];
  t: "nwr";
  n: string;
};

type Group = {
  id: number;
  t: "group";
  ns: (Cluster | NWR | Group)[];
  es: Edge[];
};

export type ContainsRelation = {
  id: number;
  src: number;
  tgt: number;
  t: "cnt";
};

export type DistanceRelation = {
  id: number;
  src: number;
  tgt: number;
  t: "dist";
  dist: string;
};

export type Edge = ContainsRelation | DistanceRelation;

export type Node = Cluster | NWR | Group;

export interface IntermediateRepresentation {
  a: {
    t: "area" | "polygon" | "bbox";
    v: string | number[];
  };
  ns: (Cluster | NWR | Group)[];
  es: Edge[];
}
