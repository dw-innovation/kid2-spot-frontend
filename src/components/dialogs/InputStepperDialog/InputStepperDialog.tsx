import { useSession } from "next-auth/react";
import React from "react";

import InputStepper from "@/components/InputStepper";

import Dialog from "../Dialog";

const DIALOG_NAME = "inputStepper";

const InputStepperDialog = () => {
  const { data: sessionData } = useSession();

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      showCloseButton={!!sessionData}
      preventClose={!sessionData}
    >
      <InputStepper />
    </Dialog>
  );
};

export default InputStepperDialog;
