import React from "react";
import useSessionStore from "src/stores/useSessionStore";

const OverpassQueryInput = () => {
  const setOverpassQuery = useSessionStore((state) => state.setOverpassQuery);
  const overpassQuery = useSessionStore((state) => state.overpassQuery);
  return (
      <textarea
        cols={100}
        rows={20}
        className="border-2"
        onChange={(e) => setOverpassQuery(e.target.value)}
        defaultValue={overpassQuery}
      ></textarea>
  );
};

export default OverpassQueryInput;
