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
import { fetchOSMData } from "@/lib/apiServices";
import { useStrings } from "@/lib/contexts/useStrings";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { setResults } from "@/lib/utils";

const OSMQuerySubmit = () => {
  const { commonFindSpotsButton } = useStrings();

  const [apiStatus, fetchData, cancelRequest] = useApiStatus(fetchOSMData);
  const elapsedTime = useElapsedTime(apiStatus === "loading", apiStatus);

  const handleOSMQuerySubmit = async () => {
    await fetchData().then((data) => {
      setResults(data);
    });
  };

  const renderButton = () => (
    <Button
      onClick={
        apiStatus !== "loading" ? handleOSMQuerySubmit : () => cancelRequest()
      }
      className={clsx("block px-2 py-1 w-full cursor-pointer")}
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

export default OSMQuerySubmit;
