import clsx from "clsx";
import osmtogeojson from "osmtogeojson";
import React from "react";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { fetchOverpassApiData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

import LoadingSpinner from "../LoadingSpinner";

const OverpassQuerySubmit = () => {
  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);

  const [apiStatus, fetchData, cancelRequest] =
    useApiStatus(fetchOverpassApiData);

  const handleOverpassQuerySubmit = async () => {
    const results = await fetchData();

    if (results) {
      clearGeoJSON();
      let geoJSONResults = osmtogeojson(results);
      setGeoJSON(geoJSONResults);
    }
  };

  return (
    <button
      onClick={
        apiStatus !== "loading"
          ? handleOverpassQuerySubmit
          : () => cancelRequest()
      }
      className={clsx(
        "block px-2 py-1 w-fit",
        apiStatus === "loading" && "bg-slate-100",
        apiStatus === "error" && "bg-red-100",
        apiStatus !== "loading" &&
          apiStatus !== "error" &&
          "bg-slate-100 hover:bg-slate-300"
      )}
    >
      <div className="flex items-center gap-2">
        {apiStatus === "loading" ? (
          <>
            <LoadingSpinner />
            running query (click to cancel)
          </>
        ) : (
          <>
            <span className="text-green-600">
              <TriangleIcon size={20} />
            </span>{" "}
            run query
          </>
        )}
      </div>
    </button>
  );
};

export default OverpassQuerySubmit;
