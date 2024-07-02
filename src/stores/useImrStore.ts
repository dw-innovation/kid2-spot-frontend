import { create } from "zustand";

import { initialIMR } from "@/lib/const/imr";
import {
  addRuleOrGroup,
  removeRuleOrGroup,
  switchOperatorAtPath,
  updateName,
  updateRuleValue,
  updateSearchArea,
  updateSearchGeometry,
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
  setImrArea: (area) =>
    set((state) => ({ imr: updateSearchArea(state.imr, "area", area) })),
  setImrGeometry: (geometry) =>
    set((state) => ({ imr: updateSearchGeometry(state.imr, geometry) })),
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
  updateName: (nodeId, displayName) => {
    set((state) => ({
      imr: updateName(state.imr, nodeId, displayName),
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
