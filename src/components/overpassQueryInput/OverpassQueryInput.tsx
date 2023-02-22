import React from "react";

import useQueryStore from "@/stores/useQueryStore";

const OverpassQueryInput = () => {
  const setOverpassQuery = useQueryStore((state) => state.setOverpassQuery);
  const overpassQuery = useQueryStore((state) => state.overpassQuery);
  return (
    <textarea
      className="w-full font-mono text-sm border-2 h-1/2"
      onChange={(e) => setOverpassQuery(e.target.value)}
      defaultValue={overpassQuery}
    ></textarea>
  );
};

export default OverpassQueryInput;
