import React from "react";

import { Button } from "@/components/ui/button";
import useStrings from "@/lib/contexts/useStrings";
import useGlobalStore from "@/stores/useGlobalStore";

const DIALOG_NAME = "error";

const ClosingButton = () => {
  const { errorDialogCloseButton, errorDialogStartOverButton } = useStrings();

  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const errorType = useGlobalStore((state) => state.errorType);
  const clearError = useGlobalStore((state) => state.clearError);

  const handleClose = () => {
    toggleDialog(DIALOG_NAME);
    setTimeout(() => {
      clearError();
    }, 300);
  };

  return (
    <Button
      variant={errorType === "noResults" ? "default" : "secondary"}
      className="self-end"
      onClick={handleClose}
    >
      {errorType === "noResults"
        ? errorDialogStartOverButton()
        : errorDialogCloseButton()}
    </Button>
  );
};

export default ClosingButton;
