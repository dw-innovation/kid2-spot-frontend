import React, { Fragment } from "react";

import useImrStore from "@/stores/useImrStore";
import { Edge } from "@/types/imr";

import Relation from "./Relation";

const Relations = () => {
  const imr = useImrStore((state) => state.imr);

  return (
    <div className="flex flex-col gap-4">
      {imr &&
        imr.es &&
        imr.es.map((edge: Edge) => (
          <Fragment key={`${edge.id}${edge.t}`}>
            {edge.t === "dist" && <Relation edge={edge} />}
          </Fragment>
        ))}
    </div>
  );
};

export default Relations;
