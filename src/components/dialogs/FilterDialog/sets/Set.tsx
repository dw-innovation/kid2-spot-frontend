import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import useImrStore from "@/stores/useImrStore";
import { Filter, Node } from "@/types/imr";

import NWRFilter from "./NWRFilter";

const Set = ({ node }: { node: Node }) => {
  const addFilter = useImrStore((state) => state.addFilter);
  const removeFilter = useImrStore((state) => state.removeFilter);
  return (
    <>
      <span className="font-bold">Set {node.id}</span>{" "}
      <div className="flex flex-col gap-2 ml-8 font-normal">
        {node.t === "nwr" && (
          <>
            <ol className="flex flex-col items-start gap-1 list-decimal">
              {node.flts.map((filter: Filter, index: number) => (
                <li
                  key={index}
                  className="flex items-start justify-between w-full"
                >
                  <NWRFilter filter={filter} filterId={index} setId={node.id} />
                  <Button
                    variant={"ghost"}
                    className="p-1 aspect-square"
                    onClick={() => removeFilter(node.id, index)}
                  >
                    <TrashIcon scale={3} />
                  </Button>
                </li>
              ))}
            </ol>
            <span>
              <Button
                variant={"outline"}
                className="p-1"
                onClick={() => addFilter(node.id)}
              >
                <PlusIcon /> add filter
              </Button>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Set;
