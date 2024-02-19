"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import useGlobalStore from "@/stores/useGlobalStore";

import AreaSelectorStep from "./AreaSelectorStep";
import { useInputStepper } from "./Context";
import NaturalLanguageInputStep from "./NaturalLanguageInputStep";
import NaturalLanguageTranslationStep from "./NaturalLanguageTranslationStep";
import OSMQueryScreen from "./OSMQueryStep";

const STEPS = [
  () => <NaturalLanguageInputStep key="step-1" />,
  () => <NaturalLanguageTranslationStep key="step-2" />,
  () => <AreaSelectorStep key="step-3" />,
  () => <OSMQueryScreen key="step-4" />,
];

type Props = {
  minimal?: boolean;
};

const InputStepper = ({ minimal = false }: Props) => {
  const { animateOut } = useInputStepper();
  const currentStep = useGlobalStore((state) => state.currentStep);
  const [initialHeight, setInitialHeight] = useState(0);
  const stepRef = useRef<HTMLDivElement>(null);

  const CurrentStepComponent = useMemo(() => STEPS[currentStep], [currentStep]);

  useLayoutEffect(() => {
    if (stepRef.current) {
      setInitialHeight(stepRef.current.clientHeight);
    }
  }, []);

  const titleProps = useSpring({
    transform: `scale(${animateOut ? 0.9 : 1})`,
    opacity: animateOut ? 0 : 1,
  });

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div className="relative z-50 flex flex-col gap-2 m-2">
        {!minimal && (
          <animated.h1
            className="pb-1 text-2xl font-bold text-center drop-shadow-md"
            style={titleProps}
          >
            Spot – Search the world with your words
          </animated.h1>
        )}
        <div style={{ height: !minimal ? `${initialHeight + 100}px` : "auto" }}>
          <div ref={stepRef} className="w-full max-w-[32rem] overflow-y-auto">
            {React.createElement(CurrentStepComponent, { minimal })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputStepper;
