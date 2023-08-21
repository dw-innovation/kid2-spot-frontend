import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import { Button } from "@/components/ui/button";
import { Filter, Node } from "@/types/imr";

import NWRFilter from "./NWRFilter";

const Set = ({ node }: { node: Node }) => {
  return (
    <>
      <span className="font-bold">Set {node.id}</span>{" "}
      <div className="flex flex-col gap-2 ml-8 font-normal">
        {node.t === "nwr" && (
          <>
            <ol className="flex items-start list-decimal">
              {node.flts.map((filter: Filter, index: number) => (
                <li key={index} className="flex items-start justify-start">
                  <NWRFilter filter={filter} filterId={index} setId={node.id} />
                </li>
              ))}
            </ol>
            <span>
              <Button variant={"outline"} className="p-1">
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
