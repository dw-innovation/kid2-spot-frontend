import React from "react";
import useSessionStore from "src/stores/useSessionStore";

const OverpassQueryInput = () => {
  const setOverpassQuery = useSessionStore((state) => state.setOverpassQuery);
  const overpassQuery = useSessionStore((state) => state.overpassQuery);
  return (
    <textarea
      className="border-2 font-mono w-full h-1/2"
      onChange={(e) => setOverpassQuery(e.target.value)}
      defaultValue={overpassQuery}
    ></textarea>
  );
};

export default OverpassQueryInput;
