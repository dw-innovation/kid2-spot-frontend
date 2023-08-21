import React, { Fragment } from "react";

import useImrStore from "@/stores/useImrStore";
import { Node } from "@/types/imr";

import Set from "./Set";

const Sets = () => {
  const imr = useImrStore((state) => state.imr);

  return (
    <div className="flex flex-col gap-4">
      {imr &&
        imr.ns &&
        imr.ns.map((node: Node) => (
          <Fragment key={`${node.id}${node.t}`}>
            {(node.t === "nwr" || node.t === "cluster") && <Set node={node} />}
          </Fragment>
        ))}
    </div>
  );
};

export default Sets;
