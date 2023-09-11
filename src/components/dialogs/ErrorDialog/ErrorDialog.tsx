import React from "react";

import { Button } from "@/components/ui/button";
import { useStrings } from "@/lib/contexts/useStrings";
import useAppStore from "@/stores/useAppStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "error";

const ErrorDialog = () => {
  const { errorDialogTitle } = useStrings();
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const errorType = useAppStore((state) => state.errorType);
  const clearError = useAppStore((state) => state.clearError);

  return (
    <Dialog dialogName={DIALOG_NAME} dialogTitle={errorDialogTitle()}>
      {errorType}
      <Button
        onClick={() => {
          toggleDialog(DIALOG_NAME);
          setTimeout(() => {
            clearError();
          }, 300);
        }}
      >
        Close Message
      </Button>
    </Dialog>
  );
};

export default ErrorDialog;
