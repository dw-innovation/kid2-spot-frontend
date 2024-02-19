import _ from "lodash";

import {
  FilterNode,
  IntermediateRepresentation,
  LogicFilter,
  LogicOperator,
} from "@/types/imr";

export const updateNestedFilter = (
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

export const deleteNestedFilter = (
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

export const addNestedFilter = (
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

export const addLogicGroupAtPath = (
  filters: FilterNode[],
  path: number[],
  LogicOperator: LogicFilter
): FilterNode[] => {
  if (path.length === 0) {
    return [LogicOperator, ...filters];
  }

  const [index, ...remainingPath] = path;

  return filters.map((filter, i) => {
    if (i !== index) return filter;

    const logicFilter = filter as LogicFilter;
    const operator: LogicOperator = logicFilter.and ? "and" : "or";

    return {
      [operator]: addLogicGroupAtPath(
        logicFilter[operator]!,
        remainingPath,
        LogicOperator
      ),
    };
  });
};

export const updateSearchArea = (
  imr: IntermediateRepresentation,
  type: "area" | "polygon" | "bbox",
  value: string | number[]
): IntermediateRepresentation => ({
  ...imr,
  area: {
    type,
    value,
  },
});

export const addNWRNode = (
  imr: IntermediateRepresentation
): IntermediateRepresentation => ({
  ...imr,
  nodes: [
    ...imr.nodes,
    {
      id: imr.nodes.length + 1,
      filters: [],
      type: "nwr",
      name: "",
    },
  ],
});

export const addClusterNode = (
  imr: IntermediateRepresentation
): IntermediateRepresentation => ({
  ...imr,
  nodes: [
    ...imr.nodes,
    {
      id: imr.nodes.length + 1,
      filters: [],
      type: "cluster",
      name: "",
      minPoints: 2,
      maxDistance: "50m",
    },
  ],
});

export const removeNode = (
  imr: IntermediateRepresentation,
  id: number
): IntermediateRepresentation => ({
  ...imr,
  edges: imr.edges.filter((edge) => edge.source !== id && edge.target !== id),
  nodes: imr.nodes.filter((node) => node.id !== id),
});

export const addDistanceEdge = (
  imr: IntermediateRepresentation
): IntermediateRepresentation => ({
  ...imr,
  edges: [
    ...imr.edges,
    {
      source: 1,
      target: 2,
      type: "dist",
      distance: "50m",
    },
  ],
});

export const addContainsEdge = (
  imr: IntermediateRepresentation
): IntermediateRepresentation => ({
  ...imr,
  edges: [
    ...imr.edges,
    {
      id: imr.edges.length + 1,
      source: 1,
      target: 2,
      type: "cnt",
    },
  ],
});

export const removeEdge = (
  imr: IntermediateRepresentation,
  index: number
): IntermediateRepresentation => ({
  ...imr,
  edges: imr.edges.filter((_, i) => i !== index),
});

export const setFilterValue = (
  imr: IntermediateRepresentation,
  nodeId: number,
  filterId: number,
  key: string,
  value: string
) => {
  const updatedNodes = imr.nodes.map((node) => {
    if (node.id !== nodeId) return node;

    const updatedFilters = node.filters.map((filter, i) => {
      if (i !== filterId) return filter;

      return {
        ...filter,
        [key]: value,
      };
    });

    return {
      ...node,
      filters: updatedFilters,
    };
  });

  return {
    ...imr,
    nodes: updatedNodes,
  };
};

export const deleteFilter = (
  imr: IntermediateRepresentation,
  nodeId: number,
  filterIndexPath: number[]
): IntermediateRepresentation => {
  const updatedNodes = imr.nodes.map((node) => {
    if (node.id !== nodeId) return node;

    const updatedFilters = deleteNestedFilter(node.filters, filterIndexPath);

    return {
      ...node,
      filters: updatedFilters,
    };
  });

  return {
    ...imr,
    nodes: updatedNodes,
  };
};

export const setNodeName = (
  imr: IntermediateRepresentation,
  nodeId: number,
  name: string
): IntermediateRepresentation => {
  const updatedNodes = imr.nodes.map((node) => {
    if (node.id !== nodeId) return node;

    return {
      ...node,
      name,
    };
  });

  return {
    ...imr,
    nodes: updatedNodes,
  };
};

export const addFilter = (
  imr: IntermediateRepresentation,
  nodeId: number,
  filterIndexPath: number[],
  newFilter: FilterNode
): IntermediateRepresentation => {
  const nodes = imr.nodes.map((node) => {
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

  return { ...imr, nodes };
};

export const addRuleOrGroup = (
  imr: IntermediateRepresentation,
  nodeId: number,
  pathString: string,
  newObject: Object
): IntermediateRepresentation => {
  const fullPath = `nodes[${nodeId}].${pathString}`;
  const clonedImr = _.cloneDeep(imr);
  _.set(clonedImr, fullPath, newObject);
  return clonedImr;
};

export const removeRuleOrGroup = (
  imr: IntermediateRepresentation,
  nodeId: number,
  pathString: string
): IntermediateRepresentation => {
  const fullPath = `nodes[${nodeId}].${pathString}`;
  const clonedImr = _.cloneDeep(imr);
  _.unset(clonedImr, fullPath);

  return clonedImr;
};

export const switchOperatorAtPath = (
  nodeId: number[],
  targetPath: number[],
  imr: IntermediateRepresentation
): IntermediateRepresentation => {
  const clonedNode = _.cloneDeep(imr);
  const targetNode = _.get(clonedNode, targetPath);
  if (targetNode && ("and" in targetNode || "or" in targetNode)) {
    const switchedNode = {
      ...("and" in targetNode && { or: targetNode.and }),
      ...("or" in targetNode && { and: targetNode.or }),
    };

    _.set(clonedNode, targetPath.slice(0, -1), switchedNode);
  }

  return clonedNode;
};

export const updateRuleValue = (
  imr: IntermediateRepresentation,
  nodeId: number,
  pathString: string,
  keyToUpdate: string,
  newValue: any
): IntermediateRepresentation => {
  const fullPath = `nodes[${nodeId}].${pathString}.${keyToUpdate}`;
  const clonedImr = _.cloneDeep(imr);
  _.set(clonedImr, fullPath, newValue);

  return clonedImr;
};

export const switchKeyAtPath = (
  imr: IntermediateRepresentation,
  nodeId: number,
  path: number[]
): IntermediateRepresentation => {
  const updatedIMR: IntermediateRepresentation = _.cloneDeep(imr);

  const nodeToUpdate = updatedIMR.nodes.find((node) => node.id === nodeId);
  if (!nodeToUpdate) {
    throw new Error(`Node with ID ${nodeId} not found.`);
  }

  const switchKey = (filters: FilterNode[], path: number[]): FilterNode[] => {
    if (path.length === 0) {
      throw new Error("Path cannot be empty.");
    }

    const [index, ...restPath] = path;
    if (index < 0 || index >= filters.length) {
      throw new Error("Path index out of bounds.");
    }

    if (restPath.length === 0) {
      const currentFilter = filters[index];
      if ("and" in currentFilter) {
        return [
          ...filters.slice(0, index),
          { or: currentFilter.and },
          ...filters.slice(index + 1),
        ];
      } else if ("or" in currentFilter) {
        return [
          ...filters.slice(0, index),
          { and: currentFilter.or },
          ...filters.slice(index + 1),
        ];
      } else {
        throw new Error("Target node is not a logical ('and'/'or') node.");
      }
    }

    const currentFilter = filters[index];
    if (!("and" in currentFilter || "or" in currentFilter)) {
      throw new Error(
        "Path leads to a non-logical node before reaching the target."
      );
    }

    const key: "and" | "or" = "and" in currentFilter ? "and" : "or";
    const nestedFilters: FilterNode[] = currentFilter[key] ?? [];
    const updatedFilters = switchKey(nestedFilters, restPath);

    return [
      ...filters.slice(0, index),
      { [key]: updatedFilters },
      ...filters.slice(index + 1),
    ];
  };

  if (nodeToUpdate.filters) {
    nodeToUpdate.filters = switchKey(nodeToUpdate.filters, path);
  } else {
    throw new Error("The specified node does not contain any filters.");
  }

  return updatedIMR;
};
