import { ChevronDownIcon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import { LogicFilter, LogicOperator } from "@/types/spotQuery";

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
  const removeRuleOrGroup = useSpotQueryStore(
    (state) => state.removeRuleOrGroup
  );
  const switchOperatorAtPath = useSpotQueryStore(
    (state) => state.switchOperatorAtPath
  );

  const handleSwitchOperator = (nodeId: number, pathString: string) =>
    switchOperatorAtPath(nodeId, pathString);

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
          onClick={() => handleSwitchOperator(nodeId, pathString)}
        >
          {logicOperator}
          <ChevronDownIcon />
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
          <AddBar path={path} nodeId={nodeId} pathString={pathString} />
        </div>
        {!isRoot(path) && (
          <Button
            onClick={() => handleRemove(nodeId, pathString)}
            variant={"outline"}
            className="flex items-center self-start ml-4"
            size="fit"
          >
            <TrashIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default LogicGroup;
