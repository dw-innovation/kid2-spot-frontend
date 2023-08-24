import React, { useState } from "react";

import AreaSelector from "@/components/AreaSelector";
import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";

import InputContainer from "../InputContainer";

const AreaSelectorStep = () => {
  const nextStep = useAppStore((state) => state.nextStep);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  const handleSelect = () => {
    setShouldUnmount(true);
    setTimeout(() => {
      nextStep();
    }, 200);
  };

  return (
    <InputContainer
      shouldUnmount={shouldUnmount}
      title="Select the search area"
    >
      <AreaSelector />
      <Button onClick={() => handleSelect()}>Continue</Button>
    </InputContainer>
  );
};

export default AreaSelectorStep;
