import React from "react";
import { useQuery } from "react-query";

import { useInputStepper } from "@/components/InputStepper/Context";
import InputContainer from "@/components/InputStepper/InputContainer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchOSMData } from "@/lib/apiServices";
import { setResults } from "@/lib/utils";
import useErrorStore from "@/stores/useErrorStore";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import QueryAnimation from "../Animation";

const OSMQueryStep = () => {
  const { setAnimateOut } = useInputStepper();
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);
  const imr = useImrStore((state) => state.imr);
  const setMessage = useErrorStore((state) => state.setMessage);

  const { isLoading, isSuccess } = useQuery(
    ["osmData", imr],
    () => fetchOSMData({ imr }),
    {
      onSuccess: (data) => {
        setResults(data);
        setAnimateOut(true);
        toggleDialog("inputStepper", false);
      },
      onError: () => {
        setMessage("fetchingOSMdata");
        toggleDialog("error");
      },
      enabled: !!imr,
      retry: false,
    }
  );

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
