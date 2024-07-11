import React from "react";

import { findNameById } from "@/lib/utils";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import { ContainsRelation } from "@/types/spotQuery";

type Props = {
  edge: ContainsRelation;
};

const Contains = ({ edge }: Props) => {
  const nodes = useSpotQueryStore((state) => state.spotQuery.nodes);

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
