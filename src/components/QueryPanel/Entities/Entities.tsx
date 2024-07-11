import React from "react";

import useSpotQueryStore from "@/stores/useSpotQueryStore";

import Entity from "./Entity";

const Entities = () => {
  const nodes = useSpotQueryStore((state) => state.spotQuery.nodes);

  return (
    <>
      {nodes && nodes.length > 0 && (
        <>
          <hr />
          <div>
            <h3 className="text-lg font-semibold ">Entities</h3>
            <div className="flex flex-wrap gap-1 ml-4">
              {nodes.map((node) => (
                <Entity key={node.name} name={node.name} id={node.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Entities;
