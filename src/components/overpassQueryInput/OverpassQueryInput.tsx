import React from "react";
import OverpassQuerySubmit from "../overpassQuerySubmit";
import useSessionStore from "src/stores/useSessionStore";

const OverpassQueryInput = () => {
  const setOverpassQuery = useSessionStore((state) => state.setOverpassQuery);
  const overpassQuery = useSessionStore((state) => state.overpassQuery);
  return (
    <div>
      <textarea
        cols={100}
        rows={20}
        className="border-2"
        onChange={(e) => setOverpassQuery(e.target.value)}
        defaultValue={overpassQuery}
      ></textarea>
      <OverpassQuerySubmit />
    </div>
  );
};

export default OverpassQueryInput;
