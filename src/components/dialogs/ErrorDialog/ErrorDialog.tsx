import React from "react";

import { Button } from "@/components/ui/button";
import { STRINGS } from "@/lib/const/strings/errors";
import { useStrings } from "@/lib/contexts/useStrings";
import useAppStore from "@/stores/useAppStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "error";

const ErrorDialog = () => {
  const { errorDialogTitle, errorDialogCloseButton } = useStrings();
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const errorType = useAppStore((state) => state.errorType);
  const clearError = useAppStore((state) => state.clearError);

  return (
    <Dialog dialogName={DIALOG_NAME} dialogTitle={errorDialogTitle()}>
      {STRINGS[errorType as keyof typeof STRINGS] || errorType}
      <Button
        onClick={() => {
          toggleDialog(DIALOG_NAME);
          setTimeout(() => {
            clearError();
          }, 300);
        }}
      >
        {errorDialogCloseButton()}
      </Button>
    </Dialog>
  );
};

export default ErrorDialog;
