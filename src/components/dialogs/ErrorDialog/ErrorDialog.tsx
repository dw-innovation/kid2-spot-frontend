import React from "react";

import { Button } from "@/components/ui/button";
import { STRINGS } from "@/lib/const/strings/errors";
import useStrings from "@/lib/contexts/useStrings";
import useGlobalStore from "@/stores/useGlobalStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "error";

const ErrorDialog = () => {
  const { errorDialogCloseButton } = useStrings();
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const errorType = useGlobalStore((state) => state.errorType);
  const clearError = useGlobalStore((state) => state.clearError);

  const errorKey = Object.keys(STRINGS).find(
    (key) => key === errorType && !key.endsWith("Title")
  );

  const dialogTitle = errorKey
    ? STRINGS[errorKey as keyof typeof STRINGS]
    : errorType;

  const dialogDescription =
    STRINGS[errorType as keyof typeof STRINGS] || errorType;

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={dialogTitle}
      dialogDescription={dialogDescription}
    >
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
