import produce from "immer";
import shortUUID from "short-uuid";
import { create } from "zustand";

import {
  Edge,
  FilterNode,
  IntermediateRepresentation,
  LogicFilter,
  LogicOperator,
  Node,
  NWR,
} from "@/types/imr";
import ImrStoreInterface from "@/types/stores/ImrStore.interface";

const updateNestedFilter = (
  filters: FilterNode[],
  filterIndexPath: number[],
  updatedFilter: FilterNode
): FilterNode[] => {
  const [index, ...remainingIndexPath] = filterIndexPath;

  if (typeof index === "undefined") {
    return filters;
  }

  return filters.map((filter, i) => {
    if (i !== index) return filter;

    if (remainingIndexPath.length === 0) {
      return updatedFilter;
    }

    const logicFilter = filter as LogicFilter;
    const operator: LogicOperator = logicFilter.and ? "and" : "or";

    return {
      [operator]: updateNestedFilter(
        logicFilter[operator]!,
        remainingIndexPath,
        updatedFilter
      ),
    };
  });
};

const deleteNestedFilter = (
  filters: FilterNode[],
  filterIndexPath: number[]
): FilterNode[] => {
  if (filterIndexPath.length === 1) {
    return filters.filter((_, i) => i !== filterIndexPath[0]);
  }

  const [index, ...remainingIndexPath] = filterIndexPath;

  return filters.map((filter, i) => {
    if (i !== index) return filter;

    const logicFilter = filter as LogicFilter;
    const operator: LogicOperator = logicFilter.and ? "and" : "or";

    return {
      [operator]: deleteNestedFilter(
        logicFilter[operator]!,
        remainingIndexPath
      ),
    };
  });
};

const addNestedFilter = (
  filters: FilterNode[],
  filterIndexPath: number[],
  newFilter: FilterNode
): FilterNode[] => {
  if (filterIndexPath.length === 0) {
    return [...filters, newFilter];
  }

  const [index, ...remainingIndexPath] = filterIndexPath;

  return filters.map((filter, i) => {
    if (i !== index) return filter;

    const logicFilter = filter as LogicFilter;
    const operator: LogicOperator = logicFilter.and ? "and" : "or";

    return {
      [operator]: addNestedFilter(
        logicFilter[operator]!,
        remainingIndexPath,
        newFilter
      ),
    };
  });
};

const useImrStore = create<ImrStoreInterface>((set) => ({
  nlSentence: "",
  setNlSentence: (nlSentence: string) => {
    set(
      produce((draft) => {
        draft.nlSentence = nlSentence;
      })
    );
  },
  imr: {
    area: {
      type: "area",
      value: "Köln",
    },
    edges: [
      {
        source: 0,
        target: 1,
        type: "dist",
        distance: "200 m",
      },
    ],
    nodes: [
      {
        id: 0,
        name: "hotel",
        type: "nwr",
        filters: [
          {
            or: [
              {
                key: "tourism",
                operator: "=",
                value: "hotel",
              },
              {
                and: [
                  {
                    key: "tourism",
                    operator: "=",
                    value: "motel",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 1,
        name: "train station",
        type: "nwr",
        filters: [
          {
            or: [
              {
                key: "railway",
                operator: "=",
                value: "station",
              },
            ],
          },
        ],
      },
    ],
  },
  setImr: (updatedImr: IntermediateRepresentation) => {
    set(
      produce((draft) => {
        draft.imr = updatedImr;
      })
    );
  },
  updateFilter: (nodeId, filterIndexPath, updatedFilter) => {
    set((state) => {
      const nodes = state.imr.nodes.map((node) => {
        if (node.id !== nodeId) return node;

        const updatedFilters = updateNestedFilter(
          node.filters,
          filterIndexPath,
          updatedFilter
        );
        return {
          ...node,
          filters: updatedFilters,
        };
      });

      return { imr: { ...state.imr, nodes } };
    });
  },
  addFilter: (
    nodeId: number,
    filterIndexPath: number[],
    newFilter: FilterNode
  ) => {
    set((state) => {
      const nodes = state.imr.nodes.map((node) => {
        if (node.id !== nodeId) return node;

        const updatedFilters = addNestedFilter(
          node.filters,
          filterIndexPath,
          newFilter
        );
        return {
          ...node,
          filters: updatedFilters,
        };
      });

      return { imr: { ...state.imr, nodes } };
    });
  },
  setSearchArea: (type: string, value: string | number[]) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: type,
          value: value,
        };
      })
    );
  },
  stringifiedImr: "",
  setStringifiedImr: (stringifiedImr: string) => {
    set(
      produce((draft) => {
        draft.stringifiedImr = stringifiedImr;
      })
    );
  },
  addNWRNode: () => {
    set(
      produce((draft) => {
        draft.imr.nodes.push({
          id: draft.imr.nodes.length + 1,
          type: "nwr",
          name: shortUUID().generate(),
          filters: [],
        });
      })
    );
  },
  addClusterNode: () => {
    set(
      produce((draft) => {
        draft.imr.nodes.push({
          id: draft.imr.nodes.length + 1,
          type: "cluster",
          name: shortUUID().generate(),
          minPoints: 2,
          maxDistance: "50m",
          filters: [],
        });
      })
    );
  },
  removeNode: (id) => {
    set(
      produce((draft) => {
        draft.imr.edges = draft.imr.edges.filter(
          (edge: Edge) => edge.source !== id && edge.target !== id
        );
        draft.imr.nodes = draft.imr.nodes.filter(
          (node: Node) => node.id !== id
        );
      })
    );
  },
  addDistanceEdge: () => {
    set(
      produce((draft) => {
        draft.imr.edges.push({
          source: 1,
          target: 2,
          type: "distance",
          distance: "50m",
        });
      })
    );
  },
  addContainsEdge: () => {
    set(
      produce((draft) => {
        draft.imr.edges.push({
          source: 1,
          target: 2,
          type: "contains",
        });
      })
    );
  },
  removeEdge: (index) => {
    set(
      produce((draft) => {
        draft.imr.edges.slice(index, 1);
      })
    );
  },
  setImrBBox: (bbox) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: "bbox",
          value: bbox,
        };
      })
    );
  },
  setImrPolygon: (polygon) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: "area",
          value: polygon,
        };
      })
    );
  },
  setImrArea: (area) => {
    set(
      produce((draft) => {
        draft.imr.area = {
          type: "area",
          value: area,
        };
      })
    );
  },
  setFilterValue: (setId, filterId, key, value) => {
    set(
      produce((draft) => {
        let set = draft.imr.nodes.findIndex((set: NWR) => set.id === setId);
        draft.imr.nodes[set].filters[filterId][key] = value;
      })
    );
  },
  deleteFilter: (nodeId: number, filterIndexPath: number[]) => {
    set((state) => {
      const nodes = state.imr.nodes.map((node) => {
        if (node.id !== nodeId) return node;

        const updatedFilters = deleteNestedFilter(
          node.filters,
          filterIndexPath
        );
        return {
          ...node,
          filters: updatedFilters,
        };
      });

      return { imr: { ...state.imr, nodes } };
    });
  },
  setSetName: (setId, name) => {
    set(
      produce((draft) => {
        let set = draft.imr.nodes.findIndex((set: NWR) => set.id === setId);
        draft.imr.nodes[set].n = name;
      })
    );
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
  initialize: (initialData: any) => {
    set(
      produce((draft) => {
        draft.nlSentence = initialData.nlSentence;
        draft.imr = initialData.imr;
        draft.stringifiedImr = JSON.stringify(initialData.imr, null, 2);
      })
    );
  },
}));

export default useImrStore;
