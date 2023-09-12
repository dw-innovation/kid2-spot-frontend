"use client";

import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useElapsedTime from "@/lib/hooks/useElapsedTime";
import { translateNLtoIMR } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";

import InputContainer from "../InputContainer";

const NaturalLanguageAnalyzerStep = () => {
  const nextStep = useAppStore((state) => state.nextStep);
  const elapsedTime = useElapsedTime(true, "loading");
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [apiStatus, fetchData] = useApiStatus(translateNLtoIMR);
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setImr = useImrStore((state) => state.setImr);

  useEffect(() => {
    fetchData(nlSentence)
      .then((response) => {
        setImr(response.op_query);
        setShouldUnmount(true);

        setTimeout(() => {
          nextStep();
        }, 200);
      })
      .catch(() => {
        toggleDialog("error");
      });
  });

  return (
    <InputContainer
      shouldUnmount={shouldUnmount}
      title="Analyzing your sentence"
    >
      {apiStatus === "loading" && <LoadingSpinner size="2.5rem" />}
      {elapsedTime} {elapsedTime === 1 ? `second` : `seconds`}
    </InputContainer>
  );
};

export default NaturalLanguageAnalyzerStep;
