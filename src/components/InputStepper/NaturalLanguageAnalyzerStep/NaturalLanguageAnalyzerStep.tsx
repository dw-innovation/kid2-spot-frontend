"use client";

import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  fetchIMRValidation,
  fetchNLToIMRTransformation,
} from "@/lib/apiServices";
import useApiStatus from "@/lib/hooks/useApiStatus";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import AnalyzeAnimation from "../Animation";
import InputContainer from "../InputContainer";

const NaturalLanguageAnalyzerStep = () => {
  const nextStep = useGlobalStore((state) => state.nextStep);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [, fetchData] = useApiStatus(fetchNLToIMRTransformation);
  const [, validateOutput] = useApiStatus(fetchIMRValidation);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setImr = useImrStore((state) => state.setImr);

  useEffect(() => {
    fetchData(nlSentence)
      .then((response) => {
        const imr = response.imr;
        return validateOutput(imr).then(() => {
          setImr(imr);
          setShouldUnmount(true);

          setTimeout(() => {
            nextStep();
          }, 200);
        });
      })
      .catch(() => {
        toggleDialog("stepperError");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InputContainer
      shouldUnmount={shouldUnmount}
      title="Analyzing your sentence"
    >
      <AnalyzeAnimation
        sentences={[
          "Identifying the area in your query",
          "Determining all objects in your prompt",
          "Analyzing the connections between the objects",
          "Hang on, we're almost there!",
        ]}
        duration={2500}
      />
      <LoadingSpinner size="2.5rem" />
    </InputContainer>
  );
};

export default NaturalLanguageAnalyzerStep;
