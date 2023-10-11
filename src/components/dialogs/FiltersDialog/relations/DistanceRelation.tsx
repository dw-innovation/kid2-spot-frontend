import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import Select from "@/components/Select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStrings } from "@/lib/contexts/useStrings";
import useImrStore from "@/stores/useImrStore";
import { DistanceRelation } from "@/types/imr";

const DistanceRelation = ({
  edge: { source, target, distance },
  index,
}: {
  edge: DistanceRelation;
  index: number;
}) => {
  const {
    filtersDialogRelation,
    filtersDialogDistanceLabel,
    filtersDialogTypeDistance,
  } = useStrings();
  const sets = useImrStore((state) => state.imr.nodes);
  const removeRelation = useImrStore((state) => state.removeRelation);
  const setRelationValue = useImrStore((state) => state.setRelationValue);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="font-bold">
            {filtersDialogRelation()} {index}
          </span>
          <Badge className="h-6">{filtersDialogTypeDistance()}</Badge>
          <Button
            variant="ghost"
            className="h-8 p-1 aspect-square"
            onClick={() => removeRelation(index)}
          >
            <TrashIcon scale={3} />
          </Button>
        </div>
      </div>
      <div className="flex justify-between flex-1 w-full">
        <div className="flex items-center gap-2">
          <Select
            options={sets.map((set) =>
              set.type === "nwr"
                ? { label: set.name, value: set.id.toString() }
                : { label: "Cluster", value: set.id.toString() }
            )}
            value={source.toString()}
            onSelect={(value) =>
              setRelationValue(index, "source", parseInt(value))
            }
          />
          <Input
            value={distance}
            onChange={({ target: { value } }) =>
              setRelationValue(index, "distance", value)
            }
            className="min-w-[5rem]"
          />
          <span className="whitespace-nowrap">
            {filtersDialogDistanceLabel()}
          </span>
          <Select
            options={sets.map((set) =>
              set.type === "nwr"
                ? { label: set.name, value: set.id.toString() }
                : { label: "Cluster", value: set.id.toString() }
            )}
            value={target.toString()}
            onSelect={(value) =>
              setRelationValue(index, "tgt", parseInt(value))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DistanceRelation;
