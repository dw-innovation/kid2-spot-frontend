import { create } from "zustand";

import { initialSpotQuery } from "@/lib/const/spotQuery";
import {
  addRuleOrGroup,
  removeRuleOrGroup,
  switchOperatorAtPath,
  updateNodeDisplayName,
  updateRuleValue,
  updateSearchAreaName,
  updateSearchBbox,
  updateSearchGeometry,
} from "@/lib/spotQuery";
import SpotQueryInterface from "@/types/stores/SpotQueryStore.interface";

const useSpotQueryStore = create<SpotQueryInterface>((set) => ({
  naturalLanguageSentence: "",
  setNaturaLanguageSentence: (naturalLanguageSentence) =>
    set({ naturalLanguageSentence }),
  spotQuery: initialSpotQuery,
  setSpotQuery: (newSpotQuery) => set({ spotQuery: newSpotQuery }),
  stringifiedSpotQuery: "",
  setStringifiedSpotQuery: (stringifiedSpotQuery) =>
    set({ stringifiedSpotQuery }),
  setSearchAreaName: (value) => {
    set((state) => ({
      spotQuery: updateSearchAreaName(state.spotQuery, value),
    }));
  },
  setSearchAreaBBox: (bbox) =>
    set((state) => ({
      spotQuery: updateSearchBbox(state.spotQuery, bbox),
    })),
  setSearchAreaGeometry: (geometry) =>
    set((state) => ({
      spotQuery: updateSearchGeometry(state.spotQuery, geometry),
    })),
  removeRuleOrGroup: (nodeId, pathString) => {
    set((state) => ({
      spotQuery: removeRuleOrGroup(state.spotQuery, nodeId, pathString),
    }));
  },
  addRuleOrGroup: (nodeId, pathString, newObject) => {
    set((state) => ({
      spotQuery: addRuleOrGroup(state.spotQuery, nodeId, pathString, newObject),
    }));
  },
  updateRuleValue: (nodeId, pathString, keyToUpdate, newValue) => {
    set((state) => ({
      spotQuery: updateRuleValue(
        state.spotQuery,
        nodeId,
        pathString,
        keyToUpdate,
        newValue
      ),
    }));
  },
  updateNodeDisplayName: (nodeId, displayName) => {
    set((state) => ({
      spotQuery: updateNodeDisplayName(state.spotQuery, nodeId, displayName),
    }));
  },
  switchOperatorAtPath: (nodeId, pathString) => {
    set((state) => ({
      spotQuery: switchOperatorAtPath(state.spotQuery, nodeId, pathString),
    }));
  },
  setRelationValue: (index, key, value) =>
    set((state) => ({
      spotQuery: {
        ...state.spotQuery,
        edges: state.spotQuery.edges.map((edge, idx) =>
          idx === index ? { ...edge, [key]: value } : edge
        ),
      },
    })),
  initialize: (initialData) =>
    set(() => ({
      spotQuery: initialData.spotQuery,
      naturalLanguageSentence: initialData.naturalLanguageSentence,
      stringifiedSpotQuery: JSON.stringify(initialData.spotQuery, null, 2),
    })),
}));

export default useSpotQueryStore;
