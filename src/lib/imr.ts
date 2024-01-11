import { FilterNode, LogicFilter, LogicOperator } from "@/types/imr";

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
