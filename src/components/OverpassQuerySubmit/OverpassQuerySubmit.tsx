import clsx from "clsx";
import osmtogeojson from "osmtogeojson";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import { fetchOverpassApiData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";
import useApiStatus from "@/lib/hooks/useApiStatus";

const OverpassQuerySubmit = () => {
  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);

  const [apiStatus, fetchData] = useApiStatus(fetchOverpassApiData);

  const handleOverpassQuerySubmit = async () => {
    const results = await fetchData();

    if (results) {
      clearGeoJSON();
      let geoJSONResults = osmtogeojson(results);
      setGeoJSON(geoJSONResults);
    } else {
      console.log("no results");
    }
  };

  return (
    <button
      onClick={handleOverpassQuerySubmit}
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
            running query
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
