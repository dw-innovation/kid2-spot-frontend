import clsx from "clsx";
import React from "react";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import { fetchOverpassQuery } from "@/lib/utils";
import useQueryStore from "@/stores/useQueryStore";

const JsonToOverpassSubmit = () => {
  const setOverpassQuery = useQueryStore((state) => state.setOverpassQuery);
  const jsonQuery = useQueryStore((state) => state.jsonQuery);

  const handleJsonToOverpassSubmit = async () => {
    try {
      const result = await fetchOverpassQuery(jsonQuery);

      if (result) {
        setOverpassQuery(result.op_query);
      } else {
        console.log("no results");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleJsonToOverpassSubmit}
      className={clsx("block px-2 py-1 w-fit bg-slate-100 hover:bg-slate-300")}
    >
      <div className="flex items-center gap-2">
        <span className="text-green-600">
          <TriangleIcon size={20} />
        </span>{" "}
        translate to OP query
      </div>
    </button>
  );
};

export default JsonToOverpassSubmit;
