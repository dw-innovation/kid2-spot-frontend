import { Label } from "@radix-ui/react-dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ALLOWED_TAGS } from "@/lib/const/allowedTags";
import useTagInfo from "@/lib/hooks/useTagInfo";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import { Filter } from "@/types/spotQuery";

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
  const removeRuleOrGroup = useSpotQueryStore(
    (state) => state.removeRuleOrGroup
  );
  const updateRuleValue = useSpotQueryStore((state) => state.updateRuleValue);

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

  const { data: allowedValues } = useTagInfo({
    key: filter.key,
    isEnabled: filter.key !== "",
  });

  return (
    <div className="flex items-center gap-2 mb-2 connector-container">
      <Connectors />
      <div className="flex items-center gap-2 p-1 bg-white rounded-md">
        <div className="flex items-end gap-2">
          <div className="flex flex-col justify">
            <Label className="text-xs font-semibold">OSM key</Label>
            <Select
              value={filter.key}
              options={ALLOWED_TAGS}
              onSelect={(value) =>
                handleUpdate(nodeId, pathString, "key", value)
              }
              className="w-24"
            />
          </div>

          <Select
            value={filter.operator}
            options={OPTIONS}
            onSelect={(value) =>
              handleUpdate(nodeId, pathString, "operator", value)
            }
            className="w-6"
            showIndicator={false}
          />
          <div>
            <Label className="text-xs font-semibold">OSM value</Label>
            {allowedValues && allowedValues.length > 0 ? (
              <Select
                value={filter.value}
                options={allowedValues || []}
                onSelect={(value) =>
                  handleUpdate(nodeId, pathString, "value", value)
                }
                className="w-fit"
              />
            ) : (
              <Input
                value={filter.value}
                onChange={(e) => {
                  handleUpdate(nodeId, pathString, "value", e.target.value);
                }}
                className="w-24"
              />
            )}
          </div>
        </div>

        <Button
          onClick={() => handleRemove(nodeId, pathString)}
          variant={"outline"}
          size="fit"
          className="flex justify-center"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default Rule;
