import { SymbolIcon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useImrStore from "@/stores/useImrStore";
import { LogicFilter, LogicOperator } from "@/types/imr";

import AddBar from "./AddBar";
import Connectors from "./Connectors";
import FilterTypeSwitch from "./FilterTypeSwitch";

type Props = {
  filterNode: LogicFilter;
  path: number[];
  nodeId: number;
  pathString: string;
};

const LogicGroup = ({ filterNode, path, nodeId, pathString }: Props) => {
  const logicOperator = Object.keys(filterNode)[0] as LogicOperator;
  const groupElements = filterNode[logicOperator];
  const removeRuleOrGroup = useImrStore((state) => state.removeRuleOrGroup);
  const switchKeyAtPath = useImrStore((state) => state.switchKeyAtPath);

  const handleSwitchOperator = (nodeId: number, path: number[]) => {
    switchKeyAtPath(nodeId, path);
  };

  const isRoot = (path: number[]) => path.length === 1;

  const handleRemove = (nodeId: number, pathString: string) => {
    removeRuleOrGroup(nodeId, pathString);
  };

  return (
    <div
      className={cn(
        "flex items-center bg-opacity-20 h-full pb-2",
        !isRoot(path) && "connector-container"
      )}
    >
      <Connectors />
      <div
        className={cn(
          "flex items-center p-2",
          !isRoot(path) && "bg-slate-200 rounded-md filter-link shadow-md"
        )}
      >
        <Button
          className="font-bold uppercase"
          onClick={() => handleSwitchOperator(nodeId, path)}
        >
          {logicOperator}
          <SymbolIcon />
        </Button>
        <div className="flex items-center h-full" />
        <div className="flex flex-col ml-2 ">
          {groupElements &&
            groupElements.map((filter, index) => (
              <FilterTypeSwitch
                key={index}
                filter={filter}
                path={[...path, index]}
                pathString={pathString}
                nodeId={nodeId}
              />
            ))}
          <AddBar path={path} nodeId={nodeId} />
        </div>
        {!isRoot(path) && (
          <Button
            onClick={() => handleRemove(nodeId, pathString)}
            variant={"outline"}
            className="flex items-center self-start ml-4"
            size="fit"
          >
            <TrashIcon /> group
          </Button>
        )}
      </div>
    </div>
  );
};

export default LogicGroup;
