import React from "react";
import { useQuery } from "react-query";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  fetchIMRValidation,
  fetchNLToIMRTransformation,
} from "@/lib/apiServices";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import AnalyzeAnimation from "../Animation";
import InputContainer from "../InputContainer";

const NaturalLanguageAnalyzerStep = () => {
  const nextStep = useGlobalStore((state) => state.nextStep);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setImr = useImrStore((state) => state.setImr);
  const setErrorType = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const transformationQuery = useQuery(
    ["transformNLToIMR", nlSentence],
    () => fetchNLToIMRTransformation(nlSentence),
    {
      onSuccess: (data) => {
        const imr = data.imr;
        // Since validation is dependent on the result of transformation, chain it using then
        fetchIMRValidation(imr)
          .then((result) => {
            setImr(result);
            nextStep();
          })
          .catch((error) => {
            console.error("Validation failed:", error.message);
            setErrorType(error.message);
            toggleDialog("error");
          });
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: !!nlSentence,
    }
  );

  return (
    <InputContainer
      shouldUnmount={transformationQuery.isSuccess}
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
      {transformationQuery.isLoading && <LoadingSpinner size="2.5rem" />}
    </InputContainer>
  );
};

export default NaturalLanguageAnalyzerStep;
