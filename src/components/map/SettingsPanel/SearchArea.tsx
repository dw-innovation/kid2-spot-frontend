import React from "react";

import { Button } from "@/components/ui/button";
import { useStrings } from "@/lib/contexts/useStrings";
import useImrStore from "@/stores/useImrStore";

const SearchArea = () => {
  const searchAreaType = useImrStore((state) => state.imr.a.t);

  const { settingsMenuCustomArea, settingsMenuSearchBbox } = useStrings();

  const SEARCH_AREAS = [
    { label: settingsMenuSearchBbox(), value: "bbox" },
    { label: settingsMenuCustomArea(), value: "area" },
  ];
  return (
    <div>
      <h3 className="text-lg font-semibold ">Location</h3>
      <div className="flex gap-2">
        {SEARCH_AREAS.map(({ label, value }) => (
          <Button
            key={label}
            variant={searchAreaType === value ? "secondary" : "outline"}
            size={"sm"}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchArea;
