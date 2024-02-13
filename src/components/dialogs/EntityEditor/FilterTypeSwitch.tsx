import React from "react";

import { FilterNode, LogicFilter } from "@/types/imr";

import LogicGroup from "./LogicGroup";
import Rule from "./Rule";

type Props = {
  filter: FilterNode;
  path: number[];
  nodeId: number;
};

const FilterTypeSwitch = ({ filter, path, nodeId }: Props) => {
  const isLogicFilter = (filter: FilterNode): filter is LogicFilter => {
    return "and" in filter || "or" in filter;
  };

  return (
    <>
      {isLogicFilter(filter) ? (
        <LogicGroup filterNode={filter} path={path} nodeId={nodeId} />
      ) : (
        <Rule filter={filter} path={path} nodeId={nodeId} />
      )}
    </>
  );
};

export default FilterTypeSwitch;
