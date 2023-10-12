import React from "react";

import DynamicMap from "../map";

const Polygon = () => (
  <>
    <p className="text-sm text-muted-foreground">
      Draw your custom polygon on the map to define your search area.
    </p>
    <div className="w-full h-[10rem]">
      <DynamicMap />
    </div>
  </>
);

export default Polygon;
