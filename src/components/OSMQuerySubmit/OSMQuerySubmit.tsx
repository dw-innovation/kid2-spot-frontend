import { UpdateIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

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
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { setResults } from "@/lib/utils";
import useImrStore from "@/stores/useImrStore";
import { IntermediateRepresentation } from "@/types/imr";

const OSMQuerySubmit = () => {
  const { commonUpdateResultsButton } = useStrings();
  const imr = useImrStore((state) => state.imr);
  const queryClient = useQueryClient();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); // State to control the button's disabled state
  const prevImrRef = useRef<IntermediateRepresentation>();

  useEffect(() => {
    if (prevImrRef.current === imr) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      prevImrRef.current = imr;
    }
  }, [imr]);

  const { isLoading, error, status } = useQuery(
    ["osmData", imr],
    () => fetchOSMData({ imr }),
    {
      retry: false,
      onSuccess: (data) => {
        setResults(data);
      },
      enabled: shouldFetch,
      onSettled: () => {
        setShouldFetch(false);
      },
    }
  );

  const elapsedTime = useElapsedTime(isLoading, status);

  const handleButtonClick = () => {
    if (isDisabled) return;
    if (!isLoading) {
      setShouldFetch(true);
    } else {
      queryClient.cancelQueries(["osmData", imr]);
    }
  };

  const renderButton = () => (
    <Button
      onClick={handleButtonClick}
      disabled={isDisabled}
      className="relative w-full px-2 py-1 mt-4 cursor-pointer"
      asChild
    >
      <div className="flex items-center w-full">
        <span className="text-white">
          {isLoading ? (
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

  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {isLoading ? (
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
