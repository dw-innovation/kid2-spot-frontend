import produce from "immer";
import { create } from "zustand";

import { initialIMR } from "@/lib/const/imr";
import {
  addClusterNode,
  addContainsEdge,
  addDistanceEdge,
  addFilter,
  addLogicFilter,
  addNWRNode,
  deleteFilter,
  removeEdge,
  removeNode,
  setFilterValue,
  setNodeName,
  updateFilter,
  updateSearchArea,
} from "@/lib/imr";
import { Node } from "@/types/imr";
import ImrStoreInterface from "@/types/stores/ImrStore.interface";

const useImrStore = create<ImrStoreInterface>((set) => ({
  nlSentence: "",
  setNlSentence: (nlSentence) => set({ nlSentence }),
  imr: initialIMR,
  setImr: (updatedImr) => set({ imr: updatedImr }),
  updateFilter: (nodeId, filterIndexPath, updatedFilter) => {
    set((state) => ({
      imr: updateFilter(state.imr, nodeId, filterIndexPath, updatedFilter),
    }));
  },
  addFilter: (nodeId, filterIndexPath, newFilter) =>
    set((state) => ({
      imr: addFilter(state.imr, nodeId, filterIndexPath, newFilter),
    })),
  setSearchArea: (type, value) => {
    set((state) => ({ imr: updateSearchArea(state.imr, type, value) }));
  },
  stringifiedImr: "",
  setStringifiedImr: (stringifiedImr) => set({ stringifiedImr }),
  addNWRNode: () => set((state) => ({ imr: addNWRNode(state.imr) })),
  addClusterNode: () => set((state) => ({ imr: addClusterNode(state.imr) })),
  removeNode: (id) => set((state) => ({ imr: removeNode(state.imr, id) })),
  addDistanceEdge: () => set((state) => ({ imr: addDistanceEdge(state.imr) })),
  addContainsEdge: () => set((state) => ({ imr: addContainsEdge(state.imr) })),
  removeEdge: (index) =>
    set((state) => ({ imr: removeEdge(state.imr, index) })),
  setImrBBox: (bbox) =>
    set((state) => ({ imr: updateSearchArea(state.imr, "bbox", bbox) })),
  setImrPolygon: (polygon) =>
    set((state) => ({ imr: updateSearchArea(state.imr, "polygon", polygon) })),
  setImrArea: (area) =>
    set((state) => ({ imr: updateSearchArea(state.imr, "area", area) })),
  setFilterValue: (nodeId, filterId, key, value) =>
    set((state) => ({
      imr: setFilterValue(state.imr, nodeId, filterId, key, value),
    })),
  deleteFilter: (nodeId, filterIndexPath) => {
    set((state) => ({ imr: deleteFilter(state.imr, nodeId, filterIndexPath) }));
  },
  addLogicFilter: (nodeId, filterIndexPath, logicType) => {
    set((state) => ({
      imr: addLogicFilter(state.imr, nodeId, filterIndexPath, logicType),
    }));
  },

  setNodeName: (nodeId, name) => {
    set((state) => ({ imr: setNodeName(state.imr, nodeId, name) }));
  },
  setRelationValue: (index, key, value) => {
    set(
      produce((draft) => {
        draft.imr.edges[index][key] = value;
      })
    );
  },
  setClusterProp: (id, key, value) => {
    set(
      produce((draft) => {
        let cluster = draft.imr.nodes.findIndex(
          (cluster: Node) => cluster.id === id
        );
        draft.imr.nodes[cluster][key] = value;
      })
    );
  },
  initialize: (initialData) =>
    set(() => ({
      imr: initialData.imr,
      nlSentence: initialData.nlSentence,
      stringifiedImr: JSON.stringify(initialData.imr, null, 2),
    })),
}));

export default useImrStore;
