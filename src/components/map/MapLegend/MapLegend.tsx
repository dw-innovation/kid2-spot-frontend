import React, { useRef } from "react";

import useStrings from "@/lib/contexts/useStrings";
import useDisableMapInteraction from "@/stores/useDisableMapInteraction";
import useResultsStore from "@/stores/useResultsStore";

import LegendItem from "./LegendItem";
import SearchAreaLegend from "./SearchAreaLegend";

const Legend = () => {
  const { mapLegendTitle } = useStrings();
  const divRef = useRef<HTMLDivElement>(null);
  const sets = useResultsStore((state) => state.sets);
  const searchArea = useResultsStore((state) => state.searchArea);

  useDisableMapInteraction(divRef);

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
