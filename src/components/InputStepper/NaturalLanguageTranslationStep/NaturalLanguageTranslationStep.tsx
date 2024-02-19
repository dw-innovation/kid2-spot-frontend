import React from "react";
import { useQuery } from "react-query";

import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchNLToIMRTranslation, validateIMR } from "@/lib/apiServices";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import AnalyzeAnimation from "../Animation";
import InputContainer from "../InputContainer";

const NaturalLanguageTranslationStep = () => {
  const nextStep = useGlobalStore((state) => state.nextStep);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setImr = useImrStore((state) => state.setImr);
  const setErrorType = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const translationQuery = useQuery(
    ["translateNLToIMR", nlSentence],
    () => fetchNLToIMRTranslation(nlSentence),
    {
      onSuccess: (data) => {
        const imr = data.imr;
        validateIMR(imr)
          .then(() => {
            setImr(imr);
            nextStep();
          })
          .catch((error) => {
            setErrorType(error.message);
            toggleDialog("inputStepper", false);
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
      shouldUnmount={translationQuery.isSuccess}
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
      {translationQuery.isLoading && <LoadingSpinner size="2.5rem" />}
    </InputContainer>
  );
};

export default NaturalLanguageTranslationStep;
