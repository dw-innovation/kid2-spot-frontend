import { create } from "zustand";

import { initialIMR } from "@/lib/const/imr";
import {
  addRuleOrGroup,
  removeRuleOrGroup,
  switchOperatorAtPath,
  updateRuleValue,
  updateSearchArea,
} from "@/lib/imr";
import ImrStoreInterface from "@/types/stores/ImrStore.interface";

const useImrStore = create<ImrStoreInterface>((set) => ({
  nlSentence: "",
  setNlSentence: (nlSentence) => set({ nlSentence }),
  imr: initialIMR,
  setImr: (updatedImr) => set({ imr: updatedImr }),
  setSearchArea: (type, value) => {
    set((state) => ({ imr: updateSearchArea(state.imr, type, value) }));
  },
  stringifiedImr: "",
  setStringifiedImr: (stringifiedImr) => set({ stringifiedImr }),
  setImrBBox: (bbox) =>
    set((state) => ({ imr: updateSearchArea(state.imr, "bbox", bbox) })),
  setImrPolygon: (polygon) =>
    set((state) => ({ imr: updateSearchArea(state.imr, "polygon", polygon) })),
  setImrArea: (area) =>
    set((state) => ({ imr: updateSearchArea(state.imr, "area", area) })),
  removeRuleOrGroup: (nodeId, pathString) => {
    set((state) => ({ imr: removeRuleOrGroup(state.imr, nodeId, pathString) }));
  },
  addRuleOrGroup: (nodeId, pathString, newObject) => {
    set((state) => ({
      imr: addRuleOrGroup(state.imr, nodeId, pathString, newObject),
    }));
  },
  updateRuleValue: (nodeId, pathString, keyToUpdate, newValue) => {
    set((state) => ({
      imr: updateRuleValue(
        state.imr,
        nodeId,
        pathString,
        keyToUpdate,
        newValue
      ),
    }));
  },
  switchOperatorAtPath: (nodeId, pathString) => {
    set((state) => ({
      imr: switchOperatorAtPath(state.imr, nodeId, pathString),
    }));
  },
  setRelationValue: (index, key, value) =>
    set((state) => ({
      imr: {
        ...state.imr,
        edges: state.imr.edges.map((edge, idx) =>
          idx === index ? { ...edge, [key]: value } : edge
        ),
      },
    })),
  initialize: (initialData) =>
    set(() => ({
      imr: initialData.imr,
      nlSentence: initialData.nlSentence,
      stringifiedImr: JSON.stringify(initialData.imr, null, 2),
    })),
}));

export default useImrStore;
