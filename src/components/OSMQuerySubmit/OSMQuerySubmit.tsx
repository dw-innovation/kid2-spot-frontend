import clsx from "clsx";
import { SearchIcon } from "lucide-react";
import React from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { fetchOSMData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

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

      let sets = results.sets.distinct_sets.map((set: any, index: number) => ({
        id: index,
        name: set,
        visible: true,
      }));
      setSets(sets);
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
        <span className="text-green-600">
          {apiStatus === "loading" ? (
            <LoadingSpinner />
          ) : (
            <SearchIcon className="w-4 h-4" />
          )}
        </span>
        <span className="hidden md:block">Query OSM</span>
      </div>
    </Button>
  );
};

export default OverpassQuerySubmit;
