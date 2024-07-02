import React, { useEffect, useRef, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useQueryOSMData from "@/lib/hooks/useQueryOSMData";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import { IntermediateRepresentation } from "@/types/imr";

const ApplyButton = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const clearError = useGlobalStore((state) => state.clearError);
  const imr = useImrStore((state) => state.imr);
  const { isLoading, refetch } = useQueryOSMData({
    
  });

  const prevImrRef = useRef<IntermediateRepresentation>(imr);

  useEffect(() => {
    if (prevImrRef.current === imr) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      prevImrRef.current = imr;
    }
  }, [imr]);

  const handleButtonClick = () => {
    toggleDialog("entityEditor", false);
    toggleDialog("error", false);
    clearError();
    refetch()
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
