import React from "react";

import { Button } from "@/components/ui/button";
import useGlobalStore from "@/stores/useGlobalStore";

const PromptAgainButton = () => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const clearError = useGlobalStore((state) => state.clearError);

  const handleClick = () => {
    toggleDialog("error", false);
    setTimeout(() => {
      clearError();
    }, 300);
  };

  return (
    <Button variant="secondary" className="w-fit" onClick={handleClick}>
      Prompt Again
    </Button>
  );
};

export default PromptAgainButton;
