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

export const addLogicFilterAtPath = (
  filters: FilterNode[],
  filterIndexPath: number[],
  newLogicFilter: LogicFilter
): FilterNode[] => {
  if (filterIndexPath.length === 0) {
    return [newLogicFilter, ...filters];
  }

  const [index, ...remainingIndexPath] = filterIndexPath;

  return filters.map((filter, i) => {
    if (i !== index) return filter;

    const logicFilter = filter as LogicFilter;
    const operator: LogicOperator = logicFilter.and ? "and" : "or";

    return {
      [operator]: addLogicFilterAtPath(
        logicFilter[operator]!,
        remainingIndexPath,
        newLogicFilter
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

export const addLogicFilter = (
  imr: IntermediateRepresentation,
  nodeId: number,
  filterIndexPath: number[],
  logicType: LogicOperator
): IntermediateRepresentation => {
  const nodes = imr.nodes.map((node) => {
    if (node.id !== nodeId) return node;

    const newLogicFilter: LogicFilter = { [logicType]: [] };

    const updatedFilters = addLogicFilterAtPath(
      node.filters,
      filterIndexPath,
      newLogicFilter
    );

    return {
      ...node,
      filters: updatedFilters,
    };
  });

  return { ...imr, nodes };
};

export const updateFilter = (
  imr: IntermediateRepresentation,
  nodeId: number,
  filterIndexPath: number[],
  updatedFilter: any
): IntermediateRepresentation => {
  const nodes = imr.nodes.map((node) => {
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

  return { ...imr, nodes };
};
