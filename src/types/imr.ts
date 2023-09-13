export type LogicOperator = "and" | "or";

export interface LogicFilter {
  and?: FilterNode[];
  or?: FilterNode[];
}

export type Filter = {
  k: string;
  v: string;
  op: "=" | "<" | ">" | "~";
  n?: string;
};

export type FilterNode = Filter | LogicFilter;

export type Cluster = {
  id: number;
  flts: FilterNode[];
  t: "cluster";
  minPts: number;
  maxDist: string;
  n: string;
};

export type NWR = {
  id: number;
  flts: FilterNode[];
  t: "nwr";
  n: string;
};

export type ContainsRelation = {
  id: number;
  src: number;
  tgt: number;
  t: "cnt";
};

export type DistanceRelation = {
  src: number;
  tgt: number;
  t: "dist";
  dist: string;
};

export type Edge = ContainsRelation | DistanceRelation;

export type Node = Cluster | NWR;

export interface IntermediateRepresentation {
  a: {
    t: "area" | "polygon" | "bbox";
    v: string | number[];
  };
  ns: (Cluster | NWR)[];
  es: Edge[];
}
