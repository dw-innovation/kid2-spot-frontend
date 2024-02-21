import React from "react";

import { Button } from "@/components/ui/button";
import useStrings from "@/lib/contexts/useStrings";
import useGlobalStore from "@/stores/useGlobalStore";

const DIALOG_NAME = "error";

const ClosingButton = () => {
  const { errorDialogCloseButton } = useStrings();

  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const clearError = useGlobalStore((state) => state.clearError);

  return (
    <Button
      variant={"secondary"}
      className="self-end"
      onClick={() => {
        toggleDialog(DIALOG_NAME);
        setTimeout(() => {
          clearError();
        }, 300);
      }}
    >
      {errorDialogCloseButton()}
    </Button>
  );
};

export default ClosingButton;
