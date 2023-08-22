import React, { useState } from "react";

import AreaSelector from "@/components/AreaSelector";
import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";

import InputContainer from "../InputContainer";

const AreaSelectorStep = () => {
  const area = useImrStore((state) => state.imr.a.v);
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
      We have detected{" "}
      <span className="font-semibold contents">&quot;{area}&quot;</span> as
      search area from your input.
      {typeof area === "string" && <AreaSelector area={area} />}
      <Button onClick={() => handleSelect()}>Continue</Button>
    </InputContainer>
  );
};

export default AreaSelectorStep;
