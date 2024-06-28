import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchNLToIMRTransformation, validateIMR } from "@/lib/apiServices";
import { insertBBox } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";

import AnalyzeAnimation from "../Animation";
import InputContainer from "../InputContainer";

const NaturalLanguageTransformationStep = () => {
  const nextStep = useGlobalStore((state) => state.nextStep);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setImr = useImrStore((state) => state.setImr);
  const setErrorType = useGlobalStore((state) => state.setError);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const bounds = useMapStore((state) => state.bounds);

  const transformationQuery = useQuery({
    queryKey: ["transformNLToIMR", nlSentence],
    queryFn: () => fetchNLToIMRTransformation(nlSentence),
    enabled: !!nlSentence,
    retry: false,
  });

  const { data, error, isSuccess, isError, isPending } = transformationQuery;

  useEffect(() => {
    if (isSuccess && data) {
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
        .catch((validationError) => {
          setErrorType(validationError.message);
          toggleDialog("inputStepper", false);
          toggleDialog("error");
        });
    }
  }, [isSuccess, data, setImr, bounds, nextStep, setErrorType, toggleDialog]);

  useEffect(() => {
    if (isError && error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const err = error as { message: string };
        setErrorType(err.message);
      } else {
        setErrorType("An unexpected error occurred");
      }

      toggleDialog("inputStepper", false);
      toggleDialog("error");
    }
  }, [isError, error, setErrorType, toggleDialog]);

  return (
    <InputContainer
      shouldUnmount={isSuccess}
      title="Analyzing your input"
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
      {isPending && <LoadingSpinner size="2.5rem" />}
    </InputContainer>
  );
};

export default NaturalLanguageTransformationStep;
