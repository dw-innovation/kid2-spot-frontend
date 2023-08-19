import React, { Fragment } from "react";

import useImrStore from "@/stores/useImrStore";
import { Node } from "@/types/imr";

import Relations from "./Relations";
import Set from "./Set";

const QuerySets = () => {
  const imr = useImrStore((state) => state.imr);

  return (
    <div className="flex-col gap-2">
      {imr &&
        imr.ns &&
        imr.ns.map((node: Node) => (
          <Fragment key={node.id}>
            <Set node={node} />
          </Fragment>
        ))}
      <Relations />
    </div>
  );
};

export default QuerySets;
