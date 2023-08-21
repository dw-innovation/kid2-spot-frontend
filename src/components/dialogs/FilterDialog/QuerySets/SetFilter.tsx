import React from "react";

import { Filter } from "@/types/imr";

type Props = {
  filter: Filter;
};

const SetFilter = ({ filter }: Props) => {
  return (
    <span className="block font-normal">
      {filter.k} {filter.op} {filter.v}
    </span>
  );
};

export default SetFilter;
