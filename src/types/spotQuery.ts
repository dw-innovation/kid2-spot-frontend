import { MultiPolygon, Polygon } from "@turf/turf";

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
  display_name: string;
};

export type NWR = {
  id: number;
  filters: FilterNode[];
  type: "nwr";
  name: string;
  display_name: string;
};

export type ContainsRelation = {
  id: number;
  source: number;
  target: number;
  type: "contains";
};

export type DistanceRelation = {
  source: number;
  target: number;
  type: "dist";
  value: string;
};

export type Edge = ContainsRelation | DistanceRelation;

export type Node = Cluster | NWR;

export type Area = {
  type: "area";
  value: string;
  geometry?: Polygon | MultiPolygon;
};

export type Bbox = {
  type: "bbox";
  bbox: number[];
};

export interface SpotQuery {
  area: Area | Bbox;
  nodes: (Cluster | NWR)[];
  edges: Edge[];
}