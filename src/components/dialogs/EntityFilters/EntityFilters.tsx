import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import { getOSMValueOptions } from "@/lib/apiServices";
import { ALLOWED_TAGS } from "@/lib/const/allowedTags";
import useImrStore from "@/stores/useImrStore";
import { Filter, FilterNode, LogicFilter, LogicOperator } from "@/types/imr";

import Dialog from "../Dialog";

const DIALOG_NAME = "entityFilters";

const EntityFilters = () => {
  const filters = useImrStore((state) => state.imr.nodes[0].filters);
  const updateFilter = useImrStore((state) => state.updateFilter);
  const addFilter = useImrStore((state) => state.addFilter);
  const deleteFilter = useImrStore((state) => state.deleteFilter);
  const addLogicFilter = useImrStore((state) => state.addLogicFilter);

  const [osmValueOptions, setOsmValueOptions] = useState<
    Record<string, { label: string; value: string }[]>
  >({});

  useEffect(() => {
    const fetchOptionsForFilters = async (filters: FilterNode[]) => {
      for (const filter of filters) {
        if (isLogicFilter(filter)) {
          const logicOperator: LogicOperator = filter.and ? "and" : "or";
          await fetchOptionsForFilters(filter[logicOperator]!);
        } else {
          const options = await getOSMValueOptions(filter.key);
          setOsmValueOptions((prevOptions) => ({
            ...prevOptions,
            [filter.key]: options as unknown as {
              label: string;
              value: string;
            }[],
          }));
        }
      }
    };

    fetchOptionsForFilters(filters);
  }, [filters]);

  const isLogicFilter = (filter: FilterNode): filter is LogicFilter => {
    return "and" in filter || "or" in filter;
  };

  const handleAddFilter = (filterIndexPath: number[]) => {
    const newFilter: Filter = {
      key: "newKey",
      value: "newValue",
      operator: "=",
    };
    addFilter(0, filterIndexPath, newFilter);
  };

  const handleDeleteFilter = (filterIndexPath: number[]) => {
    deleteFilter(0, filterIndexPath);
  };

  const handleAddLogicFilter = (
    filterIndexPath: number[],
    logicType: LogicOperator
  ) => {
    addLogicFilter(0, filterIndexPath, logicType);
  };

  const renderFilters = (
    filters: FilterNode[],
    filterIndexPath: number[] = []
  ) => (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <Button
          onClick={() => handleAddFilter(filterIndexPath)}
          className="w-fit"
          variant={"secondary"}
          size={"sm"}
        >
          <PlusIcon />
          Add Filter
        </Button>
        <Button
          onClick={() => handleAddLogicFilter(filterIndexPath, "and")}
          className="w-fit"
          variant={"secondary"}
          size={"sm"}
        >
          <PlusIcon />
          Add AND Filter
        </Button>
        <Button
          onClick={() => handleAddLogicFilter(filterIndexPath, "or")}
          className="w-fit"
          variant={"secondary"}
          size={"sm"}
        >
          <PlusIcon />
          Add OR Filter
        </Button>
      </div>
      {filters.map((filter, index) => {
        const currentFilterIndexPath = [...filterIndexPath, index];
        if (isLogicFilter(filter)) {
          const logicOperator: LogicOperator = filter.and ? "and" : "or";
          return (
            <div key={index} className="pl-2 border-l-2 border-secondary">
              <strong className="uppercase">{logicOperator}</strong>
              <div className="ml-4">
                {renderFilters(filter[logicOperator]!, currentFilterIndexPath)}
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex gap-1">
              <Select
                value={filter.key}
                className="w-36 z-[100000]"
                onSelect={(value) =>
                  updateFilter(0, currentFilterIndexPath, {
                    ...filter,
                    key: value,
                  })
                }
                options={ALLOWED_TAGS}
              />
              <Select
                value={filter.operator}
                className="w-36"
                onSelect={(value) =>
                  updateFilter(0, currentFilterIndexPath, {
                    ...filter,
                    operator: value as "=" | "<" | ">" | "~",
                  })
                }
                options={[
                  { label: "=", value: "=" },
                  { label: "<", value: "<" },
                  { label: ">", value: ">" },
                  { label: "~", value: "~" },
                ]}
              />

              <Select
                value={filter.value}
                className="w-36"
                onSelect={(value) =>
                  updateFilter(0, currentFilterIndexPath, {
                    ...filter,
                    value: value,
                  })
                }
                options={
                  (osmValueOptions[filter.key] as {
                    label: string;
                    value: string;
                  }[]) || []
                }
              />

              <Button
                onClick={() => handleDeleteFilter(filterIndexPath)}
                variant={"secondary"}
                className="w-fit"
                size={"sm"}
              >
                <TrashIcon />
              </Button>
            </div>
          );
        }
      })}
    </div>
  );

  return (
    <Dialog dialogName={DIALOG_NAME} className="sm:max-w-[40rem] w-fit">
      {renderFilters(filters)}
    </Dialog>
  );
};

export default EntityFilters;
