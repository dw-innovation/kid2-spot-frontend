"use client";

import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import useAppStore from "@/stores/useAppStore";

import InputContainer from "../InputContainer";

const NaturalLanguageAnalyzerStep = () => {
  const nextStep = useAppStore((state) => state.nextStep);
  const elapsedTime = useElapsedTime(true, "loading");
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldUnmount(true);

      setTimeout(() => {
        nextStep();
      }, 200);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <InputContainer
      shouldUnmount={shouldUnmount}
      title="Analyzing your sentence"
    >
      <LoadingSpinner size="2.5rem" />
      {elapsedTime} {elapsedTime === 1 ? `second` : `seconds`}
    </InputContainer>
  );
};

export default NaturalLanguageAnalyzerStep;
