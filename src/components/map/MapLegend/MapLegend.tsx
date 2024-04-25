import L from "leaflet";
import React, { useEffect, useRef } from "react";

import useStrings from "@/lib/contexts/useStrings";
import useResultsStore from "@/stores/useResultsStore";

import LegendItem from "./LegendItem";
import SearchAreaLegend from "./SearchAreaLegend";

const Legend = () => {
  const { mapLegendTitle } = useStrings();
  const divRef = useRef<HTMLDivElement>(null);
  const sets = useResultsStore((state) => state.sets);
  const searchArea = useResultsStore((state) => state.searchArea);

  useEffect(() => {
    if (!divRef.current) return;
    L.DomEvent.disableClickPropagation(divRef.current);
    L.DomEvent.disableScrollPropagation(divRef.current);
  });

  return (
    <>
      {sets.length > 0 && (
        <div
          ref={divRef}
          className="flex flex-col gap-1 p-2 bg-white rounded-md shadow-lg cursor-default"
        >
          <h4 className="text-lg font-semibold tracking-tight scroll-m-20">
            {mapLegendTitle()}
          </h4>
          <div className="flex flex-col gap-1">
            {searchArea && <SearchAreaLegend />}

            {sets.map((set, index) => (
              <LegendItem set={set} index={index} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Legend;
