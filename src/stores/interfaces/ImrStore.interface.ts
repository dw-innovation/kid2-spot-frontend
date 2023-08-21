import { IntermediateRepresentation } from "@/types/imr";

export default interface ImrStoreInterface {
  imr: IntermediateRepresentation;
  setImr: (imr: IntermediateRepresentation) => void;
  stringifiedImr: string;
  setStringifiedImr: (stringifiedImr: string) => void;
  addNWRNode: () => void;
  addClusterNode: () => void;
  removeNode: (id: number) => void;
  addDistanceEdge: () => void;
  addContainsEdge: () => void;
  removeEdge: (id: number) => void;
  setImrBBox: (bbox: number[]) => void;
  setImrPolygon: (polygon: number[]) => void;
  setImrArea: (area: string) => void;
  setFilterValue: (
    setId: number,
    filterId: number,
    key: string,
    value: string
  ) => void;
  addFilter: (setId: number) => void;
  removeFilter: (setId: number, filterId: number) => void;
  setSetName: (setId: number, name: string) => void;
  setRelationValue: (
    relationId: number,
    key: string,
    value: string | number
  ) => void;
  removeRelation: (relationId: number) => void;
  addContainsRelation: () => void;
  addDistanceRelation: () => void;
  setClusterProp: (id: number, key: string, value: number | string) => void;
}
