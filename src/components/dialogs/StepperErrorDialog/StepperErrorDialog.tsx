import React from "react";

import { Button } from "@/components/ui/button";
import { STRINGS } from "@/lib/const/strings/errors";
import { useStrings } from "@/lib/contexts/useStrings";
import useGlobalStore from "@/stores/useGlobalStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "stepperError";

const StepperErrorDialog = () => {
  const { errorDialogTitle, errorDialogStartOverButton } = useStrings();
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const errorType = useGlobalStore((state) => state.errorType);
  const clearError = useGlobalStore((state) => state.clearError);
  const resetSteps = useGlobalStore((state) => state.resetSteps);

  return (
    <Dialog dialogName={DIALOG_NAME} dialogTitle={errorDialogTitle()}>
      {STRINGS[errorType as keyof typeof STRINGS] || errorType}
      <Button
        onClick={() => {
          resetSteps();
          toggleDialog(DIALOG_NAME);
          setTimeout(() => {
            clearError();
          }, 300);
        }}
      >
        {errorDialogStartOverButton()}
      </Button>
    </Dialog>
  );
};

export default StepperErrorDialog;
