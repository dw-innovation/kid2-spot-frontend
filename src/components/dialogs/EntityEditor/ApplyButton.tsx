import React, { useEffect, useRef, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useQueryOSMData from "@/lib/hooks/useQueryOSMData";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useSpotQueryStore from "@/stores/useSpotQueryStore";
import { SpotQuery } from "@/types/spotQuery";

const ApplyButton = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const clearError = useGlobalStore((state) => state.clearError);
  const spotQuery = useSpotQueryStore((state) => state.spotQuery);
  const { isLoading, queryOSM } = useQueryOSMData({});

  const prevSpotQueryRef = useRef<SpotQuery>(spotQuery);

  useEffect(() => {
    if (prevSpotQueryRef.current === spotQuery) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      prevSpotQueryRef.current = spotQuery;
    }
  }, [spotQuery]);

  const handleButtonClick = () => {
    toggleDialog("entityEditor", false);
    toggleDialog("error", false);
    clearError();
    queryOSM();
  };

  return (
    <div className="flex flex-col items-end">
      <Button
        onClick={handleButtonClick}
        variant={"secondary"}
        disabled={isDisabled}
        className={cn(isDisabled ? "cursor-not-allowed" : "cursor-pointer")}
      >
        {isLoading && <LoadingSpinner />} Apply Changes
      </Button>
    </div>
  );
};

export default ApplyButton;
