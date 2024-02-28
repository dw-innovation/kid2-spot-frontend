import React from "react";
import { useQuery } from "react-query";

import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchNLToIMRTranslation, validateIMR } from "@/lib/apiServices";
import { insertBBox } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";

import AnalyzeAnimation from "../Animation";
import InputContainer from "../InputContainer";

const NaturalLanguageTranslationStep = () => {
  const nextStep = useGlobalStore((state) => state.nextStep);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setImr = useImrStore((state) => state.setImr);
  const setErrorType = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const bounds = useMapStore((state) => state.bounds);

  const translationQuery = useQuery(
    ["translateNLToIMR", nlSentence],
    () => fetchNLToIMRTranslation(nlSentence),
    {
      onSuccess: (data) => {
        let imr = data.imr;
        validateIMR(imr)
          .then(() => {
            if (imr.area.value === "bbox") {
              setImr(
                insertBBox(imr, [
                  bounds[0][1],
                  bounds[0][0],
                  bounds[1][1],
                  bounds[1][0],
                ])
              );
            } else {
              setImr(imr);
            }
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
      retry: false,
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
