import { IntermediateRepresentation } from "@/types/imr";

export default interface ImrStoreInterface {
  nlSentence: string;
  setNlSentence: (nlSentence: string) => void;
  imr: IntermediateRepresentation;
  setImr: (imr: IntermediateRepresentation) => void;
  stringifiedImr: string;
  setStringifiedImr: (stringifiedImr: string) => void;
  addNWRNode: () => void;
  addClusterNode: () => void;
  removeNode: (id: number) => void;
  addDistanceEdge: () => void;
  addContainsEdge: () => void;
  removeEdge: (index: number) => void;
  setImrBBox: (bbox: number[]) => void;
  setImrPolygon: (polygon: number[]) => void;
  setImrArea: (area: string) => void;
  setFilterValue: (
    setId: number,
    filterId: number,
    key: string,
    value: string
  ) => void;
  setSearchArea: (type: string, value: string | number[][]) => void;
  addFilter: (setId: number) => void;
  removeFilter: (setId: number, filterId: number) => void;
  setSetName: (setId: number, name: string) => void;
  setRelationValue: (
    index: number,
    key: string,
    value: string | number
  ) => void;
  removeRelation: (index: number) => void;
  addContainsRelation: () => void;
  addDistanceRelation: () => void;
  setClusterProp: (id: number, key: string, value: number | string) => void;
  initialize: (initialData: any) => void;
}