import React from "react";

import useSpotQueryStore from "@/stores/useSpotQueryStore";

import Contains from "./Relations/Contains";
import Distance from "./Relations/Distance";

const Relations = () => {
  const edges = useSpotQueryStore((state) => state.spotQuery.edges);

  return (
    <>
      {edges && edges.length > 0 && (
        <>
          <hr />
          <div>
            <h3 className="text-lg font-semibold">
              Relations between entities
            </h3>
            <ol className="ml-6 list-decimal">
              {edges &&
                edges.map((edge, index) => (
                  <li key={index}>
                    {edge.type === "dist" && (
                      <Distance edge={edge} index={index} />
                    )}
                    {edge.type === "contains" && <Contains edge={edge} />}
                  </li>
                ))}
            </ol>
          </div>
        </>
      )}
    </>
  );
};

export default Relations;
