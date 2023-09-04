import L from "leaflet";
import React, { useEffect, useRef } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { FILL_COLORS } from "@/lib/const";
import useResultsStore from "@/stores/useResultsStore";

const Legend = () => {
  const sets = useResultsStore((state) => state.sets);
  const toggleVisible = useResultsStore((state) => state.toggleVisible);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;
    L.DomEvent.disableClickPropagation(divRef.current);
    L.DomEvent.disableScrollPropagation(divRef.current);
  });

  const renderSets = () =>
    sets.map((set, index) => {
      return (
        <div
          className="flex items-center space-x-2"
          key={`${set.name}${index}`}
        >
          <Checkbox
            onCheckedChange={() => toggleVisible(set.id)}
            checked={set.visible}
            id={index.toString()}
          />
          <label
            htmlFor={index.toString()}
            className="flex items-center justify-center gap-1 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div
              className="w-3 h-3"
              style={{
                backgroundColor: FILL_COLORS[index],
              }}
            />
            {set.name}
          </label>
        </div>
      );
    });

  return (
    <>
      {sets.length > 0 && (
        <div
          ref={divRef}
          className="shadow-lg cursor-default z-[10000] absolute bottom-0 left-0 bg-white m-2 rounded-md flex p-2 flex-col gap-1"
        >
          <h4 className="text-lg font-semibold tracking-tight uppercase scroll-m-20">
            Map Legend
          </h4>
          <div className="flex flex-col gap-1">{renderSets()}</div>
        </div>
      )}
    </>
  );
};

export default Legend;
