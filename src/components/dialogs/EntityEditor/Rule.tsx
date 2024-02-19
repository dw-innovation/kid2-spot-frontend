import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useImrStore from "@/stores/useImrStore";
import { Filter } from "@/types/imr";

import Connectors from "./Connectors";

type Props = {
  filter: Filter;
  nodeId: number;
  pathString: string;
};

const Rule = ({ filter, nodeId, pathString }: Props) => {
  const removeRuleOrGroup = useImrStore((state) => state.removeRuleOrGroup);
  const updateRuleValue = useImrStore((state) => state.updateRuleValue);

  const handleRemove = (nodeId: number, pathString: string) => {
    removeRuleOrGroup(nodeId, pathString);
  };

  const handleUpdate = (
    nodeId: number,
    pathString: string,
    keyToUpdate: string,
    newValue: string
  ) => {
    updateRuleValue(nodeId, pathString, keyToUpdate, newValue);
  };

  return (
    <div className="flex items-center gap-2 mb-2 connector-container">
      <Connectors />
      <div className="flex items-center gap-2 p-1 bg-white rounded-md">
        <Input
          value={filter.key}
          onChange={(e) => {
            handleUpdate(nodeId, pathString, "key", e.target.value);
          }}
        />
        <Input
          value={filter.operator}
          onChange={(e) => {
            handleUpdate(nodeId, pathString, "operator", e.target.value);
          }}
          className="w-6"
        />
        <Input
          value={filter.value}
          onChange={(e) => {
            handleUpdate(nodeId, pathString, "value", e.target.value);
          }}
        />
        <Button
          onClick={() => handleRemove(nodeId, pathString)}
          variant={"outline"}
          size="fit"
          className="flex justify-center"
        >
          <TrashIcon /> rule
        </Button>
      </div>
    </div>
  );
};

export default Rule;
