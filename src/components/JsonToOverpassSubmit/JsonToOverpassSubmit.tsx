import clsx from "clsx";
import React from "react";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import { fetchOverpassQuery } from "@/lib/utils";
import useQueryStore from "@/stores/useQueryStore";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { RotatingLines } from "react-loader-spinner";

const JsonToOverpassSubmit = () => {
  const setOverpassQuery = useQueryStore((state) => state.setOverpassQuery);
  const jsonQuery = useQueryStore((state) => state.jsonQuery);

  const [apiStatus, fetchData] = useApiStatus(fetchOverpassQuery);

  const handleJsonToOverpassSubmit = async () => {
    const result = await fetchData(jsonQuery);

    if (result) {
      setOverpassQuery(result.op_query);
    } else {
      console.log("no results");
    }
  };

  return (
    <button
      onClick={handleJsonToOverpassSubmit}
      className={clsx(
        "block px-2 py-1 w-fit",
        apiStatus === "loading" && "bg-slate-100",
        apiStatus === "error" && "bg-red-100",
        apiStatus !== "loading" &&
          apiStatus !== "error" &&
          "bg-slate-100 hover:bg-slate-300"
      )}
      disabled={apiStatus === "loading"}
    >
      <div className="flex items-center gap-2">
        {apiStatus === "loading" ? (
          <>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
            loading translation
          </>
        ) : (
          <>
            <span className="text-green-600">
              <TriangleIcon size={20} />
            </span>{" "}
            translate to OP query
          </>
        )}
      </div>
    </button>
  );
};

export default JsonToOverpassSubmit;
