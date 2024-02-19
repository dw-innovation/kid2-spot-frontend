import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import Select from "@/components/Select";
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

const OPTIONS = [
  {
    value: "=",
    label: "=",
  },
  {
    value: ">",
    label: ">",
  },
  {
    value: "<",
    label: "<",
  },
  {
    value: "~",
    label: "~",
  },
];

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
        <Select
          value={filter.operator}
          options={OPTIONS}
          onSelect={(value) =>
            handleUpdate(nodeId, pathString, "operator", value)
          }
          className="w-10"
          showIndicator={false}
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
