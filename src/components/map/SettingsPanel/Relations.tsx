import React from "react";

import { Slider } from "@/components/ui/slider";
import { distanceToMeters } from "@/lib/utils";
import useImrStore from "@/stores/useImrStore";

const Relations = () => {
  const edges = useImrStore((state) => state.imr.edges);
  const nodes = useImrStore((state) => state.imr.nodes);
  const setRelationValue = useImrStore((state) => state.setRelationValue);

  const findNameById = (id: number) => {
    const node = nodes.find((node) => node.id === id);
    return node ? node.name : "";
  };

  return (
    <div>
      <h3 className="text-lg font-semibold ">Relations between entities</h3>
      <div className="ml-4">
        {edges &&
          edges.map((edge, index) => (
            <div key={index}>
              {edge.type === "distance" && (
                <>
                  <div>
                    <span className="capitalize">
                      {findNameById(edge.source)}
                    </span>{" "}
                    to{" "}
                    <span className="capitalize">
                      {findNameById(edge.target)}
                    </span>
                    : {edge.distance}
                  </div>
                  <Slider
                    max={500}
                    min={1}
                    step={1}
                    value={[distanceToMeters(edge.distance)]}
                    className="my-2"
                    onValueChange={(value) =>
                      setRelationValue(index, "distance", `${value[0]}m`)
                    }
                  />
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Relations;
