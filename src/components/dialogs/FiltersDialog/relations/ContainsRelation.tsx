import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import Select from "@/components/Select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStrings } from "@/lib/contexts/useStrings";
import useImrStore from "@/stores/useImrStore";
import { ContainsRelation } from "@/types/imr";

const ContainsRelation = ({
  edge: { id, src, tgt },
}: {
  edge: ContainsRelation;
}) => {
  const {
    filtersDialogRelation,
    filtersDialogContainsLabel,
    filtersDialogTypeContains,
  } = useStrings();
  const sets = useImrStore((state) => state.imr.ns);
  const removeRelation = useImrStore((state) => state.removeRelation);
  const setRelationValue = useImrStore((state) => state.setRelationValue);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="font-bold">
            {filtersDialogRelation()} {id}
          </span>
          <Badge>{filtersDialogTypeContains()}</Badge>
          <Button
            variant="ghost"
            className="p-1 aspect-square"
            onClick={() => removeRelation(id)}
          >
            <TrashIcon scale={3} />
          </Button>
        </div>
      </div>
      <div className="flex justify-between flex-1 w-full">
        <div className="flex items-center gap-2">
          <Select
            options={sets.map((set) =>
              set.t === "nwr"
                ? { label: set.n, value: set.id.toString() }
                : { label: "Cluster", value: set.id.toString() }
            )}
            value={src.toString()}
            onSelect={(value) => setRelationValue(id, "src", parseInt(value))}
          />
          {filtersDialogContainsLabel()}
          <Select
            options={sets.map((set) =>
              set.t === "nwr"
                ? { label: set.n, value: set.id.toString() }
                : { label: "Cluster", value: set.id.toString() }
            )}
            value={tgt.toString()}
            onSelect={(value) => setRelationValue(id, "tgt", parseInt(value))}
          />
        </div>
      </div>
    </div>
  );
};

export default ContainsRelation;
