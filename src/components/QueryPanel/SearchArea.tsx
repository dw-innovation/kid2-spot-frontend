import React from "react";

import useSpotQueryStore from "@/stores/useSpotQueryStore";

const SearchArea = () => {
  const currentSearchArea = useSpotQueryStore((state) => state.spotQuery.area);

  return (
    <>
      {currentSearchArea.type && (
        <div>
          <h3 className="text-lg font-semibold ">Location</h3>
          <div className="flex gap-2 ml-4">
            {currentSearchArea.type === "area" && currentSearchArea.value}
            {currentSearchArea.type === "bbox" && "Current Map View"}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchArea;
