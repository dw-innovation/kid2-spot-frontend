import React, { useEffect } from "react";

import Select from "@/components/Select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useImrStore from "@/stores/useImrStore";
import { Filter } from "@/types/imr";

type Props = {
  filter: Filter;
  setId: number;
  filterId: number;
};

const OPERATORS = [
  { value: "=", label: "equals" },
  { value: ">", label: "greater than" },
  { value: "~", label: "contains" },
];

const NWRFilter = ({ filter, setId, filterId }: Props) => {
  const setFilterValue = useImrStore((state) => state.setFilterValue);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFilterValue(setId, filterId, key, e.target.value);
  };

  useEffect(() => {
    setFilterValue(setId, filterId, "name", `${filter.key}_${filter.value}`);
  }, [filter, filterId, setFilterValue, setId]);

  return (
    <div className="flex gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Input
              value={filter.key}
              className="flex-1 h-8"
              onChange={(e) => handleInputChange(e, "key")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>OSM Key</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Select
              options={OPERATORS}
              onSelect={(e) => setFilterValue(setId, filterId, "operator", e)}
              value={filter.operator}
              className="h-8 text-sm"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Operator</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Input
              value={filter.value}
              className="flex-1 h-8"
              onChange={(e) => handleInputChange(e, "value")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>OSM value</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NWRFilter;
