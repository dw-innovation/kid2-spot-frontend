import React from "react";

import useSpotQueryStore from "@/stores/useSpotQueryStore";

const SearchArea = () => {
  const currentSearchArea = useSpotQueryStore(
    (state) => state.spotQuery.area.value
  );
  const searchAreaType = useSpotQueryStore(
    (state) => state.spotQuery.area.type
  );

  return (
    <>
      {currentSearchArea !== "" && (
        <div>
          <h3 className="text-lg font-semibold ">Location</h3>
          <div className="flex gap-2 ml-4">
            {searchAreaType === "area" && currentSearchArea}
            {searchAreaType === "bbox" && "Current Map View"}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchArea;
