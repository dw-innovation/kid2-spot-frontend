import React, { Fragment } from "react";
import { Node } from "src/types/imr";

import useQueryStore from "@/stores/useQueryStore";

import Relations from "./Relations";
import Set from "./Set";

const QuerySets = () => {
  const parsedImr = useQueryStore((state) => state.parsedImr);

  return (
    <div className="flex-col gap-2">
      {parsedImr &&
        parsedImr.ns &&
        parsedImr.ns.map((node: Node) => (
          <Fragment key={node.id}>
            <Set node={node} />
          </Fragment>
        ))}
      <Relations />
    </div>
  );
};

export default QuerySets;
