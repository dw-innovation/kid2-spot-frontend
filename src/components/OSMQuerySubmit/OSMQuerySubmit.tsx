import { UpdateIcon } from "@radix-ui/react-icons";
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
import useStrings from "@/lib/contexts/useStrings";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { setResults } from "@/lib/utils";

const OSMQuerySubmit = () => {
  const { commonUpdateResultsButton } = useStrings();
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
      className={"px-2 py-1 w-full cursor-pointer relative mt-4"}
      asChild
    >
      <div className="flex items-center w-full">
        <span className="text-green-600">
          {apiStatus === "loading" ? (
            <div className="w-4 h-4">
              <LoadingSpinner />
            </div>
          ) : (
            <UpdateIcon className="w-4 h-4" />
          )}
        </span>
        {commonUpdateResultsButton()}
      </div>
    </Button>
  );

  return (
    <>
      {apiStatus === "loading" ? (
        <TooltipProvider>
          <Tooltip defaultOpen>
            <TooltipTrigger className="w-full">{renderButton()}</TooltipTrigger>
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
