import React from "react";

import { Slider } from "@/components/ui/slider";
import { distanceToMeters } from "@/lib/utils";
import useImrStore from "@/stores/useImrStore";

const Relations = () => {
  const edges = useImrStore((state) => state.imr.es);
  const nodes = useImrStore((state) => state.imr.ns);
  const setRelationValue = useImrStore((state) => state.setRelationValue);

  const findNameById = (id: number) => {
    const node = nodes.find((node) => node.id === id);
    return node ? node.n : "";
  };

  return (
    <div>
      <h3 className="text-lg font-semibold ">Relations between entities</h3>
      <div className="ml-4">
        {edges &&
          edges.map((edge, index) => (
            <div key={index}>
              {edge.t === "dist" && (
                <>
                  <div>
                    <span className="capitalize">{findNameById(edge.src)}</span>{" "}
                    to{" "}
                    <span className="capitalize">{findNameById(edge.tgt)}</span>
                    : {edge.dist}
                  </div>
                  <Slider
                    max={500}
                    min={1}
                    step={1}
                    value={[distanceToMeters(edge.dist)]}
                    className="my-2"
                    onValueChange={(value) =>
                      setRelationValue(index, "dist", `${value[0]}m`)
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
