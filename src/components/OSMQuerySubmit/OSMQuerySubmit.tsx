import clsx from "clsx";
import React from "react";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { fetchOSMData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

const OverpassQuerySubmit = () => {
  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const setSets = useResultsStore((state) => state.setSets);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const clearSets = useResultsStore((state) => state.clearSets);

  const [apiStatus, fetchData, cancelRequest] = useApiStatus(fetchOSMData);

  const handleOverpassQuerySubmit = async () => {
    const results = await fetchData();

    if (results.results) {
      clearGeoJSON();
      clearSets();
      setGeoJSON(results.results);
      setSets(results.sets.distinct_sets);
    }
  };

  return (
    <Button
      onClick={
        apiStatus !== "loading"
          ? handleOverpassQuerySubmit
          : () => cancelRequest()
      }
      className={clsx("block px-2 py-1 w-fit")}
    >
      <div className="flex items-center gap-2">
        {apiStatus === "loading" ? (
          <>
            <LoadingSpinner />
            Querying (click to cancel)
          </>
        ) : (
          <>
            <span className="text-green-600">
              <TriangleIcon size={20} />
            </span>{" "}
            Query OSM
          </>
        )}
      </div>
    </Button>
  );
};

export default OverpassQuerySubmit;
