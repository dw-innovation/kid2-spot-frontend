import { IntermediateRepresentation } from "@/types/imr";

export default interface ImrStoreInterface {
  nlSentence: string;
  setNlSentence: (nlSentence: string) => void;
  imr: IntermediateRepresentation;
  setImr: (imr: IntermediateRepresentation) => void;
  removeRuleOrGroup: (nodeId: number, pathString: string) => void;
  addRuleOrGroup: (
    nodeId: number,
    pathString: string,
    newObject: Object
  ) => void;
  switchOperatorAtPath: (nodeId: number, pathString: string) => void;
  stringifiedImr: string;
  setStringifiedImr: (stringifiedImr: string) => void;
  setImrBBox: (bbox: number[]) => void;
  setImrPolygon: (polygon: number[]) => void;
  setImrArea: (area: string) => void;
  updateRuleValue: (
    nodeId: number,
    pathString: string,
    keyToUpdate: string,
    newValue: any
  ) => void;
  setSearchArea: (
    type: "area" | "polygon" | "bbox",
    value: string | number[]
  ) => void;
  setRelationValue: (
    index: number,
    key: string,
    value: string | number
  ) => void;
  initialize: (initialData: any) => void;
}
