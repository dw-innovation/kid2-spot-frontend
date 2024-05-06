import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import useResultsStore from "@/stores/useResultsStore";

const SearchAreaLegend = () => {
  const toggleSearchArea = useResultsStore((state) => state.toggleSearchArea);
  const showSearchArea = useResultsStore((state) => state.showSearchArea);
  const toggleHighlightSearchArea = useResultsStore(
    (state) => state.toggleHighlightSearchArea
  );

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={() => toggleSearchArea()}
        checked={showSearchArea}
        id={"searchAreaLegend"}
      />
      <label
        htmlFor={"searchAreaLegend"}
        onMouseOver={() => toggleHighlightSearchArea(true)}
        onMouseOut={() => toggleHighlightSearchArea(false)}
        className="flex items-center justify-center gap-1 text-sm leading-none capitalize select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: "#34c3eb",
          }}
        />
        Search Area
      </label>
    </div>
  );
};

export default SearchAreaLegend;
