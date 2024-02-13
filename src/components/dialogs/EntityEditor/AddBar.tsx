import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import useImrStore from "@/stores/useImrStore";

import Connectors from "./Connectors";

type Props = {
  nodeId: number;
  path: number[];
};

const AddBar = ({ nodeId, path }: Props) => {
  const addRuleOrGroup = useImrStore((state) => state.addRuleOrGroup);

  const handleAddRuleOrGroup = (
    nodeId: number,
    path: number[],
    newObject: Object
  ) => {
    addRuleOrGroup(nodeId, path, newObject);
  };

  return (
    <div className="flex items-center connector-container">
      <Connectors />
      <div className="flex gap-2 ml-2">
        <Button
          onClick={() =>
            handleAddRuleOrGroup(nodeId, path, {
              key: "",
              operator: "=",
              value: "",
            })
          }
          variant="secondary"
          size="fit"
          className="bg-blue-100"
        >
          <PlusIcon /> rule
        </Button>
        {path.length < 2 && (
          <Button
            onClick={() => handleAddRuleOrGroup(nodeId, path, { and: [] })}
            variant="secondary"
            size="fit"
            className="bg-blue-100"
          >
            <PlusIcon /> group
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddBar;
