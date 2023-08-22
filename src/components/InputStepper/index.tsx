import React from "react";

import { InputStepperProvider } from "./Context";
import InputStepper from "./InputStepper";

const InputStepperWithContext = () => (
  <InputStepperProvider>
    <InputStepper />
  </InputStepperProvider>
);

export default InputStepperWithContext;
