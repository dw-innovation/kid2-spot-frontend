import { FilterNode, IntermediateRepresentation } from "@/types/imr";

export default interface ImrStoreInterface {
  nlSentence: string;
  setNlSentence: (nlSentence: string) => void;
  imr: IntermediateRepresentation;
  setImr: (imr: IntermediateRepresentation) => void;
  updateFilter: (
    nodeId: number,
    filterIndexPath: number[],
    updatedFilter: FilterNode
  ) => void;
  addFilter: (
    nodeId: number,
    filterIndexPath: number[],
    newFilter: FilterNode
  ) => void;
  deleteFilter: (nodeId: number, filterIndexPath: number[]) => void;
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
  setSearchArea: (type: string, value: string | number[]) => void;
  setSetName: (setId: number, name: string) => void;
  setClusterProp: (id: number, key: string, value: number | string) => void;
  initialize: (initialData: any) => void;
}
