import clsx from "clsx";
import { SearchIcon } from "lucide-react";
import React from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FILL_COLORS } from "@/lib/const/colors";
import { useStrings } from "@/lib/contexts/useStrings";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { bboxToGeoJSON, fetchOSMData } from "@/lib/utils";
import useResultsStore from "@/stores/useResultsStore";

const OverpassQuerySubmit = () => {
  const { commonFindSpotsButton } = useStrings();
  const setGeoJSON = useResultsStore((state) => state.setGeoJSON);
  const setSets = useResultsStore((state) => state.setSets);
  const setSearchArea = useResultsStore((state) => state.setSearchArea);
  const setSpots = useResultsStore((state) => state.setSpots);
  const clearGeoJSON = useResultsStore((state) => state.clearGeoJSON);
  const clearSets = useResultsStore((state) => state.clearSets);
  const clearSpots = useResultsStore((state) => state.clearSpots);

  const [apiStatus, fetchData, cancelRequest] = useApiStatus(fetchOSMData);
  const elapsedTime = useElapsedTime(apiStatus === "loading", apiStatus);

  const handleOverpassQuerySubmit = async () => {
    const results = await fetchData();

    if (results && results.results) {
      clearGeoJSON();
      clearSets();
      clearSpots();
      setGeoJSON(results.results);

      let shuffledColors = [...FILL_COLORS].sort(() => Math.random() - 0.5);

      let sets = results.sets.distinct_sets.map((set: any, index: number) => ({
        id: index,
        name: set,
        visible: true,
        highlighted: false,
        fillColor: shuffledColors[index],
      }));

      setSets(sets);
      let parsedGeoJSON;
      console.log("here");
      if (results.area.type === "bbox") {
        parsedGeoJSON = bboxToGeoJSON(results.area.value);
      } else {
        parsedGeoJSON = JSON.parse(results.area.value);
      }
      setSearchArea(parsedGeoJSON);
      setSpots(results.spots);
    }
  };

  const renderButton = () => (
    <Button
      onClick={
        apiStatus !== "loading"
          ? handleOverpassQuerySubmit
          : () => cancelRequest()
      }
      className={clsx("block px-2 py-1 w-fit")}
      asChild
    >
      <div className="flex items-center gap-2">
        <span className="text-green-600">
          {apiStatus === "loading" ? (
            <LoadingSpinner />
          ) : (
            <SearchIcon className="w-4 h-4" />
          )}
        </span>
        <span>{commonFindSpotsButton()}</span>
      </div>
    </Button>
  );

  return (
    <>
      {apiStatus === "loading" ? (
        <TooltipProvider>
          <Tooltip defaultOpen>
            <TooltipTrigger>{renderButton()}</TooltipTrigger>
            <TooltipContent className="z-[10000]">
              {elapsedTime}s, click to cancel request
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        renderButton()
      )}
    </>
  );
};

export default OverpassQuerySubmit;
