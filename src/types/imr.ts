export type LogicOperator = "and" | "or";

export interface LogicFilter {
  and?: FilterNode[];
  or?: FilterNode[];
}

export type Filter = {
  key: string;
  value: string;
  operator: "=" | "<" | ">" | "~";
  name?: string;
};

export type FilterNode = Filter | LogicFilter;

export type Cluster = {
  id: number;
  filters: FilterNode[];
  type: "cluster";
  minPoints: number;
  maxDistance: string;
  name: string;
};

export type NWR = {
  id: number;
  filters: FilterNode[];
  type: "nwr";
  name: string;
};

export type ContainsRelation = {
  id: number;
  source: number;
  target: number;
  type: "cnt";
};

export type DistanceRelation = {
  source: number;
  target: number;
  type: "dist";
  distance: string;
};

export type Edge = ContainsRelation | DistanceRelation;

export type Node = Cluster | NWR;

export interface IntermediateRepresentation {
  area: {
    type: "area" | "polygon" | "bbox";
    value: string | number[];
  };
  nodes: (Cluster | NWR)[];
  edges: Edge[];
}
