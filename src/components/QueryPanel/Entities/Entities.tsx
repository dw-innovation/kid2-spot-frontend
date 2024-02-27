import React from "react";

import useImrStore from "@/stores/useImrStore";

import Entity from "./Entity";

const Entities = () => {
  const nodes = useImrStore((state) => state.imr.nodes);

  return (
    <>
      {nodes && nodes.length > 0 && (
        <>
          {" "}
          <hr />
          <div>
            <h3 className="text-lg font-semibold ">Entities</h3>
            <div className="flex gap-1 ml-4">
              {nodes.map((node) => (
                <Entity key={node.name} name={node.display_name} id={node.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Entities;
