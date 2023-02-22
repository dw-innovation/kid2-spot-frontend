import React from "react";

import useSessionStore from "@/stores/useSessionStore";

const OverpassQueryInput = () => {
  const setOverpassQuery = useSessionStore((state) => state.setOverpassQuery);
  const overpassQuery = useSessionStore((state) => state.overpassQuery);
  return (
    <textarea
      className="w-full font-mono text-sm border-2 h-1/2"
      onChange={(e) => setOverpassQuery(e.target.value)}
      defaultValue={overpassQuery}
    ></textarea>
  );
};

export default OverpassQueryInput;
