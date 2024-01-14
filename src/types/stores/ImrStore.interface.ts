import {
  FilterNode,
  IntermediateRepresentation,
  LogicOperator,
} from "@/types/imr";

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
  addLogicFilter: (
    nodeId: number,
    filterIndexPath: number[],
    logicType: LogicOperator
  ) => void;
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
