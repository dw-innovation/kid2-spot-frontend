import { Slider } from "@radix-ui/react-slider";
import { debounce } from "lodash";
import React, { useCallback } from "react";

import {
  distanceToMeters,
  expSlider,
  findNameById,
  logSlider,
  trackAction,
} from "@/lib/utils";
import useImrStore from "@/stores/useImrStore";
import { DistanceRelation } from "@/types/imr";

type Props = {
  edge: DistanceRelation;
  index: number;
};

const Distance = ({ edge, index }: Props) => {
  const nodes = useImrStore((state) => state.imr.nodes);
  const setRelationValue = useImrStore((state) => state.setRelationValue);

  const handleValueChange = useCallback(
    (index: number, value: number[], source: string, target: string) => {
      debounce((index, value, source, target) => {
        let newValue = `${expSlider(value[0], 10, 2000, 0.8)}m`;
        setRelationValue(index, "distance", newValue);

        trackAction(
          "relations",
          "changeDistance",
          `${source} to ${target}: ${newValue}`
        );
      }, 500)(index, value, source, target);
    },
    [setRelationValue]
  );

  return (
    <>
      <div>
        <span className="font-bold capitalize">
          {findNameById(edge.source, nodes)}
        </span>{" "}
        to{" "}
        <span className="font-bold capitalize">
          {findNameById(edge.target, nodes)}
        </span>
        : <strong>{edge.distance}</strong>
      </div>
      <Slider
        max={2000}
        min={10}
        step={1}
        value={[logSlider(distanceToMeters(edge.distance), 10, 2000, 0.8)]}
        className="my-2"
        onValueChange={(value) => {
          const source = findNameById(edge.source, nodes);
          const target = findNameById(edge.target, nodes);
          handleValueChange(index, value, source, target);
        }}
      />
    </>
  );
};

export default Distance;
