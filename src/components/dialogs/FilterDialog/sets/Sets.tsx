import { PlusIcon } from "@radix-ui/react-icons";
import React, { Fragment } from "react";

import { Button } from "@/components/ui/button";
import useImrStore from "@/stores/useImrStore";
import { Node } from "@/types/imr";

import Set from "./Set";

const Sets = () => {
  const imr = useImrStore((state) => state.imr);
  const addNWRNode = useImrStore((state) => state.addNWRNode);
  const addClusterNode = useImrStore((state) => state.addClusterNode);

  return (
    <fieldset className="flex flex-col gap-4 border-[1px] p-2">
      <legend className="flex items-center gap-2 px-2 font-bold">
        Sets
        <Button
          variant={"outline"}
          className="h-8 p-1"
          onClick={() => addNWRNode()}
        >
          <PlusIcon /> add NWR set
        </Button>
        <Button
          variant={"outline"}
          className="h-8 p-1"
          onClick={() => addClusterNode()}
        >
          <PlusIcon /> add cluster set
        </Button>
      </legend>
      {imr &&
        imr.ns &&
        imr.ns.map((node: Node) => (
          <Fragment key={`${node.id}${node.t}`}>
            {(node.t === "nwr" || node.t === "cluster") && <Set node={node} />}
          </Fragment>
        ))}
    </fieldset>
  );
};

export default Sets;
