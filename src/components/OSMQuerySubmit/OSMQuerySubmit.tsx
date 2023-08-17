import clsx from "clsx";
import osmtogeojson from "osmtogeojson";
import React from "react";

import TriangleIcon from "@/assets/icons/TriangleIcon";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { fetchOSMData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

const OverpassQuerySubmit = () => {
  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);

  const [apiStatus, fetchData, cancelRequest] = useApiStatus(fetchOSMData);

  const handleOverpassQuerySubmit = async () => {
    const results = await fetchData();

    if (results) {
      clearGeoJSON();
      let geoJSONResults = osmtogeojson(results);
      setGeoJSON(geoJSONResults);
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
