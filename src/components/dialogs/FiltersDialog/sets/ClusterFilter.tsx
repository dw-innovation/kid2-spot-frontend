import React, { useEffect } from "react";

import Select from "@/components/Select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStrings } from "@/lib/contexts/useStrings";
import useImrStore from "@/stores/useImrStore";
import { Filter } from "@/types/imr";

type Props = {
  filter: Filter;
  setId: number;
  filterId: number;
};

const ClusterFilter = ({ filter, setId, filterId }: Props) => {
  const {
    filtersDialogOperatorEquals,
    filtersDialogOperatorGreater,
    filtersDialogOperatorContains,
    filtersDialogTooltipOperator,
    filtersDialogTooltipValue,
    filtersDialogTooltipKey,
  } = useStrings();

  const OPERATORS = [
    { value: "=", label: filtersDialogOperatorEquals() },
    { value: ">", label: filtersDialogOperatorGreater() },
    { value: "~", label: filtersDialogOperatorContains() },
  ];
  const setFilterValue = useImrStore((state) => state.setFilterValue);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFilterValue(setId, filterId, key, e.target.value);
  };

  useEffect(() => {
    setFilterValue(setId, filterId, "n", `${filter.k}_${filter.v}`);
  }, [filter, filterId, setFilterValue, setId]);

  return (
    <div className="flex gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Input
              value={filter.k}
              className="flex-1 h-8"
              onChange={(e) => handleInputChange(e, "k")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{filtersDialogTooltipKey()}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Select
              options={OPERATORS}
              onSelect={(e) => setFilterValue(setId, filterId, "op", e)}
              value={filter.op}
              className="h-8"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{filtersDialogTooltipOperator()}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Input
              value={filter.v}
              className="flex-1 h-8"
              onChange={(e) => handleInputChange(e, "v")}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{filtersDialogTooltipValue()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ClusterFilter;
