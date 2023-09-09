import React from "react";

import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "error";

const ErrorDialog = () => {
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const errorType = useAppStore((state) => state.errorType);
  const clearError = useAppStore((state) => state.clearError);
  return (
    <Dialog dialogName={DIALOG_NAME} dialogTitle="Error">
      {errorType}
      <Button
        onClick={() => {
          toggleDialog(DIALOG_NAME);
          clearError();
        }}
      >
        Close Message
      </Button>
    </Dialog>
  );
};

export default ErrorDialog;
