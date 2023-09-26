import React from "react";

import { InputStepperProvider } from "./Context";
import InputStepper from "./InputStepper";

type Props = {
  minimal?: boolean;
};

const InputStepperWithContext = ({ minimal = false }: Props) => (
  <InputStepperProvider>
    <InputStepper minimal={minimal} />
  </InputStepperProvider>
);

export default InputStepperWithContext;
