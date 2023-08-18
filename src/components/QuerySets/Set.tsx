import React from "react";
import { Node } from "src/types/imr";

import SetFilter from "./SetFilter";

const Set = ({ node }: { node: Node }) => {
  return (
    <span className="font-bold">
      Set {node.id}
      <div className="ml-3">
        {node.t === "nwr" &&
          node.flts.map((filter) => (
            <SetFilter key={filter.n} filter={filter} />
          ))}
      </div>
    </span>
  );
};

export default Set;
