import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useImrStore from "@/stores/useImrStore";
import { Cluster, Filter, NWR } from "@/types/imr";

import NWRFilter from "./NWRFilter";

const Set = ({ node }: { node: NWR | Cluster }) => {
  const addFilter = useImrStore((state) => state.addFilter);
  const removeFilter = useImrStore((state) => state.removeFilter);
  const setSetName = useImrStore((state) => state.setSetName);

  useEffect(() => {
    setSetName(node.id, `${node.flts[0].k}_${node.flts[0].v}`);
  }, [node.flts, node.id, setSetName]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1">
        <div className="flex gap-2">
          <span className="font-bold">
            Set {node.id}: {node.n}
          </span>
          <Badge>{node.t === "nwr" ? "NWR" : "Cluster"}</Badge>
        </div>
        <Button
          variant={"outline"}
          className="h-8 p-1"
          onClick={() => addFilter(node.id)}
        >
          <PlusIcon /> add filter
        </Button>
      </div>
      <div className="flex flex-col gap-1 ml-8 font-normal">
        {node.t === "nwr" && (
          <>
            <ol className="list-decimal ">
              {node.flts.map((filter: Filter, index: number) => (
                <li key={index} className="w-full">
                  <div className="flex justify-between gap-2">
                    <NWRFilter
                      filter={filter}
                      filterId={index}
                      setId={node.id}
                    />
                    <Button
                      variant={"ghost"}
                      className="p-1 aspect-square"
                      onClick={() => removeFilter(node.id, index)}
                    >
                      <TrashIcon scale={3} />
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
};

export default Set;
