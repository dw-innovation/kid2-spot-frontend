import React from "react";

import DynamicMap from "../map";

const BBox = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-sm text-muted-foreground">
        Zoom to a specific location and search within the bounds of the map
        view.
      </p>
      <div className="w-full h-[10rem]">
        <DynamicMap />
      </div>
    </div>
  );
};

export default BBox;
