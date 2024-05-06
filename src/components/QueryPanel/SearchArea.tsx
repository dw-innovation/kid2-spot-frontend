import React from "react";

import useImrStore from "@/stores/useImrStore";

const SearchArea = () => {
  const currentSearchArea = useImrStore((state) => state.imr.area.value);
  const searchAreaType = useImrStore((state) => state.imr.area.type);

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
