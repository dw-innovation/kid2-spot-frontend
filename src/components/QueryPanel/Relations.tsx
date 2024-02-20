import React from "react";

import { Slider } from "@/components/ui/slider";
import { distanceToMeters, expSlider, logSlider } from "@/lib/utils";
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
    <>
      {edges && edges.length > 0 && (
        <>
          <hr />
          <div>
            <h3 className="text-lg font-semibold">
              Relations between entities
            </h3>
            <div className="ml-4">
              {edges &&
                edges.map((edge, index) => (
                  <div key={index}>
                    {edge.type === "dist" && (
                      <>
                        <div>
                          <span className="capitalize">
                            {findNameById(edge.source)}
                          </span>{" "}
                          to{" "}
                          <span className="capitalize">
                            {findNameById(edge.target)}
                          </span>
                          : <strong>{edge.distance}</strong>
                        </div>
                        <Slider
                          max={2000}
                          min={10}
                          step={1}
                          value={[
                            logSlider(
                              distanceToMeters(edge.distance),
                              10,
                              2000,
                              0.8
                            ),
                          ]}
                          className="my-2"
                          onValueChange={(value) => {
                            setRelationValue(
                              index,
                              "distance",
                              `${expSlider(value[0], 10, 2000, 0.8)}m`
                            );
                          }}
                        />
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Relations;
