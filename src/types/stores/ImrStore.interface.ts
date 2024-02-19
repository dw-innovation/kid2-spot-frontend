import { FilterNode, IntermediateRepresentation } from "@/types/imr";

export default interface ImrStoreInterface {
  nlSentence: string;
  setNlSentence: (nlSentence: string) => void;
  imr: IntermediateRepresentation;
  setImr: (imr: IntermediateRepresentation) => void;
  addFilter: (
    nodeId: number,
    filterIndexPath: number[],
    newFilter: FilterNode
  ) => void;
  removeRuleOrGroup: (nodeId: number, path: number[]) => void;
  addRuleOrGroup: (nodeId: number, path: number[], newObject: Object) => void;
  switchKeyAtPath: (nodeId: number, path: number[]) => void;
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
  updateRuleValue: (
    nodeId: number,
    pathString: string,
    keyToUpdate: string,
    newValue: any
  ) => void;
  setFilterValue: (
    setId: number,
    filterId: number,
    key: string,
    value: string
  ) => void;
  setSearchArea: (
    type: "area" | "polygon" | "bbox",
    value: string | number[]
  ) => void;
  setNodeName: (nodeId: number, name: string) => void;
  setRelationValue: (
    index: number,
    key: string,
    value: string | number
  ) => void;
  setClusterProp: (id: number, key: string, value: number | string) => void;
  initialize: (initialData: any) => void;
}
