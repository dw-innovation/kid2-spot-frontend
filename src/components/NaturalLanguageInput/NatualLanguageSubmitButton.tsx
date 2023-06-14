import clsx from "clsx";
import React from "react";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { fetchOverpassQueryFromNL } from "@/lib/utils";
import useQueryStore from "@/stores/useQueryStore";

import LoadingSpinner from "../LoadingSpinner";

const NatualLanguageSubmitButton = () => {
  const setOverpassQuery = useQueryStore((state) => state.setOverpassQuery);
  const naturalLanguagePrompt = useQueryStore(
    (state) => state.naturalLanguagePrompt
  );
  const [apiStatus, fetchData] = useApiStatus(fetchOverpassQueryFromNL);

  const handleNLToOverpassSubmit = async () => {
    const result = await fetchData(naturalLanguagePrompt);

    if (result) {
      setOverpassQuery(result.op_query);
    } else {
      console.log("no results");
    }
  };

  return (
    <button
      onClick={handleNLToOverpassSubmit}
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
            <LoadingSpinner />
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

export default NatualLanguageSubmitButton;
