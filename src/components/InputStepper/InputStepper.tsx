"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import Globe from "@/components/Globe";
import useAppStore from "@/stores/useAppStore";

import AreaSelectorStep from "./AreaSelectorStep";
import { useInputStepper } from "./Context";
import NaturalLanguageAnalyzerStep from "./NaturalLanguageAnalyzerStep";
import NaturalLanguageInputStep from "./NaturalLanguageInputStep";
import OSMQueryScreen from "./OSMQueryStep";

const InputStepper = () => {
  const { animateOut } = useInputStepper();
  const currentStep = useAppStore((state) => state.currentStep);
  const [initialHeight, setInitialHeight] = useState(0);
  const stepRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (stepRef.current) {
      setInitialHeight(stepRef.current.clientHeight);
    }
  }, []);

  const STEPS = [
    <NaturalLanguageInputStep key="step-1" />,
    <NaturalLanguageAnalyzerStep key="step-2" />,
    <AreaSelectorStep key="step-3" />,
    <OSMQueryScreen key="step-4" />,
  ];

  const globeScaleProps = useSpring({
    transform: `scale(${animateOut ? 2 : 1})`,
    opacity: animateOut ? 0 : 1,
  });

  const titleProps = useSpring({
    transform: `scale(${animateOut ? 0.9 : 1})`,
    opacity: animateOut ? 0 : 1,
  });

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full overflow-hidden">
        <Globe scaleProps={globeScaleProps} />
      </div>
      <div className="relative z-50 flex flex-col gap-2 max-w-[32rem] m-2">
        <animated.h1
          className="pb-1 text-2xl font-bold text-center drop-shadow-md"
          style={titleProps}
        >
          Spot – Search the world with your words
        </animated.h1>
        <div style={{ height: `${initialHeight + 100}px` }}>
          <div ref={stepRef} className="">
            {STEPS[currentStep]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputStepper;
