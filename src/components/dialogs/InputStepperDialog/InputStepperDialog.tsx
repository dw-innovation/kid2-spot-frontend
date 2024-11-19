import React from "react";

import InputStepper from "@/components/InputStepper";

import Dialog from "../Dialog";

const DIALOG_NAME = "inputStepper";

const InputStepperDialog = () => (
  <Dialog dialogName={DIALOG_NAME}>
    <InputStepper />
  </Dialog>
);

export default InputStepperDialog;
