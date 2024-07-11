import { UpdateIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useStrings from "@/lib/contexts/useStrings";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import useQueryOSMData from "@/lib/hooks/useQueryOSMData";
import { cn, trackAction } from "@/lib/utils";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import { SpotQuery } from "@/types/spotQuery";

type ApiStatus = "idle" | "loading" | "success" | "error";

const OSMQuerySubmit = () => {
  const { commonUpdateResultsButton } = useStrings();
  const spotQuery = useSpotQueryStore((state) => state.spotQuery);
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(false);
  const prevSpotQueryRef = useRef<SpotQuery>(spotQuery);

  useEffect(() => {
    if (spotQuery.nodes.length === 0) {
      setIsDisabled(true);
    }

    if (prevSpotQueryRef.current === spotQuery) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      prevSpotQueryRef.current = spotQuery;
    }
  }, [spotQuery]);

  const { isFetching, status, refetch } = useQueryOSMData({
    onSuccessCallbacks: [() => setIsDisabled(true)],
  });

  const elapsedTime = useElapsedTime(isFetching, status as ApiStatus);

  const handleButtonClick = () => {
    if (isDisabled) return;
    if (!isFetching) {
      refetch();
      trackAction("osmQuery", "modal", "loadSession");
    } else {
      queryClient.cancelQueries({ queryKey: ["osmData", spotQuery] });
    }
  };

  const renderButton = () => (
    <Button
      onClick={handleButtonClick}
      disabled={isDisabled}
      className={cn(
        isDisabled
          ? "cursor-not-allowed bg-gray-200 hover:bg-gray-200"
          : "cursor-pointer",
        "relative w-full px-2 py-1 mt-4"
      )}
      asChild
    >
      <div className="flex items-center w-full">
        <span className="text-white">
          {isFetching ? (
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
      {isFetching ? (
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
