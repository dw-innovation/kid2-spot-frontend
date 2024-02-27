"use client";

import React, { useMemo, useRef } from "react";

import useGlobalStore from "@/stores/useGlobalStore";

import AreaSelectorStep from "./AreaSelectorStep";
import NaturalLanguageInputStep from "./NaturalLanguageInputStep";
import NaturalLanguageTranslationStep from "./NaturalLanguageTranslationStep";
import OSMQueryScreen from "./OSMQueryStep";

const STEPS = [
  () => <NaturalLanguageInputStep key="step-1" />,
  () => <NaturalLanguageTranslationStep key="step-2" />,
  () => <AreaSelectorStep key="step-3" />,
  () => <OSMQueryScreen key="step-4" />,
];

const InputStepper = () => {
  const currentStep = useGlobalStore((state) => state.currentStep);
  const stepRef = useRef<HTMLDivElement>(null);

  const CurrentStepComponent = useMemo(() => STEPS[currentStep], [currentStep]);

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div className="relative z-50 flex flex-col gap-2 m-2">
        <div style={{ height: "auto" }}>
          <div ref={stepRef} className="w-full max-w-[32rem] overflow-y-auto">
            {React.createElement(CurrentStepComponent)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputStepper;
