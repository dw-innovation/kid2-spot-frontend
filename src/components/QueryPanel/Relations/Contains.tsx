import React from "react";

import { findNameById } from "@/lib/utils";
import useImrStore from "@/stores/useImrStore";
import { ContainsRelation } from "@/types/imr";

type Props = {
  edge: ContainsRelation;
};

const Contains = ({ edge }: Props) => {
  const nodes = useImrStore((state) => state.imr.nodes);

  return (
    <div>
      <span className="font-bold capitalize">
        {findNameById(edge.source, nodes)}
      </span>{" "}
      contains{" "}
      <span className="font-bold capitalize">
        {findNameById(edge.target, nodes)}
      </span>
    </div>
  );
};

export default Contains;
