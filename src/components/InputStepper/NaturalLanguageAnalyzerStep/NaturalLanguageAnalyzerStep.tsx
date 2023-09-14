"use client";

import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import useApiStatus from "@/lib/hooks/useApiStatus";
import { translateNLtoIMR } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";

import InputContainer from "../InputContainer";
import AnalyzeAnimation from "./Animation";

const NaturalLanguageAnalyzerStep = () => {
  const nextStep = useAppStore((state) => state.nextStep);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [apiStatus, fetchData] = useApiStatus(translateNLtoIMR);
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setImr = useImrStore((state) => state.setImr);

  useEffect(() => {
    fetchData(nlSentence)
      .then((response) => {
        setImr(response.imr);
        setShouldUnmount(true);

        setTimeout(() => {
          nextStep();
        }, 200);
      })
      .catch(() => {
        toggleDialog("error");
      });
  }, []);

  return (
    <InputContainer
      shouldUnmount={shouldUnmount}
      title="Analyzing your sentence"
    >
      <AnalyzeAnimation />
      {apiStatus === "loading" && <LoadingSpinner size="2.5rem" />}
    </InputContainer>
  );
};

export default NaturalLanguageAnalyzerStep;
