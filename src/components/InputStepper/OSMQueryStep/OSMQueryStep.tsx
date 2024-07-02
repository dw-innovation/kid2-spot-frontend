import React from "react";

import InputContainer from "@/components/InputStepper/InputContainer";
import LoadingSpinner from "@/components/LoadingSpinner";
import useQueryOSMData from "@/lib/hooks/useQueryOSMData";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import QueryAnimation from "../Animation";

const OSMQueryStep = () => {
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  const { isLoading, isSuccess } = useQueryOSMData({
    onSuccessCallbacks: [() => toggleDialog("inputStepper", false)],
    onErrorCallbacks: [() => toggleDialog("inputStepper", false)],
  });

  return (
    <InputContainer title="Querying OpenStreetMap" shouldUnmount={isSuccess}>
      <QueryAnimation
        sentences={[
          "Constructing your query",
          "Finding all nodes and ways",
          "Filtering by relations",
          "Just a moment, we're close to finishing!",
        ]}
        duration={4000}
      />
      {isLoading && <LoadingSpinner size="2.5rem" />}
    </InputContainer>
  );
};

export default OSMQueryStep;
